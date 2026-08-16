// ============================================================
// utils/generateToken.js — creates a JWT token for a logged-in user.
//
// TODO here:
// 1. Import jsonwebtoken
// 2. Export a function generateToken(userId)
//    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
//
// Used in authController.js after signup/login succeeds.
// ============================================================
const jwt = require('jsonwebtoken');

function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

module.exports = generateToken;