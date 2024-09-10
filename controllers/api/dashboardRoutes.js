router.get('/dashboard', async (req, res) => {
    try {
        const userPosts = await Post.findAll({
            where: { user_id: req.session.userId },
        });
        const posts = userPosts.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});
