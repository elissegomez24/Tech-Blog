const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments for a specific post
router.get('/post/:postId', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: {
                post_id: req.params.postId,
            },
        });

        res.json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        });

        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update an existing comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [updated] = await Comment.update(
            { content: req.body.content },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            }
        );

        if (updated) {
            res.status(200).json({ message: 'Comment updated successfully' });
        } else {
            res.status(404).json({ message: 'Comment not found or not authorized' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleted = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Comment not found or not authorized' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
