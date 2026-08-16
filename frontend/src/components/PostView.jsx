import { useState } from 'react'
import { estimateReadTime } from './PostCard.jsx'

// ============================================================
// POST VIEW — full article page: title, body, like/bookmark
// actions, and a comments section (comments are local state
// for now — later this POSTs to the backend).
// ============================================================
export default function PostView({ post, onBack, onToggleLike, onAddComment, isLoggedIn }) {
  const [commentText, setCommentText] = useState('')

  function handleCommentSubmit(e) {
    e.preventDefault()
    const text = commentText.trim()
    if (!text) return
    onAddComment(post._id, text)
    setCommentText('')
  }

  return (
    <section className="view" id="view-post">
      <div className="post-full">
        <span className="back-link" onClick={onBack}>
          &larr; Back to all posts
        </span>

        <span className="post-tag">{post.tag}</span>
        <h1>{post.title}</h1>

        <div className="post-meta">
          <div className="avatar">{post.author.split(' ').map(n => n[0]).join('')}</div>
          <span>{post.author}</span>
          <span>&middot;</span>
          <span>{post.date}</span>
          <span className="meta-stats">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>{' '}
              {estimateReadTime(post.body)} min read
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>{' '}
              {post.views} views
            </span>
          </span>
        </div>

        {/* dangerouslySetInnerHTML because our post body is stored as HTML string.
            NOTE: only safe here because WE control the content (dummy data / our own form).
            If posts ever come from untrusted users, sanitize this HTML before rendering. */}
        <div className="body-text" dangerouslySetInnerHTML={{ __html: post.body }} />

        <div className="post-actions">
          <button
            className={`btn like-btn ${post.liked ? 'liked' : ''}`}
            style={{ border: '1px solid var(--border-strong)', borderRadius: 'var(--radius)', padding: '9px 16px' }}
            onClick={() => onToggleLike(post._id)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.8 4.6c-1.6-1.6-4.2-1.6-5.8 0L12 7.6l-3-3c-1.6-1.6-4.2-1.6-5.8 0-1.6 1.6-1.6 4.2 0 5.8l8.8 8.8 8.8-8.8c1.6-1.6 1.6-4.2 0-5.8z" />
            </svg>
            {post.likes} Like
          </button>
          <button className="btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ width: 16, height: 16, verticalAlign: -3, marginRight: 4 }}
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Bookmark
          </button>
        </div>

        <div className="comments-section">
          <h3>Comments ({post.comments.length})</h3>

          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </form>

          {post.comments.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
              No comments yet. Be the first to say something.
            </p>
          ) : (
            post.comments.map((c, i) => (
              <div className="comment" key={i}>
                <div className="avatar">{c.name.split(' ').map(n => n[0]).join('')}</div>
                <div className="comment-body">
                  <div className="c-name">{c.name}</div>
                  <p>{c.text}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
