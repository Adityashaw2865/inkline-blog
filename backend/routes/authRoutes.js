// ============================================================
// routes/authRoutes.js — routes for signup/login.
//
// TODO here:
// 1. Import express and create a router: const router = express.Router()
// 2. Import the controller functions from controllers/authController.js
// 3. Define routes:
//    - router.post('/signup', signupUser)
//    - router.post('/login', loginUser)
// 4. Export: module.exports = router
//
// These get mounted in index.js as: app.use('/api/auth', require('./routes/authRoutes'))
// ============================================================
const express=require('express');
const{signupUser,loginUser}=require('../controllers/authController');
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);

module.exports = router;
