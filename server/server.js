const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// App Setup
const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

// Database Connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
  

// LOGIN
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.json({ message: 'Login successful', username: user.username });
    } else {
      res.status(401).json({ message: 'Invalid password' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all posts
app.get('/api/posts', async (req, res) => {
  try {
    const [posts] = await pool.query(`
      SELECT posts.id, posts.content, posts.created_at, users.username,
      (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id) AS like_count
      FROM posts
      JOIN users ON posts.user_id = users.id
      ORDER BY posts.created_at DESC
    `);
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// POST new message
app.post('/api/post', async (req, res) => {
  const { content, username } = req.body;

  if (!content || content.length > 280) {
    return res.status(400).json({ message: "Post must be between 1-280 characters." });
  }

  try {
    const [userRows] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
    if (userRows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user_id = userRows[0].id;

    const [result] = await pool.query(
      'INSERT INTO posts (user_id, content) VALUES (?, ?)',
      [user_id, content]
    );

    const [newPostRows] = await pool.query(
      `SELECT posts.id, posts.content, posts.created_at, users.username
       FROM posts
       JOIN users ON posts.user_id = users.id
       WHERE posts.id = ?`,
      [result.insertId]
    );

    res.status(201).json(newPostRows[0]);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// SEARCH posts by username
app.post('/api/search', async (req, res) => {
  const { username } = req.body;

  try {
    const [posts] = await pool.query(
      `SELECT posts.id, posts.content, posts.created_at, users.username
       FROM posts
       JOIN users ON posts.user_id = users.id
       WHERE users.username = ?
       ORDER BY posts.created_at DESC`,
      [username]
    );

    res.json({ status: "success", posts });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
