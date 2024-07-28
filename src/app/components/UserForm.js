// src/app/components/UserForm.js
'use client';

import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';

function UserForm({ onSave, user }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    alternate_email: '',
    password: '',
    age: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        password: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { first_name, last_name, email, password, age } = formData;
    if (!first_name, !last_name, !email, !password, !age) {
      setError('All fields are required.');
      return;
    }
    if (parseInt(age, 10) < 18) {
      setError('Age must be 18 or older.');
      return;
    }

    let hashedPassword = '';
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    onSave({ ...formData, password: hashedPassword });
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      alternate_email: '',
      password: '',
      age: '',
    });
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mt-6">
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="alternate_email"
          placeholder="Alternate Email"
          value={formData.alternate_email}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
        <div className="col-span-1 sm:col-span-2">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
          {user && (
            <p className="text-sm text-gray-600 mt-2">
              For security, passwords are hashed and not shown. Enter a new password to change it.
            </p>
          )}
        </div>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        {user ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
}

export default UserForm;
