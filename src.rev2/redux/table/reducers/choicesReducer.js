import {MOCK_CHOICES} from "../../../assets/MOCK_CHOICES";
import * as ActionTypes from '../actionTypes';

const initialState = MOCK_CHOICES;

const choicesReducer =  (state=initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CHOICES:
      const {column, choices} = action.payload;
      return {
        ...state,
        [column]: choices
      };

    default:
      return state;
  }

}

export default choicesReducer;

