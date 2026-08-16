import { useState } from 'react'

// ============================================================
// LOGIN MODAL — overlay with email/password fields.
// Now connected to the real backend login API.
// ============================================================
export default function LoginModal({ onClose, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      setError('Enter both email and password.')
      return
    }

    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Login failed')
        return
      }

      setError('')
      onLogin(data.user, data.token) // pass user + token up to App
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
        <h3>Welcome back</h3>
        <p className="sub">Log in to write and manage your posts.</p>

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

        <button className="btn btn-primary" onClick={handleLogin}>
          Log in
        </button>

        <div className="modal-switch">
          New here? <span>Create an account</span>
        </div>
      </div>
    </div>
  )
}