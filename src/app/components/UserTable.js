// src/app/components/UserTable.js
import React from 'react';

function UserTable({ users, onEdit, onDelete }) {
  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-200">
        <tr>
          <th className="py-2 px-4">First Name</th>
          <th className="py-2 px-4">Last Name</th>
          <th className="py-2 px-4">Email</th>
          <th className="py-2 px-4">Alternate Email</th>
          <th className="py-2 px-4">Age</th>
          <th className="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.email} className="border-t">
            <td className="py-2 px-4">{user.first_name}</td>
            <td className="py-2 px-4">{user.last_name}</td>
            <td className="py-2 px-4">{user.email}</td>
            <td className="py-2 px-4">{user.alternate_email}</td>
            <td className="py-2 px-4">{user.age}</td>
            <td className="py-2 px-4">
              <button
                onClick={() => onEdit(user)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(user.email)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
