import {
  drawerWidth,
  transition,
  container
} from "assets/jss/material-dashboard-react.js";

const appStyle = theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "Bebas Neue,'cursive'",
    marginBottom: "3px",
    textDecoration: "none"
  },
  cardTitleBlack: {
    color: "black",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "Bebas Neue,'cursive'",
    marginBottom: "3px",
    textDecoration: "none"
  },
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  Modal : {
    position: 'absolute',
    left: '23%',
    top:'50%',
    width:1000,
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
    fontFamily: "Bebas Neue,'cursive'"
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)",
    fontFamily: "Bebas Neue,'cursive'"
  },
  container,
  map: {
    marginTop: "70px",
    fontFamily: "Bebas Neue,'cursive'"
  }
});

export default appStyle;
