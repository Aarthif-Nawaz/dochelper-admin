import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from './containers/Login'
import SignUp from './containers/SignUp'
import Train from './containers/Train'
import Project from './containers/Project'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router history={History}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/train" component={Train} />
          <Route exact path="/:user/projects" component={Project} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
