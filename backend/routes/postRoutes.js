// ============================================================
// routes/postRoutes.js — routes for blog post CRUD operations.
//
// TODO here:
// 1. Import express and create a router: const router = express.Router()
// 2. Import controller functions from controllers/postController.js
// 3. Define routes (matches what the React frontend needs):
//    - router.get('/', getAllPosts)          -> list all posts (with search/filter query params)
//    - router.get('/:id', getPostById)       -> single post + increment view count
//    - router.post('/', protect, createPost) -> create new post (protect = auth middleware)
//    - router.put('/:id/like', protect, toggleLike)   -> like/unlike a post
//    - router.post('/:id/comments', addComment)       -> add a comment
// 4. Export: module.exports = router
//
// "protect" here means: import your auth middleware (middleware/authMiddleware.js)
// and use it on routes that require the user to be logged in.
// ============================================================

const express=require('express');
const {getAllPosts, getPostById, createPost, toggleLike, addComment}=require('../controllers/postController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/',getAllPosts);
router.get('/:id',getPostById);
router.post('/',protect,createPost);
router.put('/:id/like',protect,toggleLike);
router.post('/:id/comments',addComment);

module.exports = router;


