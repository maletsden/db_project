import React from 'react';
import ListItems from "../ListIItems/ListItems";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendGiftsModal from "../SendGiftsModal/SendGiftsModal";
import {getTodayDataFormatted} from '../../helpers/dataHelperFunctions';
import {getUser} from "../../reducers";
import {connect} from "react-redux";

const friendsLabels = [
  'Full Name',
  'Email',
  'Phone Number',
  'Address',
  'Sex'
];

const friendsColKeys = [
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
    '&:focus': {
      outline: '0px'
    }
  }
}));


// Generate Order Data
function createData(id, full_name, email, phone_number, address, sex) {
  return {id, full_name, email, phone_number, address, sex};
}


const friendsRows = [
  createData(0, 'Preston Padberg', 'kiarra42@gmail.com', '(033)430-1508x258', '7732 Rau Camp Suite 215\nWest Kileymouth, OH 14983', ' male'),
  createData(1, 'Ettie Waelchi', 'pbosco@hotmail.com', '(985)729-3819x17057', '9366 Ward Trace Suite 212\nEast Davionborough, MI 09688', ' male'),
  createData(2, 'Ayana Fahey PhD', 'dpfeffer@hotmail.com', '204-141-4058', '45948 Gibson Island Apt. 046\nWest Annabell, FL 09873', ' male'),
  createData(3, 'Eladio Deckow', 'jhuels@gmail.com', '1-808-861-5244x30799', '6206 Jerde Corners Apt. 683\nSabinaborough, KS 59596', 'female'),
  createData(4, 'Mr. Hugh Schamberger', 'katlyn.gaylord@hotmail.com', '699.193.0161x066', '93359 Yost Garden\nEast Parisburgh, MA 39018', 'female'),
  createData(5, 'Miss Celestine Casper', 'tdenesik@gmail.com', '1-099-935-2960', '323 Tony Hill Apt. 688\nDrewstad, GA 72947', ' male'),
];



function FriendClients({user}) {
  const classes = useStyles();
  const [minMeetingsAmount, setMinMeetingsAmount] = React.useState(1);
  const [giftsModalOpen, setGiftsModalOpen] = React.useState(false);
  const [clientsList, setClientsList] = React.useState(friendsRows);

  const [fromDate, setFromDate] = React.useState(getTodayDataFormatted({changeMonth: -1}));
  const [tillDate, setTillDate] = React.useState(getTodayDataFormatted({}));


  fetch(`/get-clients?user-id=${user.id}`)
    .then(response => response.json())
    .then(clients => setClientsList(clients))
    .catch(console.error);


  function filterClients() {
    fetch(
      `/find-clients-of-friend?X=${user.id}&N=${minMeetingsAmount}&F=${fromDate}&T=${tillDate}`
    )
      .then(response => response.json())
      .then(clients => setClientsList(clients))
      .catch(console.error);
  }

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
                value={fromDate}
                onChange={event => setFromDate(event.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Till date"
                type="date"
                value={tillDate}
                onChange={event => setTillDate(event.target.value)}
              />
            </Grid>
            <Grid item container xs={3} justify={"flex-end"} alignItems={"center"} >
              <Button variant="outlined" onClick={filterClients}>
                Apply
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>


      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <ListItems rows={clientsList} labels={friendsLabels} col_keys={friendsColKeys} title="My Clients"/>
        </Paper>
      </Grid>

      <SendGiftsModal giftsModalOpen={giftsModalOpen} setGiftsModalOpen={value => setGiftsModalOpen(value)}/>
    </div>
  );
}

const mapStateToProps = state => ({
  user: getUser(state)
});

export default connect(mapStateToProps)(FriendClients);
