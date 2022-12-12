import { useTable, useRowSelect } from "react-table";
import MOCK_DATA from "../../../../assets/MOCK_DATA.json";
import { MOCK_COLUMNS } from '../../../../assets/MOCK_COLUMNS';
import {useMemo} from "react";
import '../../../table.css';
import {RowCheckbox} from "../../common/RowCheckbox";
import {ShowObject} from "../../../show";

export const RowSelectionTable = () => {
  console.log(`Rendering <RowSelectionTable>`);

  const columns = useMemo(() => MOCK_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const debugSelection = false;

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
              <RowCheckbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <RowCheckbox {...row.getToggleRowSelectedProps()} />
          )
        },
        ...columns
      ]
    })
  }
);

  const firstPageRows = rows.slice(0,10);

  return (
      <>
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
          firstPageRows.map(row => {
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
      {debugSelection &&
          <ShowObject object={selectedFlatRows.map((row) => row.original)}/>
      }
      </>
  );
}