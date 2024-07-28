// src/app/dashboard/users/page.js
'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import UserList from '../../components/UserList';
import UserForm from '../../components/UserForm';
import { users as initialUsers } from '../../components/UserData';

function UserTablePage() {
  // Ensure `initialUsers` is an array or set an empty array as a default value
  const [users, setUsers] = useState(initialUsers || []);
  const [editingUser, setEditingUser] = useState(null);

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleEditUser = (updatedUser) => {
    setUsers(users.map(user => user.email === updatedUser.email ? updatedUser : user));
    setEditingUser(null); // Close the form after editing
  };

  const handleDeleteUser = (email) => {
    setUsers(users.filter(user => user.email !== email));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <header className="bg-white shadow">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">User List</h1>
          </div>
        </header>
        <main className="mt-6">
          <UserList users={users} onEdit={setEditingUser} onDelete={handleDeleteUser} />
          <UserForm onSave={editingUser ? handleEditUser : handleAddUser} user={editingUser} />
        </main>
      </div>
    </div>
  );
}

export default UserTablePage;
