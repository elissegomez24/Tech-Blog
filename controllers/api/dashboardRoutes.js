router.get('/dashboard', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    try {
        const userPosts = await Post.findAll({
            where: { user_id: req.session.userId },
            include: [User],
        });

        const posts = userPosts.map((post) => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
