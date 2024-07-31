import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const baseUrl = 'https://api.jsonbin.io/v3/b/66a9c0fdad19ca34f88f4568';
const apiKey = '$2a$10$ZtwtVkVZUNG4OqALmu8aXe2f1clND6lvKMcaIgojVwDUR0bLCweYS';

const extractUserData = (data) => {
  return Array.isArray(data) ? data : data.record;
};

export async function GET() {
  try {
    const response = await fetch(baseUrl, {
      headers: { 'secret-key': apiKey },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: 'Failed to fetch users', details: errorText }, { status: 500 });
    }

    const data = await response.json();
    const users = extractUserData(data);

    return NextResponse.json(users);
  } catch (error) {
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
      throw new Error('Failed to fetch current data');
    }
    const currentData = await currentDataResponse.json();
    const users = extractUserData(currentData);

    newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
    const updatedData = [...users, newUser];

    const updateResponse = await fetch(baseUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'secret-key': apiKey,
      },
      body: JSON.stringify(updatedData),
    });
    if (!updateResponse.ok) {
      throw new Error('Failed to update data');
    }
    return NextResponse.json(newUser);
  } catch (error) {
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
      throw new Error('Failed to fetch current data');
    }
    const currentData = await currentDataResponse.json();
    const users = extractUserData(currentData);

    const index = users.findIndex(user => user.id === updatedUser.id);
    if (index === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (updatedUser.password) {
      updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
    } else {
      updatedUser.password = users[index].password;
    }
    users[index] = { ...users[index], ...updatedUser };

    const response = await fetch(baseUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'secret-key': apiKey,
      },
      body: JSON.stringify(users),
    });
    if (!response.ok) {
      throw new Error('Failed to update data');
    }
    return NextResponse.json(users[index]);
  } catch (error) {
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
      throw new Error('Failed to fetch current data');
    }
    const currentData = await currentDataResponse.json();
    const users = extractUserData(currentData);

    const updatedData = users.filter(user => user.id !== id);

    const response = await fetch(baseUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'secret-key': apiKey,
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Failed to update data');
    }
    return NextResponse.json({ message: 'User deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
