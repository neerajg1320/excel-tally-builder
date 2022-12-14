import * as ActionTypes from '../actionTypes';
import * as Action from '../actions';
import {deleteRows, editRows} from "../actions";

export const deleteVouchers = (ids) => {
  return async (dispatch) => {
    dispatch(deleteRows(ids));
  }
}

export const editVouchers = (ids, values) => {
  return async (dispatch) => {
    dispatch(editRows(ids, values));
  }
}