import { combineReducers } from "redux";
import entitiesReducers from "./entities";
import { Api } from "./Api";
export default combineReducers({
  entities: entitiesReducers,
  [Api.reducerPath]: Api.reducer,
});
