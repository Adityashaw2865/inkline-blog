// ============================================================
// index.js — main entry point of the backend server.
//
// TODO here:
// 1. Import express, dotenv, cors
// 2. Call dotenv.config() to load .env variables
// 3. Create the express app: const app = express()
// 4. Add middleware: app.use(express.json()), app.use(cors())
// 5. Connect to MongoDB (import from config/db.js)
// 6. Mount your routes, e.g.:
//      app.use('/api/posts', require('./routes/postRoutes'))
//      app.use('/api/auth', require('./routes/authRoutes'))
// 7. Start the server: app.listen(PORT, () => console.log(...))
// ============================================================
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