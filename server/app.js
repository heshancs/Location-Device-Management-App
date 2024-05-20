const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error-handler');
const cors = require('cors')
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));
app.use('/api/locations', require('./routes/deviceRoutes'));

// Error handling middleware
app.use(errorHandler);

module.exports = app;
