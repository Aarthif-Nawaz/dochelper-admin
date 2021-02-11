import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import Admin from "layouts/Admin.js";
import Login from 'views/Login/Login'
import signup from 'views/Register/SignUp'
import Train from 'views/Train/Train'
import ForgotEmail from 'views/Forgot/forgot'
import ResetPass from 'views/Forgot/reset'

import "assets/css/material-dashboard-react.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/admin/login" component={Login} />
      <Route exact path="/admin/signup" component={signup} />
      <Route exact path="/admin/train" component={Train} />
      <Route exact path="/admin/forgot" component={ForgotEmail} />
      <Route exact path="/admin/reset/:email" component={ResetPass} />      
      <Route path="/admin" component={Admin} />
      <Redirect from="/material-dashboard-react" to="/" />
      <Redirect from="/admin" to="/admin/project" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
