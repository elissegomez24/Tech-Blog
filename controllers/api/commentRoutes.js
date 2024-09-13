const router = require('express').Router();
const { Comment } = require('../../models');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single comment by ID
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new comment
router.post('/', async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({ message: 'Please log in to comment' });
    }

    try {
        const newComment = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.userId,  // Session-based user authentication
            post_id: req.body.post_id,
        });
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});


// Update a comment by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (updated) {
            const updatedComment = await Comment.findByPk(req.params.id);
            res.json(updatedComment);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a comment by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
