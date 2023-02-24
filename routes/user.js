const express = require('express');
const router = express.Router();
const users = require('../data/users.json');
const { body, validationResult } = require('express-validator');

// Get all users
router.get('/users', (req, res) => {
  res.json(users);
});

// Get one user
router.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.usersData.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// Use server-side validation to ensure that username and password meet certain requirements
const userValidation = [  body('username')    .isEmail()    .withMessage('Username must be a valid email address'),  body('password')    .isLength({ min: 8 })    .withMessage('Password must be at least 8 characters long'),];

// Add a user
router.post('/users', userValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;
  const newUser = { username, password };
  users.usersData.push(newUser);
  res.status(201).json(newUser);
});

// Get all shows watched by a user (user id in req.params)
router.get('/users/:id/shows', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.usersData.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user.showsWatched);
});

// Update and add a show if a user has watched it
router.put('/users/:userId/shows/:showId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const showId = parseInt(req.params.showId);
  const user = users.usersData.find(user => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const show = user.showsWatched.find(show => show.id === showId);
  if (show) {
    show.title = req.body.title || show.title;
    show.genre = req.body.genre || show.genre;
    show.rating = req.body.rating || show.rating;
    show.status = req.body.status || show.status;
    res.json(show);
  } else {
    const newShow = {
      id: showId,
      title: req.body.title,
      genre: req.body.genre,
      rating: req.body.rating,
      status: req.body.status,
    };
    user.showsWatched.push(newShow);
    res.status(201).json(newShow);
  }
});

module.exports = router;
