import { createStore, combineReducers } from "redux";
import rowsReducer from "./table/reducers/rowsReducer";
import columnsReducer from "./table/reducers/columnsReducer";
import tallyReducer from "./tallyServer/tallyReducer";

const store = createStore(combineReducers({
  rows: rowsReducer,
  columns: columnsReducer,
  tally: tallyReducer
}));

export default store;