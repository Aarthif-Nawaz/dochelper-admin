import React ,{useState, useEffect} from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "service";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import 'assets/css/material-dashboard-react.css'

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const history = useHistory();
  const [name,setName] = useState("")
  const [desc,setDes] = useState("")
  const [proj,setProj] = useState([])
  const [links,setLinks] = useState([])

  async function getProjects() {
    var database = sessionStorage.getItem("database");
    database = database.split("@");
    const response = await fetch(BASE_URL+`/projects/${database[0]}`)

    const json = await response.json();
    //console.log(json.result[0].links)
    if(json.result === "No such Database exists"){
        setProj([])
    }
    else{
      setLinks(json.result[0].links)
        setProj(json.result);
    }
    
  }

  useEffect(() => {
    getProjects();
  },[])


  const CreateProject = (e) => {
    e.preventDefault()
    var database = sessionStorage.getItem("database")
    database = database.split("@");

    const add_project = {
      name: name,
      description: desc,
      user: database[0],
    };

    axios
      .post(BASE_URL+"/addProject", add_project)
      .then((response) => {
        console.log(response);
        getProjects();
      })
      .catch((e) => {
        console.log(e);
        //setLoading(false);
      });

  }

  var database = sessionStorage.getItem("database")
  database = database.split("@");

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Create Projects</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12}>
                <TextField
            variant="standard"
            fullWidth
            placeholder="Enter Project Name"
            id="train"
            label="Project Name"
            name="train"
            autoComplete="Enter Project Name"
            onChange={(e) => setName(e.target.value)}
          />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12}>
                <TextField
            variant="standard"
            style={{
              marginTop:"20px"
            }}
            fullWidth
            placeholder="Enter Project Description"
            id="train"
            label="Project Description"
            name="train"
            autoComplete="Enter Project Description"
            onChange={(e) => setDes(e.target.value)}
          />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button onClick={CreateProject} color="success">Create</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Projects</h4>
            </CardHeader>
            <CardBody style={{overflow: 'auto'}}>
              <Table
                tableHeaderColor="info"
                done={true}
                tableHead={["Project Name", "Description", "Trained URLs", "Status","View"]}
                tableData={proj.map((project) => (
                  [project.project_name,project.description,project.links, "Active"]
                ))}
                // tableData={[
                //   ["APIM", "Dakota Rice", "$36,738", "Niger"],
                //   ["IS", "Minerva Hooper", "$23,789", "Curaçao"],
                //   ["EI", "Sage Rodriguez", "$56,142", "Netherlands"],
                //   ["Test", "Philip Chaney", "$38,735", "Korea, South"]
                // ]}
                history={history}
                database={sessionStorage.getItem("database")}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}