import { useEffect, useState } from 'react'

export default function Pricing() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/pricing`)
        const data = await res.json()
        setPlans(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section id="pricing" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_20%_0%,rgba(56,189,248,0.15),transparent),radial-gradient(800px_400px_at_80%_0%,rgba(251,191,36,0.12),transparent)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Simple, transparent pricing</h2>
          <p className="text-slate-300 mt-3">Scale from pilot to enterprise without friction.</p>
        </div>

        {loading ? (
          <p className="text-center text-slate-300">Loading plans...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div key={p.id} className={`rounded-2xl border ${p.most_popular ? 'border-cyan-400/40' : 'border-white/10'} bg-white/5 backdrop-blur-xl p-6 relative`}>
                {p.most_popular && (
                  <span className="absolute -top-3 left-6 px-3 py-1 text-xs rounded-full bg-cyan-500 text-white">Most popular</span>
                )}
                <h3 className="text-white text-xl font-semibold">{p.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  {p.name === 'Enterprise' ? (
                    <span className="text-3xl font-bold text-amber-300">Custom</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-white">${p.price_monthly}</span>
                      <span className="text-slate-300">/mo</span>
                    </>
                  )}
                </div>
                <ul className="mt-6 space-y-2 text-slate-200 text-sm">
                  {p.features?.map((f, idx) => (
                    <li key={idx} className="flex gap-2 items-start"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" /> {f}</li>
                  ))}
                </ul>
                <button className="mt-6 w-full px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 text-white font-medium">Get started</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
