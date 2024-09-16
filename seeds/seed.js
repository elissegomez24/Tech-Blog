const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    // Seed users
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // Seed posts
    await Post.bulkCreate(postData, {
        returning: true,
    });

    // Seed comments
    await Comment.bulkCreate(commentData, {
        returning: true,
    });

    console.log('Database seeded successfully');
    process.exit(0);
};

// Seed the database
seedDatabase();
