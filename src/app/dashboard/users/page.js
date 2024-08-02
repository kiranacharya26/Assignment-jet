"use client";
import React, { useState } from 'react';
import { QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import queryClient from '../../../lib/queryClient';
import Navbar from '../../components/Navbar';
import UserList from '../../components/UserList';
import UserForm from '../../components/UserForm';
import Loader from '../../components/Loader';

// Fetch users from the API
const fetchUsers = async () => {
  const response = await fetch('/api/users');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

// Function to add/edit user
const saveUser = async (user) => {
  const method = user.id ? 'PUT' : 'POST'; // Determine method based on presence of ID
  const response = await fetch('/api/users', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const result = await response.json(); // Get the response
  if (!response.ok) throw new Error('Failed to save user');
  console.log('Save user response:', result); // Log the response
  return result; // Return the result for further processing
};



// Function to delete user
const deleteUser = async (id) => {
  console.log('Attempting to delete user with ID:', id);
  const response = await fetch('/api/users', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  const result = await response.json(); // Get the response to see any messages
  console.log('Delete response:', result); // Log the response
  if (!response.ok) throw new Error('Failed to delete user');
};

const UserTable = () => {
  const [editingUser, setEditingUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const queryClient = useQueryClient();

  // Fetch users using useQuery
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // Mutation for adding/editing users
  const mutation = useMutation({
  mutationFn: saveUser,
  onSuccess: (data) => { // Here, `data` is the updated user
    queryClient.setQueryData(['users'], (oldData) => {
      // Check if the user is being edited or added
      if (data.id) {
        // Update the existing user
        return oldData.map(user => (user.id === data.id ? data : user));
      } else {
        // Add the new user to the list
        return [...oldData, data];
      }
    });
    setEditingUser(null);
    setIsAddingUser(false);
  },
  onError: (error) => {
    console.error('Error saving user:', error); // Log error if any
  },
});


  // Mutation for deleting users
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data, variables) => {
      console.log('Deleting user with ID:', variables); // Log the user ID being deleted
      // Refetch users after deletion
      queryClient.setQueryData(['users'], (oldData) => {
        return oldData.filter(user => user.id !== variables);
      });
    },
    onError: (error) => {
      console.error('Error deleting user:', error); // Log error if any
    },
  });

  const handleAddOrEditUser = (user) => {
    mutation.mutate(user);
  };

  const handleDeleteUser = (id) => {
    console.log('Delete user with ID:', id); // Log ID
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteMutation.mutate(id); // Call the delete mutation
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
