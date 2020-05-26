import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ListItems from "../ListIItems/ListItems";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {getTodayDataFormatted} from '../../helpers/dataHelperFunctions';
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import useTheme from "@material-ui/core/styles/useTheme";
import InputLabel from "@material-ui/core/InputLabel";


const giftsRows = [
  createGiftData(0, ' journey', 2520),
  createGiftData(1, 'toy', 169),
  createGiftData(2, ' dinner out', 2715),
  createGiftData(3, ' favourite food', 830),
  createGiftData(4, ' tent ', 1836),
  createGiftData(5, ' book', 114),
];

const giftsLabels = [
  'Gift',
  'Price'
];

const giftsColKeys = [
  'name',
  'price'
];

function createGiftData(id, name, price) {
  return {id, name, price};
}

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    '&:focus': {
      outline: '0px'
    },
    minWidth: theme.breakpoints.values.sm * 1.3
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function GiftsModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [clientName, setClientName] = React.useState(clientsNames[0]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.giftsModalOpen}
      onClose={() => props.setGiftsModalOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={props.giftsModalOpen}>
        <Paper className={classes.paper}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container justify={"space-between"}>
                <Grid item xs={3}>
                  <InputLabel id="client-select-label">Client</InputLabel>
                  <Select
                    labelId="client-select-label"
                    defaultValue={clientName}
                    onChange={event => setClientName(event.target.value)}
                    input={<Input/>}
                    MenuProps={MenuProps}
                  >
                    {clientsNames.map(name => (
                      <MenuItem key={name} value={name} style={getStyles(name, clientsNames, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
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
          <Paper className={classes.paper}>
            <ListItems rows={giftsRows} labels={giftsLabels} col_keys={giftsColKeys} title="Gifts"
                       actionElement={(
                         <Button variant="outlined">
                           Send
                         </Button>
                       )}
            />
          </Paper>
        </Paper>
      </Fade>
    </Modal>
  );
}