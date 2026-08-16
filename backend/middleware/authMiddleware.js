// ============================================================
// middleware/authMiddleware.js — protects routes that require login.
//
// TODO here:
// 1. Export a function `protect(req, res, next)`
// 2. Read the token from the request header:
//    const token = req.headers.authorization?.split(' ')[1]  // "Bearer <token>"
// 3. If no token, res.status(401).json({ message: 'Not authorized' })
// 4. Verify the token: const decoded = jwt.verify(token, process.env.JWT_SECRET)
// 5. Find the user by decoded id and attach to the request: req.user = user
// 6. Call next() to continue to the actual route handler
// 7. Wrap steps 4-6 in try/catch — invalid/expired token should also return 401
//
// Usage in routes: router.post('/', protect, createPost)
// ============================================================
const jwt = require('jsonwebtoken');
const User = require('../models/User');
async function protect(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized' });
    }
}

module.exports=protect;
