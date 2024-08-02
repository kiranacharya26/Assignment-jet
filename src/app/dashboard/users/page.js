"use client";
import React, { useState } from 'react';
import { QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import queryClient from '../../../lib/queryClient';
import Navbar from '../../components/Navbar';
import UserList from '../../components/UserList';
import UserForm from '../../components/UserForm';
import Loader from '../../components/Loader';

const fetchUsers = async () => {
  const response = await fetch('/api/users');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

const saveUser = async (user) => {
  const method = user.id ? 'PUT' : 'POST';
  const response = await fetch('/api/users', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const result = await response.json();
  if (!response.ok) throw new Error('Failed to save user');
  console.log('Save user response:', result);
  return result;
};

const deleteUser = async (id) => {
  const response = await fetch('/api/users', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error('Failed to delete user');
};

const UserTable = () => {
  const [editingUser, setEditingUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const queryClient = useQueryClient();

  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const mutation = useMutation({
    mutationFn: saveUser,
    onSuccess: (newUser) => {
      console.log('New user added:', newUser);
      queryClient.setQueryData(['users'], (oldUsers) => {
        if (newUser.id) {
          return oldUsers.map(user => (user.id === newUser.id ? newUser : user));
        }
        return [newUser, ...oldUsers];
      });
      setEditingUser(null);
      setIsAddingUser(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['users'], (oldData) => {
        return oldData.filter(user => user.id !== variables);
      });
    },
  });

  const handleAddOrEditUser = (user) => {
    mutation.mutate(user);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteMutation.mutate(id);
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
            <Loader />
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
};

const UserTablePage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserTable />
    </QueryClientProvider>
  );
};

export default UserTablePage;
