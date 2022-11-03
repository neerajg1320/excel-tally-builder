import ReactTable from "./reactTable";
import {useEffect, useState} from "react";
import SingleSelect from "../SingleSelect/SingleSelect";

function DynamicReactTable({columns, data}) {
  const [reactColumns, setReactColumns] = useState([]);

  useEffect(() => {
    if (columns.length) {
      const reactTableColumns  = columns.map(col => {
        const reactCol = {
          Header: col.title,
          accessor:col.key
        }
        if (col.type == 'select') {
          // console.log('Create column for single select');
          reactCol.Cell = ({value, row}) => {
            // console.log('col=', col);
            const options = col.options.map(opt => {return {label: opt, value:opt}})
            // const options = [{label: 'First', value:'First'}, {label: 'Second', value:'Second'}]
            return <SingleSelect
                options={options}
                onChange={(e) => {row[col.key] = e; console.log(`row[${col.key}]=`, row[col.key])}}
            />
          }
        }
        return reactCol;
      })
      setReactColumns(reactTableColumns);
    }
  }, [columns]);

  return (
    <ReactTable columns={reactColumns} data={data}/>
  );
}

export default DynamicReactTable;