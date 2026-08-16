
import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import PostView from './components/PostView.jsx'
import WriteView from './components/WriteView.jsx'
import LoginModal from './components/LoginModal.jsx'
import Toast from './components/Toast.jsx'
import ProgressBar from './components/ProgressBar.jsx'

// ============================================================
// APP — the top-level component.
// All shared state (posts, current view, login status) lives here
// and gets passed down to children as props.
// ============================================================
export default function App() {
  // All blog posts — fetched from the backend API on first load
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching posts:', err))
  }, [])

  // Which "page" is currently visible: 'home' | 'post' | 'write'
  const [currentView, setCurrentView] = useState('home')

  // Which post id is open (only relevant when currentView === 'post')
  const [activePostId, setActivePostId] = useState(null)

  // Simple auth state — later this becomes a real JWT/session check
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Toast notification message (empty string = hidden)
  const [toastMessage, setToastMessage] = useState('')

  // Search + category filter state (used by Home view)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  // Show a toast for 2.5s then auto-hide
  function showToast(message) {
    setToastMessage(message)
    setTimeout(() => setToastMessage(''), 2500)
  }

  // Navigate to the post view for a given post, incrementing its view count
  function openPost(id) {
    setPosts(prev => prev.map(p => (p._id === id ? { ...p, views: p.views + 1 } : p)))
    setActivePostId(id)
    setCurrentView('post')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goHome() {
    setCurrentView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Toggle like/unlike on a post by id
  async function toggleLike(id) {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:3001/api/posts/${id}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const updatedPost = await res.json()
      if (!res.ok) {
        showToast(updatedPost.message || 'Could not like post')
        return
      }
      setPosts(prev => prev.map(p => (p._id === id ? updatedPost : p)))
    } catch (err) {
      showToast('Something went wrong')
    }
  }

  // Add a new comment to a specific post
  async function addComment(id, text) {
    try {
      const res = await fetch(`http://localhost:3001/api/posts/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: isLoggedIn ? 'You' : 'Guest', text }),
      })
      const updatedPost = await res.json()
      if (!res.ok) {
        showToast(updatedPost.message || 'Could not add comment')
        return
      }
      setPosts(prev => prev.map(p => (p._id === id ? updatedPost : p)))
    } catch (err) {
      showToast('Something went wrong')
    }
  }

  // Add a brand-new post (from the Write form)
  async function addPost({ title, tag, body }) {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:3001/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, tag, body }),
      })
      const newPost = await res.json()
      if (!res.ok) {
        showToast(newPost.message || 'Could not publish post')
        return
      }
      setPosts(prev => [newPost, ...prev])
      showToast('Post published')
      goHome()
    } catch (err) {
      showToast('Something went wrong')
    }
  }

  function handleLogin(user, token) {
    setIsLoggedIn(true)
    localStorage.setItem('token', token) // save token for later API calls
    setShowLoginModal(false)
    showToast('Logged in successfully')
  }

  function handleLogout() {
    setIsLoggedIn(false)
    showToast('Logged out')
  }

  const activePost = posts.find(p => p._id === activePostId)

  return (
    <>
      <ProgressBar />

      <Header
        currentView={currentView}
        onNavigate={view => (view === 'home' ? goHome() : setCurrentView(view))}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />

      <main>
        {currentView === 'home' && (
          <Home
            posts={posts}
            searchQuery={searchQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onOpenPost={openPost}
            onToggleLike={toggleLike}
          />
        )}

        {currentView === 'post' && activePost && (
          <PostView
            post={activePost}
            onBack={goHome}
            onToggleLike={toggleLike}
            onAddComment={addComment}
            isLoggedIn={isLoggedIn}
          />
        )}

        {currentView === 'write' && <WriteView onPublish={addPost} />}
      </main>

      <footer>
        &copy; 2026 Inkline. Built for quiet reading.
        <div className="credit">
          Build by Aditya Kumar Shaw with love ❤️
          <span className="sep">&middot;</span>
          <a href="https://www.linkedin.com/in/aditya-kumar-shaw-481735326/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <span className="sep">&middot;</span>
          <a href="mailto:aks09adi@gmail.com">aks09adi@gmail.com</a>
        </div>
      </footer>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
      )}

      <Toast message={toastMessage} />
    </>
  )
}
