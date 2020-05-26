import React from 'react';
import ListItems from "../ListIItems/ListItems";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Orders from "../Dashboard/Orders";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {getTodayDataFormatted} from "../../helpers/dataHelperFunctions";

// Generate Order Data
function createData(id, full_name, age, sex) {
  return {id, full_name, sex, age};
}

const rows = [
  createData(0, 'Preston Padberg', 18, ' male'),
  createData(1, 'Ettie Waelchi', 22, ' male'),
  createData(2, 'Ayana Fahey PhD', 47, ' male'),
  createData(3, 'Eladio Deckow', 31, 'female'),
  createData(4, 'Mr. Hugh Schamberger', 24, 'female'),
  createData(5, 'Miss Celestine Casper', 19, ' male'),
];

const labels = [
  'Full Name',
  'Age',
  'Sex'
];

const col_keys = [
  'full_name',
  'age',
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

function RentAFriend() {
  const classes = useStyles();
  const [minMeetingsAmount, setMinMeetingsAmount] = React.useState(1);
  const [minGroupAmount, setMinGroupAmount] = React.useState(1);

  return (
    <div>
      <div className={classes.appBarSpacer}/>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container justify={"space-between"}>
            <Grid item xs={3}>
              <TextField
                label="Meetings amount"
                value={minMeetingsAmount}
                onChange={event => setMinMeetingsAmount(parseInt(event.target.value))}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="From date"
                type="date"
                defaultValue={getTodayDataFormatted({changeMonth: -1})}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Till date"
                type="date"
                defaultValue={getTodayDataFormatted({})}
              />
            </Grid>
            <Grid item container xs={3} justify={"flex-end"} alignItems={"center"} >
              <Button variant="outlined">
                Apply
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>


      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container justify={"space-between"}>
            <Grid item xs={3}>
              <TextField
                label="Group amount"
                value={minGroupAmount}
                onChange={event => setMinGroupAmount(parseInt(event.target.value))}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="From date"
                type="date"
                defaultValue={getTodayDataFormatted({changeMonth: -1})}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Till date"
                type="date"
                defaultValue={getTodayDataFormatted({})}
              />
            </Grid>
            <Grid item container xs={3} justify={"flex-end"} alignItems={"center"} >
              <Button variant="outlined">
                Apply
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>


      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <ListItems rows={rows} labels={labels} col_keys={col_keys} title="Friends"
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
