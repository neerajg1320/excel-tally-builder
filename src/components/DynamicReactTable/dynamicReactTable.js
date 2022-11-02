import ReactTable from "./reactTable";
import {useEffect, useState} from "react";
import SingleSelect from "../SingleSelect/SingleSelect";
import {useSelector} from "react-redux";

function DynamicReactTable({columns, data}) {
  const [reactColumns, setReactColumns] = useState([]);
  const tallyLedgers = useSelector((state) => state.tally.ledgers);
  const options = tallyLedgers.map(lgr => {return {label: lgr, value:lgr}})

  useEffect(() => {
    if (columns.length) {
      const reactTableColumns  = columns.map(col => {
        const reactCol = {
          Header: col.title,
          accessor:col.key
        }
        if (col.type == 'select') {
          console.log('Create column for single select');
          reactCol.Cell = ({value, row}) => {
            return <SingleSelect options={options}/>
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