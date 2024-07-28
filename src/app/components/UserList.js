import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

// Define columns
const columns = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'alternateEmail',
    header: 'Alternate Email',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row, table }) => (
      <div>
        <button
          onClick={() => table.options.meta.onEdit(row.original)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => table.options.meta.onDelete(row.original.id)}
          className="bg-red-500 text-white px-2 py-1 rounded ml-2"
        >
          Delete
        </button>
      </div>
    ),
  },
];

const UserList = ({ users, onEdit, onDelete }) => {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  // Create a table instance
  const table = useReactTable({
    data: users,
    columns,
    state: {
      globalFilter,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: {
      globalFilter: (row, columnId, filterValue) => {
        const value = row.getValue(columnId);
        return value
          ? value.toString().toLowerCase().includes(filterValue.toLowerCase())
          : false;
      },
    },
    meta: {
      onEdit,
      onDelete,
    },
    onPaginationChange: setPagination,
  });

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        className="border px-2 py-1 mb-4"
      />

      <table className="min-w-full bg-white">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="py-2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex items-center mt-4">
        <button
          onClick={() => table.setPageIndex(old => Math.max(0, old - 1))}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-gray-300"
        >
          Previous
        </button>
        <span className="mx-2">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.setPageIndex(old => Math.min(table.getPageCount() - 1, old + 1))}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
