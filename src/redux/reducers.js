import cartReducer from "./cart/cartReducer";
import tallyReducer from "./tallyServer/tallyReducer";
import configReducer from "./config/configReducer";
import {combineReducers} from "redux";

const allReducers = combineReducers({
  cart: cartReducer,
  tally: tallyReducer,
  config: configReducer
});

export default allReducers;
