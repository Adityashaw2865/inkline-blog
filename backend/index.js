// ============================================================
// index.js — main entry point of the backend server.
// ============================================================

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const connectDB = require('./config/db');

const app = express();

app.use(express.json());
app.use(cors());

// connect to MongoDB
connectDB();

// mount routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
