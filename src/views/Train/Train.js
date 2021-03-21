import React, { useState, useEffect } from "react";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import Sidebar from "components/Sidebar/Sidebar.js";
import { BASE_URL } from "service";
import TextField from "@material-ui/core/TextField";
import routes from "routes.js";
import { makeStyles } from "@material-ui/core/styles";
import ButtonM from "@material-ui/core/Button";
import Modal from "react-modal";
import ReactLoading from 'react-loading';

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/new_logo.png";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import axios from "axios";
import Party from "components/party";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const useStyles = makeStyles(styles);

Modal.setAppElement("#root");
export default function Train(props) {
  
  // styles
  const [train, setTrain] = useState("");
  const [product, setName] = useState(sessionStorage.getItem("project"));
  const classes = useStyles();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [visibile,setVisible] = useState('hidden')
  // ref to help us initialize PerfectScrollbar on windows devices
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(localStorage.getItem("Text"));
  const [party, setParty] = useState();
  const [proj, setProj] = useState([]);
  const [links, setLinks] = useState([]);
  let uniq = []

  const viewChatbot = () => {
    var database = sessionStorage.getItem("database");
    database = database.split("@");
    window.open(BASE_URL + `/user/${database[0]}`,'_blank')
  };

  async function getProjects() {
    var database = sessionStorage.getItem("database");
    database = database.split("@");
    const response = await fetch(BASE_URL + `/projects/${database[0]}`);

    const json = await response.json();
    //console.log(json.result[0].links)
    if (json.result === "No such Database exists") {
      setProj([]);
    } else {
      for (let index = 0; index < json.result.length; index++) {
        if (
          json.result[index].project_name === sessionStorage.getItem("project")
        ) {
          uniq = [...new Set(json.result[index].links)];
          setProj([json.result[index]]);
          if(json.result[index].endTime !== undefined){
            console.log(uniq)
            setText("Training Completed")
            setVisible('visible')
            localStorage.setItem("Text","Training Completed")
          }
          else{
            setText("Pending For Training")
            setVisible('hidden')
            localStorage.setItem("Text","Pending For Training")
          }   
        }
      }
    }
  }

  

  useEffect(() => {
    getProjects();
  },[]);

  const deleteModel = (e) => {
    e.preventDefault();
    setIsOpen(false)
    var database = sessionStorage.getItem("database");
    database = database.split("@");
    setLoading(true)
    axios
      .delete(BASE_URL + `/admin/delete/${database[0]}/${product}`)
      .then((response) => {
        console.log(response);
        setLoading(false)
        toast.success("Successfully Deleted Model !", {
          position: toast.POSITION_TOP_RIGHT,
        });
      })
      .catch((e) => {
        console.log(e);
        setLoading(false)
        toast.success("Successfully Deleted Model !", {
          position: toast.POSITION_TOP_RIGHT,
        });
      });
  };

  const trainModel = (e) => {
    e.preventDefault();
    setIsOpen(false)
    var database = sessionStorage.getItem("database");
    database = database.split("@");

    if (train === "" || product === "") {
      toast.error("Please fill in all fields !", {
        position: toast.POSITION_TOP_RIGHT,
      });
    } else if (!train.includes("https") || !train.includes("http")) {
      toast.error("Please enter a valid URL !", {
        position: toast.POSITION_TOP_RIGHT,
      });
    } else {
      const trainModel = {
        train: train,
        product: product,
      };
      const options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      setText("Training Started");
      localStorage.setItem("Text","Training Started")
      axios
        .post(
          BASE_URL + `/admin/train/${database[0]}`,
          trainModel,
          { timeout: 3600000 },
          options
        )
        .then((response) => {
          setLoading(false);
          console.log(response);
          if (response.data.result === "completed") {
            toast.success("Successfully Trained Model !", {
              position: toast.POSITION_TOP_RIGHT,
            });
          } else {
            toast.error("An error Occurred !", {
              position: toast.POSITION_TOP_RIGHT,
            });
          }
        })
        .catch((e) => {
          setLoading(false);
          setText("Training Completed");
          localStorage.setItem("Text","Training Completed")
          setParty(true);
          setVisible("visible")
          setTimeout(() => {
            setParty(false);
          }, 12000);
          toast.success("Successfully Trained Model !", {
            position: toast.POSITION_TOP_RIGHT,
          });
          console.log(e);
        });
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // initialize and destroy the PerfectScrollbar plugin
  

  return (
    <div>
      <div>
        <Sidebar
          routes={routes}
          logoText={"DOC HELPER ADMIN"}
          logo={logo}
          image={image}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
        />
      </div>
      <div style={{ marginLeft: "300px" }}>
        <GridContainer>
          <GridItem xs={11}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Project Details</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={6}>
                    <h3
                      style={{
                        color: "black",
                        marginTop: "0px",
                        minHeight: "auto",
                        fontWeight: "300",
                        fontFamily: "Bebas Neue,'cursive'",
                        marginBottom: "3px",
                        textDecoration: "none",
                      }}
                    >
                      Status
                    </h3>
                  </GridItem>
                  <GridItem xs={6}>
                    <h3
                      style={{
                        color: "black",
                        marginTop: "0px",
                        minHeight: "auto",
                        fontWeight: "300",
                        fontFamily: "Bebas Neue,'cursive'",
                        marginBottom: "3px",
                        textDecoration: "none",
                      }}
                    >
                      {text}
                    </h3>
                  </GridItem>
                </GridContainer>
                <GridContainer visible={visibile}>
                  <GridItem xs={6}>
                    <h3
                      style={{
                        color: "black",
                        marginTop: "0px",
                        minHeight: "auto",
                        fontWeight: "300",
                        fontFamily: "Bebas Neue,'cursive'",
                        marginBottom: "3px",
                        textDecoration: "none",
                      }}
                    >
                      Chatbot URL
                    </h3>
                  </GridItem>
                  <GridItem xs={6}>
                    <Button
                      onClick={viewChatbot}
                      disabled={loading}
                      color="info"
                    >
                      View
                    </Button>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Trained History</h4>
              </CardHeader>
              <CardBody style={{ overflow: "auto" }}>
                <Table
                  tableHeaderColor="info"
                  done={false}
                  tableHead={[
                    "Project Name",
                    "Project Links",
                    "Start Time",
                    "End Time",
                  ]}
                  tableData={proj.map((project) => [
                    project.project_name ? project.project_name : product,
                    project.links ? project.links : train,
                    project.startTime,
                    project.endTime,
                  ])}
                  // tableData={[
                  //   ["APIM", "Dakota Rice", "$36,738", "Niger"],
                  //   ["IS", "Minerva Hooper", "$23,789", "Curaçao"],
                  //   ["EI", "Sage Rodriguez", "$56,142", "Netherlands"],
                  //   ["Test", "Philip Chaney", "$38,735", "Korea, South"]
                  // ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <ButtonM
        disabled={loading}
          style={{
            color: "white",
            backgroundColor: "green",
            marginLeft: "35%",
            width: 250,
          }}
          onClick={() => setIsOpen(true)}
        >
          Train Model
        </ButtonM>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Train Model"
          className={classes.Modal}
          overlayClassName={classes.Overlay}
        >
          <GridContainer>
            <GridItem xs={11}>
              <Card>
                <CardHeader color="success">
                  <h4 className={classes.cardTitleWhite}>Train Model</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12}>
                      <TextField
                        variant="standard"
                        fullWidth
                        required
                        placeholder="https://...../...../"
                        id="train"
                        label="Root URL"
                        name="train"
                        autoComplete="root url"
                        autoFocus
                        onChange={(e) => setTrain(e.target.value)}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12}>
                      <TextField
                        variant="standard"
                        fullWidth
                        style={{
                          marginTop: "20px",
                        }}
                        defaultValue={product}
                        id="train"
                        label="Project Name"
                        name="train"
                        autoComplete="Enter Project Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button
                    disabled={loading}
                    onClick={trainModel}
                    color="danger"
                  >
                    Create
                  </Button>
                  <Button disabled={loading} onClick={deleteModel} color="info">
                    Delete
                  </Button>
                  <Button onClick={() => setIsOpen(false)} color="danger">
                    Close
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </Modal>
        {loading ? <div style={{position:'relative', zIndex:10, bottom:370, left:350}}><ReactLoading type={'spin'} color={'red'} height={'15%'} width={'15%'} /> </div> :  <div></div>}
      </div>
      {party ? <Party /> : <div></div>}
    </div>
  );
}
