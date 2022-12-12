import * as ActionTypes from '../actionTypes';

export const addRow = (rows) => {
  return {
    'type': ActionTypes.ADD_ROW,
    'payload': {
      rows
    }
  }
};

export const deleteRows = (ids) => {
  return {
    'type': ActionTypes.DELETE_ROWS,
    'payload': {
      ids
    }
  }
}

export const editRows = (ids, values) => {
  return {
    'type': ActionTypes.EDIT_ROWS,
    'payload': {
      ids,
      values
    }
  }
}

export const setRows = (rows) => {
  return {
    'type': ActionTypes.SET_ROWS,
    'payload': rows
  }
}

export const addColumn = (column, before) => {
  return {
    'type': ActionTypes.ADD_COLUMN,
    'payload': {
      column,
      before
    }
  }
};

export const deleteColumns = (ids) => {
  return {
    'type': ActionTypes.DELETE_COLUMNS,
    'payload': {
      ids
    }
  }
}

export const editColumns = (ids, values) => {
  return {
    'type': ActionTypes.EDIT_ROWS,
    'payload': {
      ids,
      values
    }
  }
}

export const setColumns = (columns) => {
  return {
    'type': ActionTypes.SET_COLUMNS,
    'payload': columns
  }
}

export const setChoices = (column, choices) => {
  return {
    'type': ActionTypes.SET_CHOICES,
    'payload': {
      column,
      choices
    }
  }
}
