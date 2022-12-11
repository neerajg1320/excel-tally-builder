import { SET_DEBUG } from "./configActionTypes";

const setDebug = (value) => {
  return {
    type: SET_DEBUG,
    payload: value
  };
};
