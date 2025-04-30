const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
try {
const { username, email, password } = req.body;

// Check if user exists
const existingUser = await User.findOne({ email });
if (existingUser) {
return res.status(400).json({ message: 'User already exists' });
}

// Create new user
const user = new User({ username, email, password });
await user.save();

res.status(201).json({
message: 'User registered successfully',
user: { id: user._id, username }
});
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
});

// Login
router.post('/login', async (req, res) => {
try {
const { email, password } = req.body;

// Find user
const user = await User.findOne({ email });
if (!user) {
return res.status(400).json({ message: 'User not found' });
}

// Check password (plain text comparison for now)
if (user.password !== password) {
return res.status(400).json({ message: 'Invalid credentials' });
}
res.json({
message: 'Login successful',
user: { id: user._id, username: user.username }
});
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
});

module.exports = { router }