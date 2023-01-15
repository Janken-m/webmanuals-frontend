import { combineReducers } from "redux";
import urlsReducer from "./urls";

export default combineReducers({
  urls: urlsReducer,
});
