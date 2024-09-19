const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Get dashboard with user's posts
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
        console.error(err);
        res.status(500).json(err);
    }
});

// Route to All posts 
router.get('/posts', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }],
        });

        const posts = postData.map(post => post.get({ plain: true }));

        if (posts.length === 0) {
            res.render('no-posts', {
                loggedIn: req.session.loggedIn,
            });
        } else {
            res.render('posts', {
                posts,
                loggedIn: req.session.loggedIn,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Update a post
router.put('/edit/:id', withAuth, async (req, res) => {
    try {
        const { title, content } = req.body;

        const [updated] = await Post.update(
            { title, content },
            {
                where: {
                    id: req.params.id,
                    userId: req.session.userId,
                },
            }
        );

        if (updated) {
            res.status(200).json({ message: 'Post updated successfully' });
        } else {
            res.status(404).json({ message: 'Post not found or not authorized' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Delete a post
router.delete('/delete/:id', withAuth, async (req, res) => {
    try {
        const deleted = await Post.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });

        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Post not found or not authorized' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
