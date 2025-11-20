import { useState } from 'react'

export default function AuthModal({ open, onClose }) {
  const [mode, setMode] = useState('signin') // signin | signup
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    company: ''
  })

  if (!open) return null

  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const url = mode === 'signin' ? `${base}/api/auth/signin` : `${base}/api/auth/signup`
      const body = mode === 'signin'
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password, company: form.company }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || 'Request failed')
      }

      const data = await res.json()
      setSuccess(`Welcome, ${data.name}! Token: ${data.token.slice(0,8)}…`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-md mx-auto rounded-2xl bg-slate-900 border border-white/10 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 p-1 rounded-full bg-white/5 border border-white/10">
            <button onClick={() => setMode('signin')} className={`px-3 py-1 text-sm rounded-full ${mode==='signin'?'bg-gradient-to-r from-blue-600 to-cyan-600 text-white':'text-slate-300'}`}>Sign in</button>
            <button onClick={() => setMode('signup')} className={`px-3 py-1 text-sm rounded-full ${mode==='signup'?'bg-gradient-to-r from-blue-600 to-cyan-600 text-white':'text-slate-300'}`}>Create account</button>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white">✕</button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm text-slate-300 mb-1">Full name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 rounded-md bg-slate-800 border border-white/10 text-white outline-none" />
            </div>
          )}
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 rounded-md bg-slate-800 border border-white/10 text-white outline-none" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full px-3 py-2 rounded-md bg-slate-800 border border-white/10 text-white outline-none" />
          </div>
          {mode === 'signup' && (
            <div>
              <label className="block text-sm text-slate-300 mb-1">Company (optional)</label>
              <input name="company" value={form.company} onChange={handleChange} className="w-full px-3 py-2 rounded-md bg-slate-800 border border-white/10 text-white outline-none" />
            </div>
          )}

          {error && <div className="text-red-400 text-sm">{error}</div>}
          {success && <div className="text-emerald-400 text-sm">{success}</div>}

          <button disabled={loading} className="w-full mt-2 px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 text-white font-semibold disabled:opacity-50">
            {loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  )
}
