import React from 'react';
import ListItems from "../ListIItems/ListItems";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Orders from "../Dashboard/Orders";
import Grid from "@material-ui/core/Grid";

// Generate Order Data
function createData(id, full_name, email, phone_number, address, sex) {
  return { id, full_name, email, phone_number, address, sex };
}

const rows = [
  createData(0, 'Preston Padberg', 'kiarra42@gmail.com', '(033)430-1508x258', '7732 Rau Camp Suite 215\nWest Kileymouth, OH 14983', ' male'),
  createData(1,'Ettie Waelchi', 'pbosco@hotmail.com', '(985)729-3819x17057', '9366 Ward Trace Suite 212\nEast Davionborough, MI 09688', ' male'),
  createData(2,'Ayana Fahey PhD', 'dpfeffer@hotmail.com', '204-141-4058', '45948 Gibson Island Apt. 046\nWest Annabell, FL 09873', ' male'),
  createData(3,'Eladio Deckow', 'jhuels@gmail.com', '1-808-861-5244x30799', '6206 Jerde Corners Apt. 683\nSabinaborough, KS 59596', 'female'),
  createData(4,'Mr. Hugh Schamberger', 'katlyn.gaylord@hotmail.com', '699.193.0161x066', '93359 Yost Garden\nEast Parisburgh, MA 39018', 'female'),
  createData(5,'Miss Celestine Casper', 'tdenesik@gmail.com', '1-099-935-2960', '323 Tony Hill Apt. 688\nDrewstad, GA 72947', ' male')
];

const labels = [
  'Full Name',
  'Email',
  'Phone Number',
  'Address',
  'Sex'
];

const col_keys = [
  'full_name',
  'email',
  'phone_number',
  'address',
  'sex'
];
const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },

}));

function Friends() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.appBarSpacer}/>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <ListItems rows={rows} labels={labels} col_keys={col_keys} title="My Friends"/>
        </Paper>
      </Grid>
    </div>
  );
}

export default Friends;
