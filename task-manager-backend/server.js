const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/tasks', taskRoutes.router); // Make sure you're using the router property
app.use('/api/auth', authRoutes.router); // Same here

// Error Handling Middleware
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ message: 'Something broke!' });
});
const PORT = 5001;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});