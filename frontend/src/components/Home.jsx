import { categories } from '../data/posts.js'
import PostCard from './PostCard.jsx'

// ============================================================
// HOME — landing page: hero text, category filter pills, and
// the grid of post cards. Filtering/searching logic lives here
// since it only affects what's rendered on this view.
// ============================================================
export default function Home({ posts, searchQuery, activeCategory, onCategoryChange, onOpenPost, onToggleLike }) {
  // Filter by category first, then by search query (title/excerpt match)
  let filtered = posts.filter(p => activeCategory === 'All' || p.tag === activeCategory)
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase()
    filtered = filtered.filter(
      p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
    )
  }

  return (
    <section className="view" id="view-home">
      <div className="hero">
        <h1>
          Stories worth <em>slowing down</em> for.
        </h1>
        <p>A quiet corner for writing, thinking, and long-form ideas — no noise, just words.</p>
      </div>

      <div className="filter-row">
        {categories.map(cat => (
          <div
            key={cat}
            className={`filter-pill ${cat === activeCategory ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">No posts match your search.</div>
      ) : (
        <div className="post-grid">
          {filtered.map(post => (
            <PostCard key={post._id} post={post} onOpen={onOpenPost} onToggleLike={onToggleLike} />
          ))}
        </div>
      )}
    </section>
  )
}
