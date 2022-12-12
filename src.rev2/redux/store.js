import { createStore, combineReducers } from "redux";
import rowsReducer from "./table/reducers/rowsReducer";
import columnsReducer from "./table/reducers/columnsReducer";
import tallyReducer from "./tallyServer/tallyReducer";
import configReducer from "./config/configReducer";
import choicesReducer from "./table/reducers/choicesReducer";

const store = createStore(combineReducers({
  rows: rowsReducer,
  columns: columnsReducer,
  choices: choicesReducer,
  tally: tallyReducer,
  config: configReducer
}));

export default store;