import React from 'react';
import ListItems from "../ListIItems/ListItems";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// Generate Order Data
function createData(id, name, peopleAmount, averageAge) {
  return {id, name, peopleAmount, averageAge};
}

const rows = [
  createData(0, 'Group1', 18, 22),
  createData(1, 'Group2', 22, 35),
  createData(2, 'Group3', 47, 27),
  createData(3, 'Eladio Deckow', 31, 54),
  createData(4, 'Mr. Hugh Schamberger', 24, 32),
  createData(5, 'Miss Celestine Casper', 19, 21),
];

const labels = [
  'Group Name',
  'People Amount',
  'Average Age'
];

const col_keys = [
  'name',
  'peopleAmount',
  'averageAge'
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

function RentAFriend() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.appBarSpacer}/>


      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <ListItems rows={rows} labels={labels} col_keys={col_keys} title="Groups"
                     actionElement={(
                       <Button variant="outlined">
                         Invite
                       </Button>
                     )}
          />
        </Paper>
      </Grid>
    </div>
  );
}

export default RentAFriend;
