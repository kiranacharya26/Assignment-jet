import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

const dataPath = path.join(process.cwd(), 'src/data/userData.json');

function readUserData() {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([]));
  }
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}

function writeUserData(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
}

export async function GET() {
  const users = readUserData();
  return NextResponse.json(users);
}

export async function POST(req) {
  try {
    const newUser = await req.json();

    // Validate age
    if (newUser.age < 18) {
      return NextResponse.json({ error: 'User must be at least 18 years old' }, { status: 400 });
    }

    // Hash the password
    newUser.password = await bcrypt.hash(newUser.password, 10);

    const users = readUserData();
    newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push(newUser);
    writeUserData(users);
    return NextResponse.json(newUser);
  } catch (error) {
    console.error('Error adding new user:', error);
    return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
  }
}

export async function PUT(req) {
  const updatedUser = await req.json();
  const users = readUserData();
  const index = users.findIndex(user => user.id === updatedUser.id);
  if (index !== -1) {
    // Update only provided fields
    if (updatedUser.password) {
      // Hash the new password if provided
      updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
    } else {
      // Keep the old password if not provided
      updatedUser.password = users[index].password;
    }
    users[index] = { ...users[index], ...updatedUser };
    writeUserData(users);
    return NextResponse.json(users[index]);
  }
  return NextResponse.json({ error: 'User not found' }, { status: 404 });
}

export async function DELETE(req) {
  const { id } = await req.json();
  let users = readUserData();
  users = users.filter(user => user.id !== id);
  writeUserData(users);
  return NextResponse.json({ message: 'User deleted' });
}
