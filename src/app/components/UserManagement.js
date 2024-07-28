// src/app/components/UserManagement.js
'use client';

import React, { useState } from 'react';
import UserForm from './UserForm';
import UserTable from './UserTable';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSave = (user) => {
    setUsers((prevUsers) => {
      const userIndex = prevUsers.findIndex((u) => u.email === user.email);
      if (userIndex > -1) {
        const updatedUsers = [...prevUsers];
        updatedUsers[userIndex] = user;
        return updatedUsers;
      }
      return [...prevUsers, user];
    });
    setSelectedUser(null);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = (email) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
  };

  return (
    <div className="container mx-auto p-4">
      <UserForm onSave={handleSave} user={selectedUser} />
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default UserManagement;
