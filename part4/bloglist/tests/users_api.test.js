const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/userModel');
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

describe('creating new user', () => {
  test('succeeds with valid username and password', async () => {
    const newTestUser = {
      username: 'testbro',
      name: 'Test Bro',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newTestUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newTestUser.username);
  });

  test('fails if username and or password are missing', async () => {
    const newTestUser = {
      name: 'Test Bro',
    };

    const result = await api.post('/api/users').send(newTestUser).expect(400);

    expect(result.body.error).toContain('username must be at least 3 characters long');

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(0);
  });

  test('fails if username is less than 3 characters long', async () => {
    const newTestUser = {
      username: 'us',
      name: 'Test Bro',
      password: 'salainen',
    };

    const result = await api.post('/api/users').send(newTestUser).expect(400);

    expect(result.body.error).toContain('username must be at least 3 characters long');

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(0);
  });

  test('fails if password is less than 3 characters long', async () => {
    const newTestUser = {
      username: 'testbro',
      name: 'Test Bro',
      password: 'us',
    };

    const result = await api.post('/api/users').send(newTestUser).expect(400);

    expect(result.body.error).toContain('password must be at least 3 characters long');

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(0);
  });
});
