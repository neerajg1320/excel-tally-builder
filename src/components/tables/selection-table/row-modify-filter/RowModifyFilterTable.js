import {
  useTable,
  useRowSelect,
  useGlobalFilter,
  useFilters
} from "react-table";
import {useCallback, useEffect, useMemo, useState } from "react";
import '../../../table.css';
import {RowCheckbox} from "../../common/RowCheckbox";
import {ShowObject} from "../../../show";
import {useDispatch, useSelector} from "react-redux";
import {deleteRows, editRows} from "../../../../redux/actions";
import {FaTrash, FaPen } from "react-icons/fa";
import ColumnsEditBox from "../../common/ColumnsEditBox";
import {GlobalFilter} from "../../common/filter/GlobalFilter";
import {ColumnFilter} from "../../common/filter/ColumnFilter";
import Button from "react-bootstrap/Button";
import EditableCell from "../../common/cells/editableCell";
import SelectableCell from "../../common/cells/selectableCell";
import ExpandableButton from "../../common/ExpandableButton";

export const RowModifyFilterTable = () => {
  console.log(`Rendering <RowModifyFilterTable>`);

  // eslint-disable-next-line
  const [debugSelection, setDebugSelection] = useState(false);
  const [bulkEnabled, setBulkEnabled] = useState(false);
  const [bulkEditExpanded, setBulkEditExpanded] = useState(false);

  // Data variables
  const data = useSelector(state => state.rows);
  const columns = useSelector(state => state.columns);
  const dispatch = useDispatch();

  const bulkColumns = useMemo(() => {
    return columns.filter(col => col.bulk)
  }, [columns]);

  // Kept for future reference
  // eslint-disable-next-line
  const editColumns = useMemo(() => {
    return columns.filter(col => col.edit)
  }, [columns]);

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

  const updateMyData = (row, col, value) => {
    const id = row.original.id;
    // key is stored in col.id
    const values = {[col.id]: value};
    dispatch(editRows([id], values));
  }

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter
    }
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    toggleAllRowsSelected,
    state,
    setGlobalFilter
  } = useTable({
    columns,
    data,
    defaultColumn,
    updateMyData
  },
  useFilters,
  useGlobalFilter,
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
          ),
          disableFilters: true
        },

        ...columns.map(col => {
          if (col.edit) {
            if (col.type === 'input') {
              col.Cell = EditableCell
            } else if (col.type === 'select') {
              col.Cell = (props) => {
                return <SelectableCell choices={col.choices} {...props} />
              }
            }
          }
          return col;
        }),

        {
          Header: "Modify",
          Cell: ({ row }) => (
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap:"10px"}}
            >
              <div style={{position: "relative"}}>
                <FaPen
                    style={{color:"rebeccapurple", cursor: "pointer"}}
                    onClick={e => {
                      onRowEditClick(row.original.id);
                    }}
                />
              </div>
              <FaTrash
                  style={{color:"mediumvioletred", cursor: "pointer"}}
                  onClick={e => onRowDeleteClick(row.original.id)}/>
            </div>
          ),
          disableFilters: true
        },
      ]
    })
  });

  useEffect(() => {
    setBulkEnabled(selectedFlatRows.length > 0);
  }, [selectedFlatRows]);

  const getRowIds = useCallback((selRows) => {
    return selRows.map(row => {
      return row.original.id;
    });
  }, []);

  const handleBulkDeleteClick = useCallback(() => {
    const ids = getRowIds(selectedFlatRows);
    console.log(`handleBulkDeleteClick: ids=${ids}`);
    dispatch(deleteRows(ids));
    setBulkEditExpanded(false);
    // eslint-disable-next-line
  }, [selectedFlatRows]);

  const handleBulkEditSaveClick = useCallback((values) => {
    const ids = getRowIds(selectedFlatRows);
    console.log(`handleBulkEditSaveClick: ids=${ids} values=${JSON.stringify(values)}`);
    dispatch(editRows(ids, values));
    setBulkEditExpanded(false);
    // eslint-disable-next-line
  }, [selectedFlatRows]);

  const handleBulkEditCancelClick = useCallback(() => {
    console.log(`handleBulkEditCancelClick`);
    setBulkEditExpanded(false);
  }, [])

  const handleClearSelectionClick = useCallback(() => {
    // False clears all selected rows
    toggleAllRowsSelected(false);
    setBulkEditExpanded(false);
    // eslint-disable-next-line
  }, []);

  const { globalFilter } = state;

  return (
      <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
      <div>
          <div style={{display:"flex", gap: "10px", padding:"20px"}}>
            <Button variant="danger" size="sm"
                    disabled={!bulkEnabled}
                    onClick={handleBulkDeleteClick}
            >
              Bulk Delete
            </Button>

            {/* We should try and replace below */}
            <ExpandableButton
                title="Bulk Edit"
                disabled={!bulkEnabled}
                value={bulkEditExpanded}
                onChange={exp => setBulkEditExpanded(exp)}
            >
              <ColumnsEditBox
                  columns={bulkColumns}
                  onEdit={handleBulkEditSaveClick}
                  onCancel={handleBulkEditCancelClick}
                  disabled={!bulkEnabled}
              />
            </ExpandableButton>

            <Button variant="outline-dark" size="sm"
                    disabled={!bulkEnabled}
                    onClick={handleClearSelectionClick}
            >
              Clear
            </Button>


          </div>
      </div>

      <div>
        <table {...getTableProps()}>
          <thead>
          {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>
                        {column.render('Header')}
                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                      </th>
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