import { useTable, useRowSelect } from "react-table";
import {useCallback,useState} from "react";
import '../../../table.css';
import {RowCheckbox} from "../../common/RowCheckbox";
import {ShowObject} from "../../../show";
import {useDispatch, useSelector} from "react-redux";
import {deleteRows, editRows} from "../../../../redux/actions";
import {FaTrash, FaPen } from "react-icons/fa";
import ColumnsEditBox from "../../common/ColumnsEditBox";

export const RowModifyTable = () => {
  console.log(`Rendering <RowModifyTable>`);

  // eslint-disable-next-line
  const [debugSelection, setDebugSelection] = useState(false);

  // Data variables
  const data = useSelector(state => state.rows);
  const columns = useSelector(state => state.columns);
  const dispatch = useDispatch();

  // Show Debug Window
  // eslint-disable-next-line
  const [output, setOutput] = useState('');

  const onRowEditClick = useCallback(  (id) => {
    console.log(`row edit click id=${id}`);

    // eslint-disable-next-line
  }, []);

  const onRowDeleteClick = useCallback(  (id) => {
    // console.log(`delete click id=${id}`);
    dispatch(deleteRows([id]));
    // eslint-disable-next-line
  }, []);

  const onSelectionChange = useCallback(  (id) => {
    if (id === -1) {
      console.log('header clicked');
    } else {
      // console.log(`select click id=${id}`);
    }
  },[]);

  const handleBulkDeleteClick = useCallback((ids) => {
    console.log(`handleBulkDeleteClick: ids=${ids}`);
    dispatch(deleteRows(ids));
    // eslint-disable-next-line
  }, []);

  const handleBulkEditClick = useCallback((ids, values) => {
    console.log(`handleBulkEditClick: ids=${ids} values=${JSON.stringify(values)}`);
    dispatch(editRows(ids, values));
    // eslint-disable-next-line
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    selectedFlatRows
  } = useTable({
    columns,
    data
  },
  useRowSelect,
  (hooks) => {
    hooks.visibleColumns.push((columns) => {
      return [
        {
          id: "selection",
          Header: ({getToggleAllRowsSelectedProps}) => (
              <RowCheckbox
                  {...getToggleAllRowsSelectedProps()}
                  onClick={e => onSelectionChange(-1)}
              />
          ),
          Cell: ({ row }) => (
            <RowCheckbox
                {...row.getToggleRowSelectedProps()}
                onClick={e => onSelectionChange(row.id)}
            />
          )
        },
        ...columns,
        {
          Header: "Modify",
          Cell: ({ row }) => (
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap:"10px"}}
            >
              <FaPen
                  style={{color:"rebeccapurple", cursor: "pointer"}}
                  onClick={e => onRowEditClick(row.original.id)}/>
              <FaTrash
                  style={{color:"mediumvioletred", cursor: "pointer"}}
                  onClick={e => onRowDeleteClick(row.original.id)}/>
            </div>
          ),
        },
      ]
    })
  });

  return (
      <>
      <div>
        <ColumnsEditBox
            onEdit={handleBulkEditClick}
            onDelete={handleBulkDeleteClick}
            {...{selectedFlatRows, columns}}
        />
      </div>

      <div>
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))
              }
            </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {
          rows.map(row => {
            prepareRow(row);
            return (
                <tr {...row.getRowProps()}>
                  {
                    row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })
                  }
                </tr>
            );
          })
        }
        </tbody>
        <tfoot>
        {
          footerGroups.map(footerGroup => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {
                  footerGroup.headers.map(column => (
                      <td {...column.getFooterProps()}>
                        {column.render('Footer')}
                      </td>
                  ))
                }
              </tr>
          ))
        }
        </tfoot>
      </table>
      </div>
      {debugSelection &&
        <div>
          <ShowObject object={output} />
          <ShowObject object={selectedFlatRows.map((row) => row.original)} />
        </div>
      }
      </>
  );
}