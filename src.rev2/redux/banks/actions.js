import {SET_BANKS, SET_CURRENT_BANK} from "./actionTypes";

export const setBanks = (banks) => {
  return {
    type: SET_BANKS,
    payload: banks
  }
}

export const setCurrentBank = (bank) => {
  return {
    type: SET_CURRENT_BANK,
    payload: bank
  }
}
