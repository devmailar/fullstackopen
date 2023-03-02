const express = require('express');
const app = express();

let personData = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendick', number: '39-23-6423122' },
];

app.use(express.json());

app.get('/', (_request, response) => {
  response.send('Hello World');
});

app.get('/api/persons', (_request, response) => {
  response.json(personData);
});

app.get('/info', (_request, response) => {
  const entries = personData.length;
  const time = new Date();

  response.send(`Phonebook has info for ${entries} people <br> ${time}`);
});

app.get('/api/person/:id', (request, response) => {
  const entryId = Number(request.params.id);
  const existPerson = personData.find((person) => person.id === entryId);

  existPerson ? response.json(existPerson) : response.status(404).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
