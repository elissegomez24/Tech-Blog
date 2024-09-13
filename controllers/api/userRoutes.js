const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => {
  res.send('User routes');
});

// Sign up route
router.post('/signup', async (req, res) => {
  try {
    const existingUser = await User.findOne({ where: { username: req.body.username } });

    if (existingUser) {
      console.log('Username already taken:', req.body.username);
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const userData = await User.create({
      username: req.body.username,
      password: hashedPassword
    });

    req.session.user_id = userData.id;
    res.status(200).json({ id: userData.id, username: userData.username });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'An error occurred during signup' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, userData.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
