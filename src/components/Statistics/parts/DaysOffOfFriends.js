import React from "react";
import {
  Paper,
  Grid,
  TextField,
  Button
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ListItems from "../../ListIItems/ListItems";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    '&:focus': {
      outline: '0px'
    }
  }
}));


const daysOffLabels = [
  'Date',
  'Number Of Friends'
];

const daysOffColKeys = [
  'date',
  'number'
];


// Generate Order Data
function createData(id, date, number) {
  return {id, date, number};
}


const daysOffRows = [
  createData(0, '2001-07-04', 322),
  createData(1, '2011-03-14', 124),
  createData(2, '2009-11-25', 434),
  createData(3, '2021-09-02', 12),
  createData(4, '2011-03-14', 127),
];


export default function DaysOffOfFriends() {
  const classes = useStyles();
  const [minFriendsAmount, setMinFriendsAmount] = React.useState(1);
  const [maxFriendsAmount, setMaxFriendsAmount] = React.useState(1);

  const [daysOff, setDaysOff] = React.useState(daysOffRows);

  React.useEffect(() => filterData(), []);


  function filterData() {
    fetch(`/find-days-off-for-friends-of-client?A=${minFriendsAmount}&B=${maxFriendsAmount}`)
      .then(response => response.json())
      .then(data => setDaysOff(data))
      .catch(console.error);
  }
  return (
    <div>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container justify={"space-between"}>
            <Grid item xs={3}>
              <TextField
                label="Min friend amount"
                value={minFriendsAmount}
                onChange={event => setMinFriendsAmount(parseInt(event.target.value))}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Max friend amount"
                value={maxFriendsAmount}
                onChange={event => setMaxFriendsAmount(parseInt(event.target.value))}
              />
            </Grid>
            <Grid item container xs={3} justify={"flex-end"} alignItems={"center"}>
              <Button variant="outlined" onClick={filterData}>
                Apply
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>


      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <ListItems rows={daysOff} labels={daysOffLabels} col_keys={daysOffColKeys}
                     title="Dates when friends have days off"/>
        </Paper>
      </Grid>
    </div>
  );
}

