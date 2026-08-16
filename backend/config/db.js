// ============================================================
// config/db.js — MongoDB connection logic.
//
// TODO here:
// 1. Import mongoose
// 2. Create an async function connectDB()
//    - inside, use: await mongoose.connect(process.env.MONGO_URI)
//    - wrap in try/catch to log connection errors
// 3. Export the function: module.exports = connectDB
//
// Then in index.js, call connectDB() before app.listen()
// ============================================================
const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection Failed:',error.message);
    }
}
module.exports=connectDB;