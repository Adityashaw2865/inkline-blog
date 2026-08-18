// ============================================================
// Shared helper — estimate reading time from HTML body content
// (rough: word count / 200 words-per-minute)
// ============================================================
export function estimateReadTime(html) {
  const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

// ============================================================
// Shared helper — format the backend's `createdAt` timestamp into
// a readable date string (e.g. "Aug 12, 2026").
// NOTE: backend sends `createdAt`, not `date` — this fixes the
// mismatch where the UI used to look for a non-existent `post.date`.
// ============================================================
export function formatPostDate(createdAt) {
  if (!createdAt) return ''
  return new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// ============================================================
// POST CARD — a single post preview shown in the home grid.
// Clicking the card opens the post; clicking the like button
// toggles the like WITHOUT opening the post (stopPropagation).
// ============================================================
export default function PostCard({ post, onOpen, onToggleLike }) {
  return (
    <div className="post-card" onClick={() => onOpen(post._id)}>
      <div className="card-top">
        <span className="post-tag">{post.tag}</span>
        <button
          className={`like-btn ${post.liked ? 'liked' : ''}`}
          onClick={e => {
            e.stopPropagation()
            onToggleLike(post._id)
        }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.8 4.6c-1.6-1.6-4.2-1.6-5.8 0L12 7.6l-3-3c-1.6-1.6-4.2-1.6-5.8 0-1.6 1.6-1.6 4.2 0 5.8l8.8 8.8 8.8-8.8c1.6-1.6 1.6-4.2 0-5.8z" />
          </svg>
          {post.likes}
        </button>
      </div>

      <h3>{post.title}</h3>
      <p className="excerpt">{post.excerpt}</p>

      <div className="post-meta">
        <div className="avatar">
          {post.author?.name?.split(' ').map(n => n[0]).join('') || '?'}
        </div>
        <span>{post.author?.name || 'Unknown'}</span>
        <span>&middot;</span>
        <span>{formatPostDate(post.createdAt)}</span>
        <span className="meta-stats">
          <span>{estimateReadTime(post.body)} min read</span>
          <span>{post.views} views</span>
        </span>
      </div>
    </div>
  )
}
