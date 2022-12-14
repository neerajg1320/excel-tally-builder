import * as ActionTypes from '../actionTypes';
import * as Action from '../actions';
import {addColumn, deleteRows, editRows, setRows} from "../actions";
import {remoteCall} from "../../../utils/tallyRpc";
import {presetColumns} from "../../../features/presetColumns";

export const addVouchers = (vouchers, targetCompany) => {
  console.log(`targetCompany=${targetCompany}`);

  return async (dispatch, getState) => {
    remoteCall('tally:command:vouchers:add', {targetCompany, vouchers})
        .then((response) => {
          // console.log(`handleResponse: response=${JSON.stringify(response, null, 2)}`);

          const resultMap = Object.fromEntries(response.map(res => [res.id, res.voucher_id]));
          // console.log(`resultMap=${JSON.stringify(resultMap)}`);

          // Add column for showing voucherId
          const columns = getState().columns;
          const tableVoucherCol = columns.filter(col => col.key === 'VoucherId');
          if (tableVoucherCol.length < 1) {
            const voucherIdCol = presetColumns.filter(col => col.key === 'VoucherId');
            if (voucherIdCol.length > 0) {
              dispatch(addColumn(voucherIdCol[0]));
            }
          }

          // Add voucherId
          const data = getState().rows;
          const newData = data.map(row => {
            // console.log(`row=${JSON.stringify(row, null, 2)}`);
            return {
              ...row,
              'VoucherId': resultMap[row.id]
            }
          });
          // console.log(`Saved to Tally: newData=${JSON.stringify(newData, null, 2)}`)
          dispatch(setRows(newData));

        })
        .catch(error => {
          console.error(`handleSubmit: error=${error}`);
        });
  }
}

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