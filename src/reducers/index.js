import { combineReducers } from "redux";

import connect4Reducer from "./connect4Reducer";
import simonSaysReducer from "./simonSaysReducer";

export default combineReducers({
  connect4: connect4Reducer,
  simonSays: simonSaysReducer
});
