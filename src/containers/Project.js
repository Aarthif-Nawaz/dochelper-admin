import React, { useState, useRef, useEffect } from "react";
import Card from "../components/card";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import axios from "axios";
import { Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import "intersection-observer";
import 'semantic-ui-css/semantic.min.css'
import { ScrollView } from "@cantonjs/react-scroll-view";
import { Icon } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";
import '../style/login.css'
function Project(props) {
    const history = useHistory();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState("");
  const [proj, setProj] = useState([]);
  
    const positions = 150
  const handleEndReached = () => {
    console.log("load more");
  };

  const trainModel = (e) => {
    e.preventDefault()
    props.history.push({
        pathname: "/train",
        state: {
            data: props.match.params.user,
          },
      });
  }

  async function getProjects() {
      
      
    var database = props.match.params.user;
    database = database.split("@");
    const response = await fetch(
      `http://35.184.216.242:5000/projects/${database[0]}`
    );
    const json = await response.json();
    console.log(json.result);
    if(json.result === "No such Database exists"){
        setProj([])
    }
    else{
        setProj(json.result);
        console.log(proj)
    }
    
  }

  React.useEffect(function effectFunction() {
    getProjects();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    var database = props.match.params.user;
    database = database.split("@");
    const add_project = {
      name: name,
      user: database[0],
    };
    setLoading(true);
    axios
      .post("http://35.184.216.242:5000/addProject", add_project)
      .then((response) => {
        console.log(response);
        setLoading(false);
        getProjects();
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };
  return (
    <div>
      <h1
        style={{
          marginTop: "20px",
          textAlign: "center",
          color: "#37689C",
          fontSize: "40px",
          fontFamily: "'Oswald', sans-serif"
        }}
      >
        Projects For {props.match.params.user}
      </h1>

      <Paper
        elevation={5}
        square="true"
        style={{
          width: "95%",
          marginLeft: "30px",
          marginTop: "40px",
          height: "235px",
          border: "2px solid white",
        }}
      >
        <div
          style={{
            marginTop: "20px",
            marginLeft: "20px",
          }}
        >
          <h5
            style={{
              marginBottom: "20px",
              color: "#37689C",
              fontSize: "26px",
              fontWeight: "400",
              fontFamily: "'Oswald', sans-serif"
            }}
          >
            Create a new project{" "}
          </h5>
          <TextField
            variant="outlined"
            style={{
              width: "500px",
            }}
            required
            placeholder="Enter Project Name"
            id="train"
            label="Project Name"
            name="train"
            autoComplete="Enter Project Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Fab
            onClick={handleSubmit}
            fullWidth
            disabled={loading}
            variant="extended"
            color="primary"
            style={{
              width: 200,
              position: "absolute",
              left: "4%",
              top: "42%",
            }}
          >
            Create Project
          </Fab>
        </div>
      </Paper>
      <ScrollView onEndReached={handleEndReached} style={{ height: "100vh" }}>
        <Paper
          elevation={5}
          square="true"
          style={{
            overflow: 'auto',
            width: "95%",
            marginLeft: "30px",
            marginTop: "40px",
            height: "400px",
            border: "2px solid white",
          }}
        >
          <div
            style={{
              marginTop: "20px",
              marginLeft: "20px",
            }}
          >
            <h5
              style={{
                marginBottom: "20px",
                color: "#37689C",
                fontSize: "26px",
                fontWeight: "400",
                fontFamily: "'Oswald', sans-serif"
              }}
            >
              Created Projects{" "}
            </h5>
          </div>
          
          {proj.map((p, index) => {
            return (
            
              <div
                key={index}
                style={{
                  marginBottom: "30px",
                  marginLeft: "20px",
                }}
              >
                <Card header={p.project_name} />
                <Fab
            onClick={trainModel}
            fullWidth
            disabled={loading}
            variant="extended"
            color="primary"
            style={{
              width: 200,
              position: "absolute",
              right: "4%",
              top: "58%",
            }}
          >
            Train Model
          </Fab>
              </div>
            );
          })}
        </Paper>
      </ScrollView>
    </div>
  );
}

export default Project;
