import React from 'react';
import styled from 'styled-components';
import { useTable, usePagination, useSortBy } from 'react-table';


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`


// Set our editable cell renderer as the default Cell renderer
// const defaultColumn = {
//   Cell: EditableTextCell,
// }

// Be sure to pass our updateMyData and the skipPageReset option
function EditableReactTable({ columns, data, updateMyData, skipPageReset }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
      {
        columns,
        data,
        // defaultColumn,
        // use the skipPageReset option to disable page resetting temporarily
        autoResetPage: !skipPageReset,
        autoResetSortBy: !skipPageReset,
        // updateMyData isn't part of the API, but
        // anything we put into these options will
        // automatically be available on the instance.
        // That way we can call this function from our
        // cell renderer!
        updateMyData,
      },
      useSortBy,
      usePagination
  )

  // console.log('EditableReactTable: data=', data);
  // console.log(JSON.stringify(rows.map(row => row.values), null, 2))

  // Render the UI for your table
  return (
      <>
        <table {...getTableProps()}>
          <thead>
          {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                    </th>
                ))}
              </tr>
          ))}
          </thead>
          <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
            )
          })}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
          Page{' '}
            <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
          <span>
          | Go to page:{' '}
            <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
                style={{ width: '100px' }}
            />
        </span>{' '}
          <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
            ))}
          </select>
        </div>
      </>
  )
}

export default EditableReactTable;
