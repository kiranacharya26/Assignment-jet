import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">First Name</th>
          <th className="py-2">Last Name</th>
          <th className="py-2">Email</th>
          <th className="py-2">Alternate Email</th>
          <th className="py-2">Age</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="border px-4 py-2">{user.firstName}</td>
            <td className="border px-4 py-2">{user.lastName}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">{user.alternateEmail}</td>
            <td className="border px-4 py-2">{user.age}</td>
            <td className="border px-4 py-2">
              <button onClick={() => onEdit(user)} className="bg-blue-500 text-white px-2 py-1 rounded">
                Edit
              </button>
              <button onClick={() => onDelete(user.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
