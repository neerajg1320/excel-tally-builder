import { SET_STATUS, SET_DEBUG, SET_LEDGERS, SET_COMPANIES, SET_CURRENT_COMPANY, SET_TARGET_COMPANY } from "./tallyActionTypes";

const flagDebugTallyReducer = false;

const initialState = {
  status: false,
  debug: false,
  ledgers: ['Cash', 'Bank'],
  companies: [],
  currentCompany: '',
  targetCompany: ''
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

    case SET_COMPANIES:
      return {
        ...state,
        companies: action.payload.value
      };

    case SET_CURRENT_COMPANY:
      return {
        ...state,
        currentCompany: action.payload.value
      };

    case SET_TARGET_COMPANY:
      return {
        ...state,
        targetCompany: action.payload.value
      };

    default:
      return state;
  }
};

export default tallyReducer;
