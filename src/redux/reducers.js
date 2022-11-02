import cartReducer from "./cart/cartReducer";
import tallyReducer from "./tallyServer/tallyReducer";
import {combineReducers} from "redux";

const allReducers = combineReducers({
  cart: cartReducer,
  tally: tallyReducer
});

export default allReducers;
