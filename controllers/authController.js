const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Save user to DB
  db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).send('Error creating user');
      res.status(201).send('User created successfully');
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  
  // Find user by email
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).send('User not found');
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return res.status(400).send('Invalid password');

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};
