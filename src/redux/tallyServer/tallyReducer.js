import { SET_STATUS } from "./tallyActionTypes";

const flagDebugTallyReducer = false;

const initialState = {
  status: false,
  debug: false
};

const tallyReducer = (state = initialState, action) => {
  if (flagDebugTallyReducer) {
    console.log('action=', action);
  }

  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        status: action.payload.value
      };

    case SET_STATUS:
      return {
        ...state,
        debug: action.payload.value
      };

    default:
      return state;
  }
};

export default tallyReducer;
