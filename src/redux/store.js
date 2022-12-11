import { createStore, combineReducers } from "redux";
import rowsReducer from "./reducers/rowsReducer";
import columnsReducer from "./reducers/columnsReducer";

const store = createStore(combineReducers({
  rows: rowsReducer,
  columns: columnsReducer
}));

export default store;