import React from "react";

import {
  Paper,
  Button
} from "@material-ui/core";
import ListItems from "../ListIItems/ListItems";
import {makeStyles} from "@material-ui/core/styles";
import {getUser} from "../../reducers";
import {connect} from "react-redux";


const giftsRows = [
  createGiftData(0, 0, ' journey', 2520),
  createGiftData(1, 0, 'toy', 169),
  createGiftData(2, 1, ' dinner out', 2715),
  createGiftData(3, 2, ' favourite food', 830),
  createGiftData(4, 0, ' tent ', 1836),
  createGiftData(5, 1, ' book', 114),
];

const giftsLabels = [
  'Gift',
  'Price'
];

const giftsColKeys = [
  'name',
  'price'
];

function createGiftData(id, client_id, name, price) {
  return {id, client_id, name, price};
}

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
    },
    minWidth: theme.breakpoints.values.sm * 1.3
  }
}));


function FriendGifts({user}) {
  const classes = useStyles();

  const [giftsList, setGiftsList] = React.useState(giftsRows);

  fetch(`/get-gifts?user-id=${user.id}`)
    .then(response => response.json())
    .then(list => setGiftsList(list))
    .catch(console.error);

  function returnGift(event) {
    const rowIndex = +event.target.parentNode.parentNode.attributes._row_index.value;

    const {client_id, id} = giftsList[rowIndex];

    fetch(`/return-gift?friend_id=${user.id}&client_id=${client_id}&gift_id=${id}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(list => setGiftsList(list))
      .catch(console.error);
  }

  return (
    <div>
      <div className={classes.appBarSpacer}/>
      <Paper className={classes.paper}>
        <ListItems rows={giftsList} labels={giftsLabels} col_keys={giftsColKeys} title="Gifts"
                   actionElement={(
                     <Button variant="outlined" onClick={returnGift}>
                       Return
                     </Button>
                   )}
        />
      </Paper>
    </div>

  );
}

const mapStateToProps = state => ({
  user: getUser(state)
});

export default connect(mapStateToProps)(FriendGifts);
