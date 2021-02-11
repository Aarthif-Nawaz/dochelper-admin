import React , { useState, useRef, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {BASE_URL} from "service";
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import MyLoader from 'components/loading'
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
 
const SweetAlert = withSwalInstance(swal);

toast.configure()


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://aarthif-nawaz.github.io/">
        Aarthif Nawaz
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://www.attuneww.com/wp-content/uploads/2017/07/ws02-api-manager-1.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Forgot(props) {
  const history = useHistory();
  const [show,setShow] = useState(false)
    const [email,setEmail] = useState("")
    const [loading,setLoading] = useState("")
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(email===""){
      toast.error("Please fill in all fields !", {
        position: toast.POSITION_TOP_RIGHT,
      });
    }
    else{
        
      const user = {
        email:email,
      }

      const options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      setLoading(true)
      axios
        .post(BASE_URL+"/admin/forgot", user, options)
        .then((response) => {
          setLoading(false)
          console.log(response);
          if (response.data.result == "email doesnt exist") {
            toast.error("You are not registered", {
              position: toast.POSITION_TOP_RIGHT,
            });
            props.history.push({
              pathname: "/admin/signup",
            });
          } else if (response.data.error == "Invalid username and password") {
            toast.error("Invalid Username and password", {
              position: toast.POSITION_TOP_RIGHT,
            });
          } else {
            localStorage.setItem("emailID",email)
              setShow(true)
            }
        }).catch((e) => {
            console.log(e)
        });
    }
    
  }

  return (
    <Grid container component="main" className={classes.root}>
      {loading ? <div className="loader" style={{position:'absolute',left:'45%',top:'30%'}}>
      <MyLoader active={loading} />
      </div> :  <MyLoader active={loading} children="Logging In" />}
      <SweetAlert
            show={show}
            title="Reset Password"
            text="Please Check Email And Reset Password"
            onConfirm={() => setShow(false)}                  
        />
      
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forogt Password
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Forgot;