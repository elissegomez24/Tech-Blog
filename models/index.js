const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define associations, if necessary
User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

module.exports = {
    User,
    Post,
    Comment,
    sequelize
};
