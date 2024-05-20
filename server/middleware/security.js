const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./error-handler');
const pool = require('../database/db');

const app = express();

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173', // Change this to your allowed origin
  methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
  allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers
}));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(errorHandler);

module.exports = app;
