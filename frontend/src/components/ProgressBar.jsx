import { useState, useEffect } from 'react'

// ============================================================
// PROGRESS BAR — thin line at the top of the page that fills
// based on scroll position. Purely visual, no props needed.
// ============================================================
export default function ProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll) // cleanup on unmount
  }, [])

  return <div id="progress-bar" style={{ width: `${progress}%` }} />
}
