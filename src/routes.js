import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Login from 'views/Login/Login.js'

const dashboardRoutes = [
  {
    path: "/project",
    name: "Projects",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Logout",
    icon: ExitToAppIcon,
    component: Login,
    layout: "/admin"
  }
 
  
];

export default dashboardRoutes;
