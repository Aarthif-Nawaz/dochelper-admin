import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import {BASE_URL} from "service";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/img_avatar.png";

const styles = {
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
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  var database = sessionStorage.getItem("database");
  database = database.split("@");
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <img src={avatar} style={{marginLeft:'26em', width:'150px', heigh:'150px'}} />
        <GridItem xs={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>User Credentials</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={6}>
                  <h3 className={classes.cardTitleBlack}>Email : {sessionStorage.getItem("database")} </h3>
                  <h3 className={classes.cardTitleBlack}>Username : {database[0]} </h3>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
