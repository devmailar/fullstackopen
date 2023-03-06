const express = require("express");
const morgan = require("morgan");
const app = express();

let personData = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendick", number: "39-23-6423122" },
];

app.use(express.json());

morgan.token("request-data", (request, _response) =>
  JSON.stringify(request.body)
);

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :request-data "
  )
);

app.get("/", (_request, response) => {
  response.send("Hello World");
});

app.get("/api/persons", (_request, response) => {
  response.json(personData);
});

app.get("/info", (_request, response) => {
  const entries = personData.length;
  const time = new Date();

  response.send(`Phonebook has info for ${entries} people <br> ${time}`);
});

app.get("/api/person/:id", (request, response) => {
  const entryId = Number(request.params.id);
  const existPerson = personData.find((person) => person.id === entryId);

  existPerson ? response.json(existPerson) : response.status(404).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (
    !body.name ||
    !body.number ||
    body.name.trim().length === 0 ||
    body.number.trim().length === 0
  ) {
    return response
      .status(400)
      .json({ error: "name or number missing or empty field" });
  }

  const existingPerson = personData.find((person) => person.name === body.name);
  if (existingPerson) {
    return response.status(409).json({ error: "name must be unique" });
  }

  const newEntry = {
    id: Math.floor(Math.random() * 1000000),
    name: body.name,
    number: body.number,
  };

  personData = personData.concat(newEntry);
  response.json(newEntry);
});

app.delete("/api/person/:id", (request, response) => {
  const entryId = Number(request.params.id);
  const newEntry = personData.filter((person) => person.id !== entryId);

  response.json(newEntry);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
