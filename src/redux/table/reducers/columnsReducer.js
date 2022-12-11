import {MOCK_COLUMNS} from "../../../assets/MOCK_COLUMNS";
import * as ActionTypes from '../actionTypes';
import {insertProp} from "../../../components/excel/xlsx/schema";

const initialState = MOCK_COLUMNS;

const columnsReducer =  (state=initialState, action) => {
  let ids;

  switch (action.type) {
    case ActionTypes.ADD_COLUMN:
      const {column, before} = action.payload;
      // console.log(`${column} ${before}`);
      insertProp(column, state, before)
      // console.log(JSON.stringify(state, null, 2));
      return [...state];

    case ActionTypes.DELETE_COLUMNS:
      ids = action.payload.ids;
      return state.filter(item => !ids.includes(item.id));

    case ActionTypes.EDIT_COLUMNS:
      ids = action.payload.ids;
      const values = action.payload.values;
      return state.map(item => {
        if (ids.includes(item.id)) {
          return {...item, ...values};
        }
        return {...item};
      })

    case ActionTypes.SET_COLUMNS:
      return action.payload;

    default:
      return state;
  }

}

export default columnsReducer;

