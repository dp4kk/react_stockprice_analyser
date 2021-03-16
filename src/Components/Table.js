import React from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./columns";
import '../Extras/Tables.css'
const Table = ({ stock }) => {
//   const columns = useMemo(() => COLUMNS, []);
//   const data = useMemo(() => stock, []);

  const tableInstance = useTable({
    columns:COLUMNS,
    data:stock,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  }=tableInstance
  return (
      <div style={{marginTop:'50px'}}>
    <table {...getTableProps()}>
      <thead>
      {headerGroups.map((headerGroup)=>{
        return  <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column)=>(
               <th {...column.getHeaderProps()} >{column.render('Header')}</th>
            ))}
          </tr>
      })}
      </thead>
      <tbody {...getTableBodyProps()}>
       {rows.map((row)=>{
           prepareRow(row)
           return(
               <tr {...row.getRowProps()}>
               {row.cells.map((cell)=>{
                   return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
               })}
               </tr>
           )
       })}
      </tbody>
    </table>
    </div>
  );
};

export default Table;
