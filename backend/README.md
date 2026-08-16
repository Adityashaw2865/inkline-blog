# Inkline — Blog Backend (Node.js + Express + MongoDB)

Skeleton structure only — files have TODO comments guiding you on what to write.

## Setup

```bash
npm install
cp .env.example .env
# then edit .env with your real MongoDB URI and JWT secret
npm run dev
```

## Folder structure

```
index.js                    -> server entry point (TODO)
config/
  db.js                       -> MongoDB connection logic (TODO)
models/
  User.js                      -> user schema (TODO)
  Post.js                       -> blog post schema (TODO)
routes/
  authRoutes.js                  -> /api/auth/signup, /api/auth/login (TODO)
  postRoutes.js                   -> /api/posts/... CRUD routes (TODO)
controllers/
  authController.js                -> signup/login logic (TODO)
  postController.js                 -> post CRUD + likes + comments logic (TODO)
middleware/
  authMiddleware.js                  -> JWT auth guard for protected routes (TODO)
utils/
  generateToken.js                    -> JWT token creation helper (TODO)
```

## Suggested build order

1. `config/db.js` → get MongoDB connecting first
2. `models/User.js` + `models/Post.js` → define your data shape
3. `utils/generateToken.js` → small and reusable, do this early
4. `controllers/authController.js` + `routes/authRoutes.js` → signup/login working
5. `middleware/authMiddleware.js` → protect routes once login works
6. `controllers/postController.js` + `routes/postRoutes.js` → post CRUD, likes, comments
7. `index.js` → wire everything together last

## Connecting to the React frontend

Once routes are live, replace the dummy data in the frontend:
- `GET http://localhost:5000/api/posts` → replaces `data/posts.js`
- `POST http://localhost:5000/api/posts` → replaces `addPost()` in App.jsx
- `POST http://localhost:5000/api/auth/login` → replaces `handleLogin()` in App.jsx

You'll also need `cors()` enabled in `index.js` so the frontend (port 5173) can call the backend (port 5000).
