import {combineReducers} from "redux";
import rowsReducer from "../../src.rev2/redux/table/reducers/rowsReducer";
import columnsReducer from "../../src.rev2/redux/table/reducers/columnsReducer";
import choicesReducer from "../../src.rev2/redux/table/reducers/choicesReducer";
import tallyReducer from "../../src.rev2/redux/tallyServer/tallyReducer";
import configReducer from "../../src.rev2/redux/config/configReducer";
import banksReducer from "./banks/banksReducer";

const rootReducer = combineReducers({
  rows: rowsReducer,
  columns: columnsReducer,
  choices: choicesReducer,
  tally: tallyReducer,
  config: configReducer,
  banks: banksReducer
})

export default rootReducer;