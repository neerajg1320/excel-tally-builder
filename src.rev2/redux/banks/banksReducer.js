import {MOCK_BANKS} from "../../assets/MOCK_BANKS";
import * as ActionTypes from './actionTypes';

const initialState = {
  current: "KotakBank",
  list: MOCK_BANKS
};

const banksReducer =  (state=initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_BANKS:
      return {
        ...state,
        list: action.payload
      };

    case ActionTypes.SET_CURRENT_BANK:
      return {
        ...state,
        current: action.payload
      };

    default:
      return state;
  }

}

export default banksReducer;
