const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
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

module.exports = app;
