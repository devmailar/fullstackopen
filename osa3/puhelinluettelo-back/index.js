const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("request-data", (req, _res) => JSON.stringify(req.body));

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :request-data "
  )
);

// app.get("/", (_request, response) => {
//   response.send("Hello World");
// });

app.get("/info", (_req, res) => {
  Person.find({}).then((result) => {
    res.send(
      `Phonebook has info for ${result.length} people <br> ${new Date()}`
    );
  });
});

app.get("/api/persons", (_req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (result) {
        return res.status(204).end();
      } else {
        return res.status(404).json({
          error: "entry not found",
        });
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  person
    .findByIdAndUpdate(req.params.id, {
      name,
      number,
    })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
