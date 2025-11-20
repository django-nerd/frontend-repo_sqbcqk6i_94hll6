import { useEffect, useState } from 'react'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/blog`)
        const data = await res.json()
        setPosts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section id="blog" className="relative py-24 bg-slate-950/95">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Insights & updates</h2>
          <p className="text-slate-300 mt-3">Industry trends, product news, and operational best practices.</p>
        </div>

        {loading ? (
          <p className="text-center text-slate-300">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-slate-400">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <article key={p.id} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                <h3 className="text-white text-lg font-semibold line-clamp-2">{p.title}</h3>
                {p.excerpt && <p className="mt-2 text-slate-300 text-sm line-clamp-3">{p.excerpt}</p>}
                <div className="mt-4 text-xs text-slate-400">By {p.author} • {new Date(p.published_at).toLocaleDateString()}</div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
