import { LOGIN} from "../actions";
import {combineReducers} from "redux";

const initialUserState = {
  user: null
};

const user = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user;
    default:
      return state;
  }
};

export const getUser = state => state.user;

export default combineReducers({
  user
});