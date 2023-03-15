const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Note = require('../models/note');

const initialNotes = [
  { content: 'HTML is easy', important: false },
  { content: 'Browser can execute only JavaScript', important: true },
];

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObj = new Note(initialNotes[0]);
  await noteObj.save();

  noteObj = new Note(initialNotes[1]);
  await noteObj.save();
});

test('there are two notes', async () => {
  const response = await api.get('/api/notes');

  expect(response.body).toHaveLength(initialNotes.length);
});

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes');

  const contents = response.body.map((r) => r.content);

  expect(contents).toContain('Browser can execute only JavaScript');
});

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

afterAll(async () => {
  await mongoose.connection.close();
});
