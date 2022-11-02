import { SET_STATUS } from "./tallyActionTypes";

const initialState = {
  status: false
};

const tallyReducer = (state = initialState, action) => {
  console.log('action=',action);

  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        status: action.payload.status
      };

    default:
      return state;
  }
};

export default tallyReducer;
