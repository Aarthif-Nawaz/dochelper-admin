import React , {useState, useRef, useEffect} from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {BASE_URL} from "service";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Fab from '@material-ui/core/Fab';
import MyLoader from 'components/loading'


toast.configure()

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://aarthif-nawaz.github.io/">
        Aarthif Nawaz
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://www.attuneww.com/wp-content/uploads/2017/07/ws02-api-manager-1.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const history = useHistory();
  const [email,setEmail] = useState("")
  const [conf,setconf] = useState("")
  const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)
const classes = useStyles();


const handleSubmit = (e) => {
  e.preventDefault();
  if(email==="" || password==="" || conf===""){
    toast.error("Please fill in all fields !", {
      position: toast.POSITION_TOP_RIGHT,
    });
  }
  else if(password !== conf){
    toast.error("Passwords dont match !", {
      position: toast.POSITION_TOP_RIGHT,
    });
  }
  else if (email !== "undefined") {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(email)) {
      toast.error("Please enter valid email address !", {
        position: toast.POSITION_TOP_RIGHT,
      });
    }
    else{
      const user = {
        email:email,
        password:password,
        conf:conf
      }
      const options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      axios.post("http://35.184.216.242:5000/user/register", user).then((response) => {
          console.log(response);
          if (response.data.result == "User already exists") {
            toast.warn("You are already registered", {
              position: toast.POSITION_TOP_RIGHT,
            });
            props.history.push({
              pathname: "/admin/login",
            });
          } else {
              props.history.push({
                pathname: "/admin/login",
              });
            }
        }).catch((error) => {
          console.log(error);
        });
    }  
  }
}

  return (
    <Grid container component="main" className={classes.root}>
       {loading ? <div className="loader" style={{position:'absolute',left:'45%',top:'30%'}}>
      <MyLoader active={loading} />
      </div> : <MyLoader active={loading} />}
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confpassword"
              label="Confirm Password"
              type="password"
              id="confpassword"
              autoComplete="confirm-password"
              onChange={(e) => setconf(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/admin/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignUp;
