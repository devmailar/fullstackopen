const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const app = express();

mongoose.set('strictQuery', false);

console.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;
