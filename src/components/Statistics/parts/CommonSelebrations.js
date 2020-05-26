
import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {getTodayDataFormatted} from "../../../helpers/dataHelperFunctions";
import Button from "@material-ui/core/Button";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import ListItems from "../../ListIItems/ListItems";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import {getSelectMenuItemsStyles, MenuProps} from "../../../helpers/selectHelperFunctions";

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
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


const friendsNames = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function Commoncelebrations() {
  const classes = useStyles();
  const theme = useTheme();

  const [friendName, setFriendName] = React.useState(clientsNames[0]);
  const [clientName, setClientName] = React.useState(clientsNames[0]);

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
                {clientsNames.map(name => (
                  <MenuItem key={name} value={name} style={getSelectMenuItemsStyles(name, clientsNames, theme)}>
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
                {friendsNames.map(name => (
                  <MenuItem key={name} value={name} style={getSelectMenuItemsStyles(name, clientsNames, theme)}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item container xs={3} justify={"flex-end"} alignItems={"center"}>
              <Button variant="outlined">
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
