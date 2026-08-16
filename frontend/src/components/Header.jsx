import { useState } from 'react'

// ============================================================
// HEADER — sticky navbar: logo, nav links, search, auth buttons.
// Receives all its data/behavior as props from App (no local state
// except the profile dropdown open/close, which is purely visual).
// ============================================================
export default function Header({
  currentView,
  onNavigate,
  searchQuery,
  onSearchChange,
  isLoggedIn,
  onLoginClick,
  onLogout,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header>
      <nav>
        <div className="logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
          Ink<span>line</span>
        </div>

        <ul className="nav-links">
          <li>
            <a className={currentView === 'home' ? 'active' : ''} onClick={() => onNavigate('home')}>
              Home
            </a>
          </li>
          <li>
            <a className={currentView === 'write' ? 'active' : ''} onClick={() => onNavigate('write')}>
              Write
            </a>
          </li>
        </ul>

        {/* search — only meaningful on the home view but always visible for simplicity */}
        <div className="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>

        <div className="nav-actions">
          {!isLoggedIn && (
            <button className="btn" onClick={onLoginClick}>
              Log in
            </button>
          )}

          <button className="btn btn-primary" onClick={() => onNavigate('write')}>
            New post
          </button>

          {isLoggedIn && (
            <>
              <div className="profile-btn" onClick={() => setDropdownOpen(o => !o)}>
                Y
              </div>
              {dropdownOpen && (
                <div className="profile-dropdown">
                  <a href="#">Your profile</a>
                  <a href="#">Saved posts</a>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      setDropdownOpen(false)
                      onLogout()
                    }}
                  >
                    Log out
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
