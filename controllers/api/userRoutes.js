const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User } = require('../../models');

// SignUp route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({
      username,
      email,
      password
    });
    req.session.userId = user.id; // Store the user ID in session
    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).send('Failed to save session.');
      }
      res.redirect('/dashboard'); // Redirect to dashboard after signup
    });
  } catch (error) {
    console.error('Signup error:', error);
    res
      .status(400)
      .render('signup', { error: 'Signup failed. Please try again.' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user && await user.checkPassword(password)) {
      req.session.userId = user.id;
      req.session.save(err => {
        if (err) {
          console.error('Session save error:', err);
          return res.status(500).send('Failed to save session.');
        }
        res.status(200).json(user)
      });
    } else {
      console.log('invalid')
      res.status(400).json('login', { error: 'Invalid password or email.' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json('login', { error: 'Login failed. Please try again.' });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Session destroy error:', err);
      return res.redirect('/dashboard');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

module.exports = router;
