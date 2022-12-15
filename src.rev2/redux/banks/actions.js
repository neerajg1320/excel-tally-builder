import {SET_BANKS, SET_CURRENT_BANK} from "./actionTypes";

export const setBanks = (banks) => {
  return {
    action: SET_BANKS,
    payload: banks
  }
}

export const setCurrentBank = (bank) => {
  return {
    action: SET_CURRENT_BANK,
    payload: bank
  }
}
