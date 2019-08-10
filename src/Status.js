import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
//import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

const Status = ({ weight, bmi, difference }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <h1>Status</h1>
      <Table className={classes.table}>
        <TableBody>
          <TableRow>
            <TableCell>Current Weight</TableCell>
            <TableCell>{weight}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Current BMI</TableCell>
            <TableCell>{parseFloat(bmi).toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Weight Loss Since Last Weigh In</TableCell>
            <TableCell>{difference}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};
export default Status;
