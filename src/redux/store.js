import { createStore, combineReducers } from "redux";
import rowsReducer from "./table/reducers/rowsReducer";
import columnsReducer from "./table/reducers/columnsReducer";

const store = createStore(combineReducers({
  rows: rowsReducer,
  columns: columnsReducer
}));

export default store;