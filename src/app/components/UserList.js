import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },
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
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [selectedRows, setSelectedRows] = useState({});

  const table = useReactTable({
    data: users,
    columns,
    state: {
      globalFilter,
      pagination,
      rowSelection: selectedRows,
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
    onRowSelectionChange: setSelectedRows,
    getRowId: row => row.id,
    enableRowSelection: true,
  });

  const handleDeleteSelected = async () => {
    const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[id]);
    if (selectedIds.length === 0) return;

    await Promise.all(selectedIds.map(id => onDelete(parseInt(id, 10))));
    setSelectedRows({});
  };

  return (
    <div>
      <input
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search by name, age .."
        className="border px-2 py-1 mb-4"
      />

      {Object.keys(selectedRows).length > 0 && (
        <button
          onClick={handleDeleteSelected}
          className="bg-red-500 text-white py-2 px-4 rounded mb-4"
        >
          Delete Selected
        </button>
      )}

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

      <div className="flex items-center mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-gray-300"
        >
          Previous
        </button>
        <span className="mx-2">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
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
