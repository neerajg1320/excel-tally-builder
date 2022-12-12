import { useTable, useGlobalFilter, useFilters } from "react-table";
import MOCK_DATA from "../../../assets/MOCK_DATA.json";
import { MOCK_COLUMNS } from '../../../assets/MOCK_COLUMNS';
import {useMemo} from "react";
import '../../table.css';
import {GlobalFilter} from "../common/filter/GlobalFilter";
import {ColumnFilter} from "../common/filter/ColumnFilter";


export const FilteringTable = () => {
  const columns = useMemo(() => MOCK_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
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
    state,
    setGlobalFilter
  } = useTable({
    columns,
    data,
    defaultColumn
  }, useFilters, useGlobalFilter);;

  const { globalFilter } = state;

  return (
      <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
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
      </>
  );
}