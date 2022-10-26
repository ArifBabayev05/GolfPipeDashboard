import { useTable, useSortBy } from "react-table";
import useColumns from "../data/hooks/useColumns";
import useRows from "../data/hooks/useRows";
import "../styles/Table.css";

export default function Orders() {
  const columns = useColumns();
  const data = useRows();
  const table = useTable({ columns, data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = table;

  return (
    <div className="container">
      <div className='flex'>
        <div className='p-2 w-100 bg-white justify-between rounded-3xl dark:bg-secondary-dark-bg' style={{'display':'content','width': '100%'}}>
          <div className='card-header px-5 flex justify-between' style={{'width': '100%'}}>
            <h1 className='text-3xl text-center text-orange-400 underline	justify-items-center block mt-5 fs-1'>Deal Table</h1>
            <h1 className='text-3xl text-center text-orange-400 underline	justify-items-center block mt-5 fs-1'>Deal Table</h1>
          </div>
          
        </div>
      </div>
      {/* Apply the table props */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "desc"
                        : "asc"
                      : ""
                  }
                >

                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}

        {/* TODO: Get and Write Datas from API to here */}

        <tbody {...getTableBodyProps()}>
          {
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {
                    row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            cell.render("Cell")

                          }

                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}
