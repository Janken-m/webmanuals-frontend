import { combineReducers } from "redux";
import { Api } from "./Api";
export default combineReducers({
  [Api.reducerPath]: Api.reducer,
});
