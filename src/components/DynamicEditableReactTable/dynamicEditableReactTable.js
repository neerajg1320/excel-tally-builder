import EditableReactTable from "./editableReactTable";
import React, {useEffect, useState} from "react";
import SingleSelect from "../SingleSelect/SingleSelect";
import styled from 'styled-components';
import {EditableSelectCell, EditableTextCell} from './editableCells';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

function DynamicEditableReactTable({columns, data}) {
  const [currentData, setCurrentData] = useState(data);
  const [originalData] = React.useState(data)
  const [reactColumns, setReactColumns] = useState([]);
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  useEffect(() => {
    // console.log("DynamicReactTable: columns=", columns);

    if (columns.length) {
      const reactTableColumns  = columns.map(col => {
        const reactCol = {
          Header: col.title,
          accessor:col.key,
        }

        if (col.editable) {
          if (col.type === 'select') {
            reactCol.choices = col.options.map(opt => {
              return {label: opt, value: opt}
            });

            reactCol.Cell = EditableSelectCell;

            // We need to find a way to pass the Select
            // reactCol.Cell = EditableSelectCell;
          } else if (col.type === 'text') {
            reactCol.Cell = EditableTextCell;
          }
        }
        return reactCol;
      })
      setReactColumns(reactTableColumns);
    }
  }, [columns]);

  useEffect(() => {
    console.log('curentData:', currentData);
  }, [currentData]);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateCurrentData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateCurrentData = (rowIndex, columnId, value) => {
    console.log(`updateCurrentData: rowIndex=${rowIndex} columnsId=${columnId} value=${value}` )
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setCurrentData(old =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex],
              [columnId]: value,
            }
          }
          return row
        })
    )
  }

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false)
  }, [data])

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setCurrentData(originalData)

  return (
      <Styles>
        <button onClick={resetData}>Reset Data</button>
        <EditableReactTable
            columns={reactColumns}
            data={data}
            updateMyData={updateCurrentData}
            skipPageReset={skipPageReset}
        />
      </Styles>
  )
}
export default DynamicEditableReactTable;