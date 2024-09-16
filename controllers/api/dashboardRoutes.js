const express = require('express');
const router = express.Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Get dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                userId: req.session.userId,
            },
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new post
router.get('/post', async (req, res) => {
    try {
        // Fetch all posts from the database
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }]
        });

        // Serialize the data
        const posts = postData.map(post => post.get({ plain: true }));

        // Check if there are any posts
        if (posts.length === 0) {
            // If no posts are available, render a page with a 'Create Post' button
            res.render('no-posts', {
                logged_in: req.session.logged_in
            });
        } else {
            // If posts are available, render the posts page with the posts data
            res.render('posts', {
                posts,
                logged_in: req.session.logged_in
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a post
router.put('/edit/:id', withAuth, async (req, res) => {
    try {
        const { title, content } = req.body;

        const post = await Post.findByPk(req.params.id);

        if (post.userId !== req.session.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await post.update({ title, content });

        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a post
router.delete('/delete/:id', withAuth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (post.userId !== req.session.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await post.destroy();

        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
