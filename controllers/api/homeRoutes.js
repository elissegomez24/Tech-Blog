// controllers/homeRoutes.js
const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

// Render the homepage with all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [User] // Adjust as needed for your models
        });
        res.render('homepage', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render a single post and its comments
router.get('/post/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [User, Comment]
        });
        if (!post) {
            return res.status(404).render('404'); // Render a 404 page if post not found
        }
        res.render('post', { post });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add more routes as needed

module.exports = router;
