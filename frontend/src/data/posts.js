// ============================================================
// DUMMY DATA — placeholder posts.
// Once the backend is ready, this file won't be needed —
// instead we'll fetch posts from: GET http://localhost:5000/api/posts
// ============================================================
const initialPosts = [
  {
    id: 1,
    tag: "Tech",
    title: "Why simple systems age better",
    excerpt: "Complexity feels productive in the moment, but it's the quiet, boring systems that survive years later.",
    author: "Aarav Mehta",
    date: "Aug 12, 2026",
    views: 482,
    likes: 34,
    liked: false,
    body: "<p>Every engineer has, at some point, fallen in love with a clever solution. Clever solutions are fun to write and satisfying to explain. But cleverness has a cost that shows up much later — when someone else has to read the code at 2am during an outage.</p><p>Simple systems don't need explaining. They read the way they behave. That alone is worth more than almost any performance gain.</p>",
    comments: [{ name: "Nisha R.", text: "This resonates a lot, especially the 2am outage line." }],
  },
  {
    id: 2,
    tag: "Life",
    title: "The discipline of finishing things",
    excerpt: "Starting is easy. Staying with something past the point of excitement is where real growth happens.",
    author: "Isha Kapoor",
    date: "Aug 10, 2026",
    views: 301,
    likes: 21,
    liked: false,
    body: "<p>Most projects don't die from bad ideas. They die in the middle, right after the initial excitement fades and before the results show up.</p><p>Finishing is a skill separate from starting, and it's the one that actually compounds.</p>",
    comments: [],
  },
  {
    id: 3,
    tag: "Travel",
    title: "Notes from a slow week in the hills",
    excerpt: "No itinerary, no plan — just mornings with tea and evenings watching the fog roll in.",
    author: "Rohan Das",
    date: "Aug 6, 2026",
    views: 156,
    likes: 12,
    liked: false,
    body: "<p>We didn't plan much for this trip, and that turned out to be the entire point. Some of the best days had nothing scheduled beyond a walk and a cup of tea on the balcony.</p>",
    comments: [],
  },
]

export const categories = ["All", "Essay", "Tech", "Travel", "Life"]
export default initialPosts
