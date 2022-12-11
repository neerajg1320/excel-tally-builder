import { SET_DEBUG } from "./configActionTypes";

const initialState = {
  debug: false
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEBUG:
      return {
        ...state,
        debug: action.payload
      };

    default:
      return state;
  }
};

export default configReducer;
