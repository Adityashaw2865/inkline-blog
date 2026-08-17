import { useState } from 'react'
import { API_URL } from '../config.js'

// ============================================================
// LOGIN / SIGNUP MODAL — same modal, toggles between two modes.
// isSignup=false → login form, isSignup=true → signup form.
// ============================================================
export default function LoginModal({ onClose, onLogin }) {
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (isSignup && !name.trim()) {
      setError('Enter your name.')
      return
    }
    if (!email.trim() || !password.trim()) {
      setError('Enter both email and password.')
      return
    }

    const endpoint = isSignup ? 'signup' : 'login'
    const payload = isSignup ? { name, email, password } : { email, password }

    try {
      const res = await fetch(`${API_URL}/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Something went wrong')
        return
      }

      setError('')
      onLogin(data.user, data.token)
    } catch (err) {
      setError('Something went wrong. Try again.')
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h3>{isSignup ? 'Create an account' : 'Welcome back'}</h3>
        <p className="sub">
          {isSignup ? 'Sign up to start writing.' : 'Log in to write and manage your posts.'}
        </p>

        {isSignup && (
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        )}

        <div className="field">
          <label>Email</label>
          <input
            type="text"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="text"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="error-text">{error}</div>}

        <button className="btn btn-primary" onClick={handleSubmit}>
          {isSignup ? 'Sign up' : 'Log in'}
        </button>

        <div className="modal-switch">
          {isSignup ? (
            <>
              Already have an account?{' '}
              <span onClick={() => { setIsSignup(false); setError('') }}>Log in</span>
            </>
          ) : (
            <>
              New here?{' '}
              <span onClick={() => { setIsSignup(true); setError('') }}>Create an account</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
