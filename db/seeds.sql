-- Insert sample data into the users table
INSERT INTO users (username, password)
VALUES
  ('tech_guru', 'hashed_password1'), -- Replace with actual hashed passwords
  ('dev_master', 'hashed_password2'),
  ('code_wizard', 'hashed_password3');

-- Insert sample data into the posts table
INSERT INTO posts (title, content, user_id)
VALUES
  ('How to Use Express.js with Sequelize', 'This post explains how to integrate Sequelize with Express.js for better database management.', 1),
  ('Understanding Handlebars.js', 'In this blog, we will explore how Handlebars.js can be used to create dynamic front-end pages.', 2),
  ('Node.js Authentication Strategies', 'Learn different authentication strategies in Node.js, including sessions and JWT.', 3);

-- Insert sample data into the comments table
INSERT INTO comments (comment_text, user_id, post_id)
VALUES
  ('Great article on Express.js!', 2, 1),
  ('Thanks for the detailed guide!', 3, 1),
  ('Very informative post on Handlebars!', 1, 2),
  ('I learned a lot about authentication. Thank you!', 1, 3);
