const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    try {
        // Sync the database 
        await sequelize.sync({ force: true });

        // Seed users
        const users = await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });

        // Log users to check their IDs
        console.log('Users seeded:', users);

        // Seed posts
        const posts = await Post.bulkCreate(postData, {
            returning: true,
        });

        // Log posts to check their IDs
        console.log('Posts seeded:', posts);

        // Seed comments
        await Comment.bulkCreate(commentData, {
            returning: true,
        });

        // Log success message and exit
        console.log('Comments seeded');
        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Failed to seed database:', err);
        process.exit(1);
    }
};

// Seed the database
seedDatabase();
