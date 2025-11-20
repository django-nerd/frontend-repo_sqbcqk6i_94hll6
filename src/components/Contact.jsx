import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' })
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')
    try {
      const res = await fetch(`${base}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to send')
      setStatus('Thanks! We will reach out shortly.')
      setForm({ name: '', email: '', company: '', subject: '', message: '' })
    } catch (e) {
      setStatus('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_0%_100%,rgba(56,189,248,0.15),transparent),radial-gradient(600px_300px_at_100%_100%,rgba(251,191,36,0.12),transparent)]" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Talk to our team</h2>
          <p className="text-slate-300 mt-3">Tell us about your operation and goals. We’ll tailor a plan to your production environment.</p>
          {status && <div className="mt-6 text-sm text-emerald-400">{status}</div>}
        </div>
        <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" required className="px-3 py-2 rounded-md bg-slate-900/80 border border-white/10 text-white outline-none" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required className="px-3 py-2 rounded-md bg-slate-900/80 border border-white/10 text-white outline-none" />
          </div>
          <input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="w-full px-3 py-2 rounded-md bg-slate-900/80 border border-white/10 text-white outline-none" />
          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="w-full px-3 py-2 rounded-md bg-slate-900/80 border border-white/10 text-white outline-none" />
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your message" rows="5" className="w-full px-3 py-2 rounded-md bg-slate-900/80 border border-white/10 text-white outline-none" />
          <button disabled={loading} className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 text-white font-semibold disabled:opacity-50">{loading ? 'Sending…' : 'Send message'}</button>
        </form>
      </div>
    </section>
  )
}
