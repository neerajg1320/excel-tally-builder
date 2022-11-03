import { START_PING, STOP_PING, SET_STATUS, SET_DEBUG, SET_LEDGERS } from "./tallyActionTypes";

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

const setStatus = (value) => {
  return {
    type: SET_STATUS,
    payload: {
      value
    }
  };
};

const setDebug = (value) => {
  return {
    type: SET_DEBUG,
    payload: {
      value
    }
  };
};

const setLedgers = (value) => {
  return {
    type: SET_LEDGERS,
    payload: {
      value
    }
  };
};

export { startPing, stopPing, setStatus, setDebug, setLedgers };
