import React, { useState, useRef, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Fab from '@material-ui/core/Fab';
import MyLoader from '../components/loading'
import Party from '../components/party'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../style/login.css'
toast.configure()


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8,4),
    marginBottom: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(6),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  

}));

function Train(props) {
  const classes = useStyles();
  const [train,setTrain] = useState("")
  const [product,setProduct] = useState('')
  const [loading,setLoading] = useState(false)
  const [party,setParty] = useState()
  const [text,setText] = useState("Pending for training")
  const [proj,setProj] = useState([])
  //props.location.state.data

  const handleChange = (event) => {
    console.log(event.target.value)
    setProduct(event.target.value);
  };


  const handleDelete = () => {
    var database = props.location.state.data;
    database = database.split("@");
    axios.delete(`http://35.184.216.242:5000/admin/delete/${database[0]}/${product}`).then((response) => {
      console.log(response)
      toast.success("Successfully Deleted Model !", {
        position: toast.POSITION_TOP_RIGHT,
      });
    }).catch((e) => {
      console.log(e)
      toast.success("Successfully Deleted Model !", {
        position: toast.POSITION_TOP_RIGHT,
      });
    })
  }
  const viewUrl = () => {
    var database = props.location.state.data;
    database = database.split("@");
    window.location.assign(`http://35.184.216.242:5000/user/${database[0]}`)
  } 
  async function getProjects() {
    var database = props.location.state.data;
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
    }
    
  }

  React.useEffect(function effectFunction() {
    getProjects();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    var database = props.location.state.data;
    database = database.split("@");

    if(train==="" || product===""){
      toast.error("Please fill in all fields !", {
        position: toast.POSITION_TOP_RIGHT,
      });
    }
    else if(!train.includes("https")|| !train.includes("http")){
      toast.error("Please enter a valid URL !", {
        position: toast.POSITION_TOP_RIGHT,
      });
    }
    else{
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
      setLoading(true)
      setText('Training Started')
      axios
        .post(`http://35.184.216.242:5000/admin/train/${database[0]}`, trainModel,{timeout:3600000},options)
        .then((response) => {
          setLoading(false)
          console.log(response);
          if(response.data.result==="completed"){
            toast.success("Successfully Trained Model !", {
              position: toast.POSITION_TOP_RIGHT,
            });
          }
          else{
            toast.error("An error Occurred !", {
              position: toast.POSITION_TOP_RIGHT,
            });
          }
          
        }).catch((e) => {
          setLoading(false)
          setText('Training Completed')
          setParty(true)
          setTimeout(() => {
            setParty(false)
          }, 12000);
          toast.success("Successfully Trained Model !", {
            position: toast.POSITION_TOP_RIGHT,
          });
          console.log(e);
        })
  
      
    }
  }

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Train Model
        </Typography>
        <form className={classes.form} validate>
          <TextField
            variant="outlined"
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
           <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label" style={{
          marginTop:'25px'
        }}>Product</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          style={{
            marginTop:'25px',
            width:1170
          }}
          value={product}
          onChange={handleChange}
          label="Project"
        >
        {proj.map((p,index) => (
          <MenuItem key={index} value={p.project_name}>{p.project_name}</MenuItem>
        ))} 
        </Select>
      </FormControl>
           <Fab
            onClick={handleDelete}
            fullWidth
            disabled={loading}
            variant="extended"
            color="secondary"
            style={{
                width:555,
                marginLeft:'20px'
            }}
            className={classes.submit}
          >
            Delete Model Trainings
          </Fab>
          <Fab
            onClick={handleSubmit}
            fullWidth
            disabled={loading}
            variant="extended"
            color="primary"
            style={{
                width:555,
                marginLeft:'30px'
            }}
            className={classes.submit}
          >
            Train
          </Fab>
        </form>
        <div style={{
          alignContent:'center',
        }}>
          <h5 style={{
            position:'absolute',
            left:'20%',
            bottom:'18.5%',
            fontFamily:'cursive',
            fontSize:'20px',
            fontWeight:'bold',
            fontStyle:'italic'
          }}>Status </h5><Fab fullWidth
            variant="extended"
            color="secondary"
            style={{
                width:300,
                marginLeft:10,
                marginTop:100
            }}>{text}</Fab>
        </div>
        <div style={{
          alignContent:'center',
        }}>
          <h5 style={{
            position:'absolute',
            left:'20%',
            bottom:'5.5%',
            fontFamily:'cursive',
            fontSize:'20px',
            fontWeight:'bold',
            fontStyle:'italic'
          }}>Chatbot URL </h5><Fab fullWidth
            variant="extended"
            color="primary"
            onClick={viewUrl}
            style={{
                width:300,
                marginLeft:10,
                marginTop:40
            }}>View Chatbot</Fab>
        </div>
      </div>
      {party ? <Party /> : <div></div>}
    </Container>
  );
}
export default Train