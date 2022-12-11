import MOCK_DATA from "../../assets/MOCK_SMALL.json";
import * as ActionTypes from '../actionTypes';

const initialState = MOCK_DATA;

const rowsReducer =  (state=initialState, action) => {
    let ids;
    switch (action.type) {
        case ActionTypes.DELETE_ROWS:
            ids = action.payload.ids;
            return state.filter(item => !ids.includes(item.id))

        case ActionTypes.EDIT_ROWS:
            ids = action.payload.ids;
            const values = action.payload.values;
            return state.map(item => {
                if (ids.includes(item.id)) {
                    return {...item, ...values};
                }
                return {...item};
            })

        case ActionTypes.SET_ROWS:
            return action.payload;

        default:
            return state;
    }
}

export default rowsReducer;

