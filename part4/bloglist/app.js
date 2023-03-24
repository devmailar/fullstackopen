const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogsController');
const usersRouter = require('./controllers/usersController');
const loginRouter = require('./controllers/loginController');
const config = require('./utils/config');
const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI);

console.info('connecting to', config.MONGODB_URI);

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;
