import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import DynamicReactTable from "../DynamicReactTable/dynamicReactTable";
import DynamicEditableReactTable from "../DynamicEditableReactTable/dynamicEditableReactTable";

// This fetches the tallyLedgers from redux state
// This will add a category column
// The value of cells in category column will be one of the tallyLedgers
function TallyTaggableTable({columns, data, onDataChange}) {
  const [modifiedColumns, setModifiedColumns] = useState([]);
  const tallyLedgers = useSelector((state) => state.tally.ledgers);

  useEffect(() => {
    if (columns.length) {
      //TBD: Add column only if it is already not added
      const newColumns = columns.concat(
          [
            {
              title: 'Category',
              key: 'Category',
              type: 'select',
              editable: true,
              options: ['Select Ledger'].concat(tallyLedgers),
              default: tallyLedgers.length ? tallyLedgers[3] : "",
            },
            {
              title: 'Remarks',
              key: 'Remarks',
              type: 'text',
              editable: true,
            }
          ]
      );

      console.log('newColumns after modification:', newColumns);
      setModifiedColumns(newColumns);
    }

  }, [columns, tallyLedgers]);

  useEffect(() => {
    console.log('TallyTaggableTable:useEffect data modified', data);
    // console.log(JSON.stringify(data, null, 2));
  }, [data]);

  // We need useCallback, otherwise the value of data is [] in the function without it.
  // const onCellDataChange = useCallback(({row, key, value}) => {
  //   console.log("onCellDataChange: row=", row);
  //   if (data.length) {
  //     data[row.id][key] = value;
  //   }
  //   console.log('TallyTaggableTable:onCellDataChange data modified', data);
  // }, [data]);

  return (
      <div>
        {/* Keep the checks intact, onCellDataChange needs to have latest value of data*/}
        {(modifiedColumns.length && data.length) ?
            // <DynamicReactTable columns={modifiedColumns} data={data} onCellDataChange={onCellDataChange}/>
            <DynamicEditableReactTable columns={modifiedColumns} data={data} onDataChange={onDataChange}/> :
            <span></span>
        }
      </div>
  );
}

export default TallyTaggableTable;