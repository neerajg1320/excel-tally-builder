import * as ActionTypes from '../actionTypes';
import * as Action from '../actions';
import {deleteRows} from "../actions";

export const deleteVouchers = (ids) => {
  return async (dispatch) => {
    dispatch(deleteRows(ids));
  }
}