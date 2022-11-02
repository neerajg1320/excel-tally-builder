import { START_PING, STOP_PING, SET_STATUS } from "./tallyActionTypes";

const startPing = () => {
  return {
    type: START_PING,
  };
};

const stopPing = () => {
  return {
    type: STOP_PING,
  };
};

const setStatus = (status) => {
  return {
    type: SET_STATUS,
    payload: {
      status
    }
  };
};

export { startPing, stopPing, setStatus };
