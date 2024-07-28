// src/app/components/UserList.js
'use client';

import React from 'react';

function UserList({ users, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="text-left py-2 px-4 font-medium text-gray-600">First Name</th>
            <th className="text-left py-2 px-4 font-medium text-gray-600">Last Name</th>
            <th className="text-left py-2 px-4 font-medium text-gray-600">Email</th>
            <th className="text-left py-2 px-4 font-medium text-gray-600">Alternate Email</th>
            <th className="text-left py-2 px-4 font-medium text-gray-600">Age</th>
            <th className="text-left py-2 px-4 font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4 text-gray-700">{user.first_name}</td>
              <td className="py-2 px-4 text-gray-700">{user.last_name}</td>
              <td className="py-2 px-4 text-gray-700">{user.email}</td>
              <td className="py-2 px-4 text-gray-700">{user.alternate_email}</td>
              <td className="py-2 px-4 text-gray-700">{user.age}</td>
              <td className="py-2 px-4 text-gray-700 flex space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.email)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
