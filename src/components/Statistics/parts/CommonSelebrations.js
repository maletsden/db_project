import React from "react";
import {
  Paper,
  Grid,
  InputLabel,
  Button,
  Select,
  Input,
  MenuItem
} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import ListItems from "../../ListIItems/ListItems";
import {getSelectMenuItemsStyles, MenuProps} from "../../../helpers/selectHelperFunctions";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import {getTodayDataFormatted} from "../../../helpers/dataHelperFunctions";

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


const celebrationsLabels = [
  'Date',
  'Type',
  'Address',
  'Style',
];

const celebrationsColKeys = [
  'date',
  'type',
  'address',
  'style'
];


// Generate Order Data
function createData(id, type, address, style, date) {
  return {id, type, address, style, date};
}


const celebrationsRows = [
  createData(0,'garden', '68826 Dietrich Ridges', 'Military', '1978-12-07'),
  createData(1, 'open area', '20552 Monty Meadow Apt. 416', 'Mexican', '2000-08-21'),
  createData(2, 'garden', '2045 Cesar Trail Suite 658', 'Neighborhood', '1977-01-03'),
  createData(3, 'open area', '98662 Aufderhar Dam Apt. 749', 'Pajama Party', '1982-04-16')
];

const clientsNames = [
  createClientsData(0, 'Oliver Hansen'),
  createClientsData(1, 'Van Henry'),
  createClientsData(2, 'April Tucker'),
  createClientsData(3, 'Ralph Hubbard'),
  createClientsData(4, 'Omar Alexander')
];

const friendsNames = [
  createClientsData(0, 'Oliver Hansen'),
  createClientsData(1, 'Van Henry'),
  createClientsData(2, 'April Tucker'),
  createClientsData(3, 'Ralph Hubbard'),
  createClientsData(4, 'Omar Alexander')
];


function createClientsData(id, name) {
  return {id, name};
}
export default function Commoncelebrations() {
  const classes = useStyles();
  const theme = useTheme();

  const [clientsList, setClientsList] = React.useState(clientsNames);
  const [friendsList, setFriendsList] = React.useState(clientsNames);

  const [fromDate, setFromDate] = React.useState(getTodayDataFormatted({changeMonth: -1}));
  const [tillDate, setTillDate] = React.useState(getTodayDataFormatted({}));

  fetch(`/get-clients`)
    .then(response => response.json())
    .then(clients => setClientsList(clients))
    .catch(console.error);

  fetch(`/get-friends`)
    .then(response => response.json())
    .then(friends => setFriendsList(friends))
    .catch(console.error);


  const [friendName, setFriendName] = React.useState(clientsList[0]);
  const [clientName, setClientName] = React.useState(friendsList[0]);


  function filterCelebrations() {
    fetch(`/find-shared-events?X=${user.id}&client_id=${minMeetingsAmount}&F=${fromDate}&T=${tillDate}`)
      .then(response => response.json())
      .then(clients => setClientsList(clients))
      .catch(console.error);

  }
  return (
    <div>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container justify={"space-between"}>
            <Grid item xs={3}>
              <InputLabel id="client-select-label" style={{
                fontSize: '12px'
              }}>Client</InputLabel>
              <Select
                labelId="client-select-label"
                defaultValue={clientName}
                onChange={event => setClientName(event.target.value)}
                input={<Input/>}
                MenuProps={MenuProps}
              >
                {clientsNames.map(({name}, index) => (
                  <MenuItem key={index} value={index} style={getSelectMenuItemsStyles(name, clientsNames, theme)}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={3}>
              <InputLabel id="friend-select-label" style={{
                fontSize: '12px'
              }}>Friend</InputLabel>
              <Select
                labelId="friend-select-label"
                defaultValue={friendName}
                onChange={event => setFriendName(event.target.value)}
                input={<Input/>}
                MenuProps={MenuProps}
              >
                {friendsNames.map(({name}, index) => (
                  <MenuItem key={index} value={index} style={getSelectMenuItemsStyles(name, clientsNames, theme)}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="From date"
                type="date"
                value={fromDate}
                onChange={event => setFromDate(event.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Till date"
                type="date"
                value={tillDate}
                onChange={event => setTillDate(event.target.value)}
              />
            </Grid>
            <Grid item container xs={2} justify={"flex-end"} alignItems={"center"}>
              <Button variant="outlined" onClick={filterCelebrations}>
                Apply
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>


      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <ListItems rows={celebrationsRows} labels={celebrationsLabels} col_keys={celebrationsColKeys}
                     title="Common celebrations"/>
        </Paper>
      </Grid>
    </div>
  );
}
