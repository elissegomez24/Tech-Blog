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

        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to retrieve comments', error: err });
    }
});

// Create a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const { content, post_id } = req.body;

        // Ensure content and post_id are provided
        if (!content || !post_id) {
            return res.status(400).json({ message: 'Content and Post ID are required' });
        }

        const newComment = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        });

        res.status(201).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create comment', error: err });
    }
});

// Update an existing comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Content is required to update comment' });
        }

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
            const updatedComment = await Comment.findOne({ where: { id: req.params.id } });
            res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
        } else {
            res.status(404).json({ message: 'Comment not found or not authorized' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update comment', error: err });
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
        console.error(err);
        res.status(500).json({ message: 'Failed to delete comment', error: err });
    }
});

module.exports = router;
