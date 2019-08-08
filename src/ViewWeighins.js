import React, { useContext } from "react";
import moment from "moment";
import { useCollection } from "react-firebase-hooks/firestore";
import { UserContext } from "./firebase/FirebaseUser";
import { FirebaseContext } from "./firebase/firebase";
import useInitialfocus from "./hooks/useInitialFocus";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Viewweighins = () => {
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
  const main = React.createRef(null);
  const user = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const [weighIns, loading, error] = useCollection(
    firebase.db
      .collection("weighins")
      .where("uid", "==", user.uid ? user.uid : "")
      .orderBy("date")
  );
  useInitialfocus(main, "View Weigh-Ins");
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <h1 ref={main} tabIndex="-1">
        View Weighins
      </h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error:{error}</div>}
      {weighIns && (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Change Since Last Weigh-in</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weighIns.docs.map(doc => {
              const data = doc.data();
              const { date, weight, difference } = data;
              return (
                <TableRow key={doc.id}>
                  <TableCell>
                    {moment(date.toDate()).format("MM/DD/YYYY")}
                  </TableCell>
                  <TableCell>{weight}</TableCell>
                  <TableCell>{difference}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};
export default Viewweighins;
