const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogsController');
const usersRouter = require('./controllers/usersController');
const loginRouter = require('./controllers/loginController');
const middleware = require('./utils/middleware');

const config = require('./utils/config');
const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI);

console.info('connecting to', config.MONGODB_URI);

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.tokenExtractor);

// log every request to the console
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// your routes here
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testingController');
  app.use('/api/testing', testingRouter);
}

module.exports = app;
