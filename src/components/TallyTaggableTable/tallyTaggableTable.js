import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import DynamicReactTable from "../DynamicReactTable/dynamicReactTable";

// This fetches the tallyLedgers from redux state
// This will add a category column
// The value of cells in category column will be one of the tallyLedgers
function TallyTaggableTable({columns, data}) {
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

export default TallyTaggableTable;