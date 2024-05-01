
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/database');
const dotenv = require('dotenv');
dotenv.config();


const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    db.run('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not register user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});


// Login user
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    db.get('SELECT * FROM Users WHERE username = ?', [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Create and send JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;
