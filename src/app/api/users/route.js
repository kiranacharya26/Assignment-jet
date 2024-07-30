import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const baseUrl = 'https://api.jsonbin.io/v3/b/66a93853ad19ca34f88f1a6e';
const apiKey = '$2a$10$i7kgDGCboFcwBqcLt8RCh.PfSkJJAn6IgECNDQQg4Fhwk9grAk28.';

export async function GET() {
  try {
    const response = await fetch(baseUrl, {
      headers: { 'secret-key': apiKey },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GET request failed with status: ${response.status}`);
      console.error(`Error details: ${errorText}`);
      return NextResponse.json({ error: 'Failed to fetch users', details: errorText }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users', details: error.message }, { status: 500 });
  }
}



export async function POST(req) {
  try {
    const newUser = await req.json();

    if (newUser.age < 18) {
      return NextResponse.json({ error: 'User must be at least 18 years old' }, { status: 400 });
    }

    newUser.password = await bcrypt.hash(newUser.password, 10);

    const currentDataResponse = await fetch(baseUrl, {
      headers: { 'secret-key': apiKey },
    });
    if (!currentDataResponse.ok) {
      console.error(`POST request failed to fetch current data with status: ${currentDataResponse.status}`);
      throw new Error('Failed to fetch current data');
    }
    const currentData = await currentDataResponse.json();

    newUser.id = currentData.length ? currentData[currentData.length - 1].id + 1 : 1;
    const updatedData = [...currentData, newUser];

    const response = await fetch(baseUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'secret-key': apiKey,
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      console.error(`POST request failed to update data with status: ${response.status}`);
      throw new Error('Failed to update data');
    }
    return NextResponse.json(newUser);
  } catch (error) {
    console.error('Error adding new user:', error);
    return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const updatedUser = await req.json();

    const currentDataResponse = await fetch(baseUrl, {
      headers: { 'secret-key': apiKey },
    });
    if (!currentDataResponse.ok) {
      console.error(`PUT request failed to fetch current data with status: ${currentDataResponse.status}`);
      throw new Error('Failed to fetch current data');
    }
    const currentData = await currentDataResponse.json();

    const index = currentData.findIndex(user => user.id === updatedUser.id);
    if (index === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (updatedUser.password) {
      updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
    } else {
      updatedUser.password = currentData[index].password;
    }
    currentData[index] = { ...currentData[index], ...updatedUser };

    const response = await fetch(baseUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'secret-key': apiKey,
      },
      body: JSON.stringify(currentData),
    });
    if (!response.ok) {
      console.error(`PUT request failed to update data with status: ${response.status}`);
      throw new Error('Failed to update data');
    }
    return NextResponse.json(currentData[index]);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    const currentDataResponse = await fetch(baseUrl, {
      headers: { 'secret-key': apiKey },
    });
    if (!currentDataResponse.ok) {
      console.error(`DELETE request failed to fetch current data with status: ${currentDataResponse.status}`);
      throw new Error('Failed to fetch current data');
    }
    const currentData = await currentDataResponse.json();

    const updatedData = currentData.filter(user => user.id !== id);

    const response = await fetch(baseUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'secret-key': apiKey,
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      console.error(`DELETE request failed to update data with status: ${response.status}`);
      throw new Error('Failed to update data');
    }
    return NextResponse.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
