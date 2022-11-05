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
  
  return (
      <div>
        {/* Keep the checks intact, onCellDataChange needs to have latest value of data*/}
        {(modifiedColumns.length && data.length) ?
            <DynamicEditableReactTable columns={modifiedColumns} data={data} onDataChange={onDataChange}/> :
            <span></span>
        }
      </div>
  );
}

export default TallyTaggableTable;