const router = require('express').Router();
const { Post, User } = require('../models');

// Homepage route
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']],
        });
        const postList = posts.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts: postList,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Dashboard route
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// Login Route 
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Signup Route
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

// Create Post Route
router.get('/create-post', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    res.render('create-post');
});

// Post details route
router.get('/post/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username'] },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ['username'] }],
                },
            ],
        });

        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        res.render('post', {
            post: post.get({ plain: true }),
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

