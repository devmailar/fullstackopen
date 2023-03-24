const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/userModel');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });

  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  const userExists = await User.findOne({ username });

  if (userExists) {
    return response.status(400).json({ error: 'username must be unique' });
  }

  if (!username || !password) {
    return response.status(400).json({ error: 'username and password are required' });
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'username and password must be at least 3 characters long',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser.toJSON());
});

module.exports = usersRouter;
