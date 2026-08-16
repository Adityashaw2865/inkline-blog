// ============================================================
// controllers/postController.js — logic for post CRUD, likes, comments.
//
// TODO here:
//
// getAllPosts(req, res):
//   1. Read optional query params: req.query.category, req.query.search
//   2. Build a MongoDB filter object based on those
//   3. const posts = await Post.find(filter).populate('author', 'name')
//   4. res.json(posts)
//
// getPostById(req, res):
//   1. const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true })
//      (this both fetches AND increments the view count in one call)
//   2. If not found, res.status(404)
//   3. res.json(post)
//
// createPost(req, res):
//   1. Get title, tag, body from req.body
//   2. req.user should be available from the "protect" auth middleware
//   3. const post = await Post.create({ title, tag, body, author: req.user._id, excerpt: body.slice(0,100) })
//   4. res.status(201).json(post)
//
// toggleLike(req, res):
//   1. Find the post by req.params.id
//   2. Increment/decrement likes based on whether req.user already liked it
//   3. Save and return updated post
//
// addComment(req, res):
//   1. Find the post by req.params.id
//   2. Push { name, text } into post.comments
//   3. Save and return updated post
//
// module.exports = { getAllPosts, getPostById, createPost, toggleLike, addComment }
// ============================================================

// ============================================================
// controllers/postController.js — logic for post CRUD, likes, comments.
// ============================================================

const Post = require('../models/Post');

// GET all posts (with optional category filter + search)
async function getAllPosts(req, res) {
    const { category, search } = req.query;

    let filter = {};

    if (category && category !== 'All') {
        filter.tag = category;
    }

    if (search) {
        filter.title = { $regex: search, $options: 'i' };
    }

    const posts = await Post.find(filter).populate('author', 'name');
    res.json(posts);
}

// GET a single post by id, and increment its view count
async function getPostById(req, res) {
    const post = await Post.findByIdAndUpdate(
        req.params.id,
        { $inc: { views: 1 } },
        { new: true }
    );

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
}

// CREATE a new post (requires login — req.user comes from "protect" middleware)
async function createPost(req, res) {
    const { title, tag, body } = req.body;

    const post = await Post.create({
        title,
        tag,
        body,
        author: req.user._id,
        excerpt: body.slice(0, 100)
    });

    res.status(201).json(post);
}

// LIKE / UNLIKE a post
async function toggleLike(req, res) {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.user._id.toString();
    const alreadyLiked = post.likedBy.some(id => id.toString() === userId);

    if (alreadyLiked) {
        // unlike: remove user from likedBy, decrease count
        post.likedBy = post.likedBy.filter(id => id.toString() !== userId);
        post.likes -= 1;
    } else {
        // like: add user to likedBy, increase count
        post.likedBy.push(req.user._id);
        post.likes += 1;
    }

    await post.save();
    res.json(post);
}

// ADD a comment to a post
async function addComment(req, res) {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const { name, text } = req.body;

    post.comments.push({ name, text });
    await post.save();

    res.json(post);
}

module.exports = { getAllPosts, getPostById, createPost, toggleLike, addComment };