const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Homepage route
router.get('/', async (req, res) => {
    try {
        // Get all posts and join with user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // Serialize data so the template can read it
        const posts = postData.map(post => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post', async (req, res) => {
    try {
        // Fetch all posts (to display a list to choose from)
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }]
        });

        const posts = postData.map(post => post.get({ plain: true }));

        res.render('create-post', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Post details route by id. 
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username'] },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ['username'] }],
                },
            ],
        });

        if (!postData) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        // Serialize the post data
        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Dashboard route
router.get('/dashboard', (req, res) => {
    // If the user is already logged in, redirect to homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('dashboard');
});

// Login route
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect to homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

// Create post route
router.get('/create-post', withAuth, (req, res) => {
    res.render('create-post', {
        logged_in: req.session.logged_in
    });
});

module.exports = router;
