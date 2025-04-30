const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
// GET user's tasks
router.get('/', async (req, res) => {
try {
const userId = req.query.userId; // Get userId from query params
if (!userId) {
return res.status(400).json({ message: 'User ID required' });
}

const tasks = await Task.find({ user: userId });
res.json(tasks);
} catch (err) {
res.status(500).json({ message: err.message });
}
});

// POST new task (include user ID)
router.post('/', async (req, res) => {
try {
const task = new Task({
title: req.body.title,
user: req.body.userId // Add user reference
});

const newTask = await task.save();
res.status(201).json(newTask);
} catch (err) {
res.status(400).json({ message: err.message });
}
});

// PATCH task completion
router.patch('/:id/complete', async (req, res) => {
try {
const task = await Task.findOne({
_id: req.params.id,
user: req.body.userId // Verify task belongs to user
});

if (!task) {
return res.status(404).json({ message: 'Task not found' });
}

task.completed = !task.completed;
const updatedTask = await task.save();
res.json(updatedTask);
} catch (err) {
res.status(400).json({ message: err.message });
}
});

module.exports = { router };