const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

test('return correct amount of blogs in json format', async () => {
  let hi = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  console.log('return correct amount of blogs in json format\ndata:', hi.body);
});
