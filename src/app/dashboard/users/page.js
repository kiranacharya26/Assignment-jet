"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import UserList from '../../components/UserList';
import UserForm from '../../components/UserForm';
import Loader from '../../components/Loader';

function UserTablePage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true); // Loading state for table

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoadingUsers(true); // Set loading to true when fetching starts
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      // Handle error
    } finally {
      setLoadingUsers(false); // Set loading to false once fetching completes
    }
  };

  const handleAddOrEditUser = async (user) => {
    try {
      let response;
      if (editingUser) {
        response = await fetch('/api/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
      } else {
        response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
      }
      if (!response.ok) throw new Error('Failed to save user');

      const updatedUser = await response.json();
      if (editingUser) {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
      } else {
        setUsers([updatedUser, ...users]);
      }
      setEditingUser(null);
      setIsAddingUser(false);
    } catch (error) {
      // Handle error
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete user');
      
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      // Handle error
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsAddingUser(false);
  };

  const handleAddUserClick = () => {
    setEditingUser(null);
    setIsAddingUser(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <header className="bg-white shadow">
          <div className="py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">User List</h1>
            {!editingUser && !isAddingUser && (
              <button
                onClick={handleAddUserClick}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Add User
              </button>
            )}
          </div>
        </header>
        <main className="mt-6">
          {loadingUsers ? (
            <Loader /> // Show loader while fetching users
          ) : (
            <UserList users={users} onEdit={handleEditClick} onDelete={handleDeleteUser} />
          )}
          {(editingUser || isAddingUser) && (
            <UserForm
              onSave={handleAddOrEditUser}
              user={editingUser}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default UserTablePage;
