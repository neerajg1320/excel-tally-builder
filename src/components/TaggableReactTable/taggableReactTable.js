import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import DynamicReactTable from "../DynamicReactTable/dynamicReactTable";

// This will add a category column
function TaggableReactTable({columns, data}) {
  const [modifiedColumns, setModifiedColumns] = useState([]);
  const tallyLedgers = useSelector((state) => state.tally.ledgers);

  useEffect(() => {
    if (columns.length) {
      const newColumns = columns.concat(
        [
          {
            title: 'Category',
            key: 'Category',
            type: 'select',
            options: tallyLedgers
          }
        ]
      );

      setModifiedColumns(newColumns);
    }
  }, [columns, tallyLedgers]);

  return (
      <DynamicReactTable columns={modifiedColumns} data={data}/>
  );
}

export default TaggableReactTable;