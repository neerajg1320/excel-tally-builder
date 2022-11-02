import { SET_STATUS, SET_DEBUG, SET_LEDGERS } from "./tallyActionTypes";

const flagDebugTallyReducer = false;

const initialState = {
  status: false,
  debug: false,
  ledgers: ['Cash', 'Bank']
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

    case SET_DEBUG:
      return {
        ...state,
        debug: action.payload.value
      };

    case SET_LEDGERS:
      return {
        ...state,
        ledgers: action.payload.value
      };

    default:
      return state;
  }
};

export default tallyReducer;
