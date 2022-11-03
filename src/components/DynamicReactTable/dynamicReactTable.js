import ReactTable from "./reactTable";
import {useEffect, useState} from "react";
import SingleSelect from "../SingleSelect/SingleSelect";

function DynamicReactTable({columns, data, onCellDataChange}) {
  const [reactColumns, setReactColumns] = useState([]);

  useEffect(() => {
    // console.log("DynamicReactTable: columns=", columns);

    if (columns.length) {
      const reactTableColumns  = columns.map(col => {
        const reactCol = {
          Header: col.title,
          accessor:col.key
        }
        if (col.type == 'select') {
          reactCol.Cell = ({value, row}) => {
            const options = col.options.map(opt => {return {label: opt, value:opt}});

            const onCellChange = (e) => {
              row[col.key] = e; console.log(`row[${col.key}]=`, row[col.key]);

              if (onCellDataChange) {
                onCellDataChange({row, key: col.key, value: e});
              }
            };

            return <SingleSelect
                options={options}
                onChange={onCellChange}
            />
          }
        }
        return reactCol;
      })
      setReactColumns(reactTableColumns);
    }
  }, [columns]);

  return (
    <div>
      {data.length ? <ReactTable columns={reactColumns} data={data}/> : <span></span>}
    </div>
  );
}

export default DynamicReactTable;