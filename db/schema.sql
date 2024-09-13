-- Drop tables if they exist to reset the schema
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW ()
    );

-- Create the posts table
CREATE TABLE
    posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW (),
        user_id INTEGER REFERENCES users (id) ON DELETE CASCADE
    );

CREATE TABLE
    comments (
        id SERIAL PRIMARY KEY,
        comment_text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW (),
        user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
        post_id INTEGER REFERENCES posts (id) ON DELETE CASCADE
    );