import { useState } from 'react'

// ============================================================
// WRITE VIEW — form for creating a new post.
// Local state holds the form fields + validation errors.
// On submit, calls onPublish (passed from App) with the data.
// ============================================================
export default function WriteView({ onPublish }) {
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('Essay')
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState({ title: false, body: false })

  function handleSubmit(e) {
    e.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedBody = body.trim()

    const newErrors = {
      title: !trimmedTitle,
      body: !trimmedBody,
    }
    setErrors(newErrors)

    if (newErrors.title || newErrors.body) return // stop if invalid

    onPublish({ title: trimmedTitle, tag, body: trimmedBody })

    // reset form after successful publish
    setTitle('')
    setTag('Essay')
    setBody('')
    setErrors({ title: false, body: false })
  }

  return (
    <section className="view" id="view-write">
      <div className="editor-wrap">
        <h2>Write a new post</h2>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              placeholder="Give your post a title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            {errors.title && <div className="error-text">Enter a title first.</div>}
          </div>

          <div className="field">
            <label>Category</label>
            <select value={tag} onChange={e => setTag(e.target.value)}>
              <option>Essay</option>
              <option>Tech</option>
              <option>Travel</option>
              <option>Life</option>
            </select>
          </div>

          <div className="field">
            <label>Content</label>
            <textarea
              placeholder="Start writing..."
              value={body}
              onChange={e => setBody(e.target.value)}
            />
            {errors.body && <div className="error-text">Write something before publishing.</div>}
          </div>

          <button type="submit" className="btn btn-primary">
            Publish post
          </button>
        </form>
      </div>
    </section>
  )
}
