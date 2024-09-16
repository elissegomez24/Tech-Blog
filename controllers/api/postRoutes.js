const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', {  // Render the dashboard view
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [User, { model: Comment, include: [User] }],
        });

        if (!postData) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const post = postData.get({ plain: true });
        res.render('post', {  // Render the post view
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a post by ID
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });

        if (!updatedPost[0]) {
            return res.status(404).json({ message: 'Post not found or not authorized' });
        }

        res.status(200).json({ message: 'Post updated successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a post by ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found or not authorized' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
