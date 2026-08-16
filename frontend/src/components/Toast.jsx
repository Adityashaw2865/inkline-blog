// ============================================================
// TOAST — small bottom-of-screen notification.
// Shown whenever `message` is a non-empty string (App controls timing).
// ============================================================
export default function Toast({ message }) {
  return <div id="toast" className={message ? 'show' : ''}>{message}</div>
}
