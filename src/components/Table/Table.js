import React, {useState} from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "components/CustomButtons/Button.js";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import {BASE_URL} from '../../service'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

toast.configure();
const useStyles = makeStyles(styles);

export default function CustomTable(props) {

  
  let name = ""
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, history, database, done } = props;

  const train = (proj) => {
    
    props.history.push({
      pathname: `/admin/train`,
    });
    sessionStorage.setItem("project",proj)
  }

  const deleteModel = (e,proj) => {
    e.preventDefault();
    var database = sessionStorage.getItem("database");
    database = database.split("@");
    axios
      .delete(BASE_URL + `/admin/delete/${database[0]}/${proj}`)
      .then((response) => {
        console.log(response);
        toast.success("Successfully Deleted Model !", {
          position: toast.POSITION_TOP_RIGHT,
        });
      })
      .catch((e) => {
        console.log(e);
        toast.success("Successfully Deleted Model !", {
          position: toast.POSITION_TOP_RIGHT,
        });
      });
  }
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell style={{
                      paddingBottom:"30px"
                    }} className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
                {done ? 
                <Button onClick={() => train(prop[0])} color="info">{prop[0]}</Button> : <></>}
                {done ? 
                <Button size='sm' onClick={(e) => deleteModel(e,prop[0])} color="danger">Delete</Button> : <></>}
                
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
