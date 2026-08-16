# Inkline — Blog Frontend (React)

Dark premium blog UI built with React + Vite.

## How to run

```bash
npm install
npm run dev
```

Then open the URL it shows (usually `http://localhost:5173`).

## Project structure

```
src/
  main.jsx              -> React entry point, mounts <App />
  App.jsx                -> Top-level component, holds all shared state
  index.css               -> All styling (design tokens + component styles)
  data/
    posts.js              -> Dummy post data (will be replaced by backend API calls)
  components/
    Header.jsx             -> Navbar: logo, search, nav links, login/profile
    Home.jsx                -> Landing page: hero + category filters + post grid
    PostCard.jsx             -> Single post preview card (used in the grid)
    PostView.jsx              -> Full article page (likes, comments)
    WriteView.jsx              -> "New post" form with validation
    LoginModal.jsx              -> Login popup
    Toast.jsx                    -> Bottom notification popup
    ProgressBar.jsx               -> Top reading-progress bar
```

## What's still frontend-only (dummy data)

- Posts, likes, comments, and login are currently stored only in React state (in memory).
  Refreshing the page resets everything.
- Once your Node.js + Express + MongoDB backend is ready, replace:
  - `data/posts.js` initial load → `fetch('http://localhost:5000/api/posts')`
  - `addPost()` in App.jsx → `fetch('/api/posts', { method: 'POST', body: ... })`
  - `handleLogin()` in App.jsx → real `/api/auth/login` call + store JWT token
  - `toggleLike()` / `addComment()` → corresponding backend routes

## Credit

Build by Aditya Kumar Shaw with love ❤️
LinkedIn: https://www.linkedin.com/in/aditya-kumar-shaw-481735326/
Email: aks09adi@gmail.com
