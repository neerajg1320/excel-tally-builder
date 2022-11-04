// Create an editable cell renderer
import React from "react";
import SingleSelect from "../SingleSelect/SingleSelect";

export const EditableTextCell = ({
                            value: initialValue,
                            row: { index },
                            column: { id },
                            updateMyData, // This is a custom function that we supplied to our table instance
                          }) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value);
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={onChange} onBlur={onBlur} type='text'/>
}

export const EditableNumberResponsiveCell = ({
                                        value,
                                        row: { index },
                                        column: { id },
                                        updateMyData, // This is a custom function that we supplied to our table instance
                                      }) => {
  // We need to keep and update the state of the cell normally


  const onChange = e => {
    updateMyData(index, id, parseInt(e.target.value, 10));
  }

  return <input value={value} onChange={onChange} type='number'/>
}

export const EditableNumberCell = ({
                              value: initialValue,
                              row: { index },
                              column: { id },
                              updateMyData, // This is a custom function that we supplied to our table instance
                            }) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    const value = e.target.value;
    setValue(parseInt(value, 10));
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={onChange} onBlur={onBlur} type='number'/>
}

// We will come back to this later
export const EditableSelectCell = ({value, row, column, updateMyData}) => {
  // console.log(`value=${JSON.stringify(value)}`);
  // console.log('row=',row);
  // console.log('column=', column);
  // console.log('column.choices=', column.choices);


  const onCellChange = (e) => {
    updateMyData(row.index, column.id, e);
  };

  return <SingleSelect
      options={column.choices}
      onChange={onCellChange}
      defaultValue="Laptops"
  />
}