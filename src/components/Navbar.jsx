import { useState } from 'react'
import { Menu, X, Droplets } from 'lucide-react'
import AuthModal from './AuthModal'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-xl bg-slate-900/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-white font-semibold">
            <Droplets className="w-6 h-6 text-blue-400" />
            <span>PetraFlow</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-slate-200">
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#blog" className="hover:text-white transition">Blog</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => setAuthOpen(true)} className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white">Sign in</button>
            <button onClick={() => setAuthOpen(true)} className="px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition">Start free</button>
          </div>

          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/10 bg-slate-900/80">
            <div className="px-4 py-4 space-y-3 text-slate-200">
              <a href="#pricing" className="block">Pricing</a>
              <a href="#blog" className="block">Blog</a>
              <a href="#contact" className="block">Contact</a>
              <button onClick={() => setAuthOpen(true)} className="w-full px-4 py-2 rounded-md bg-blue-600 text-white">Sign in</button>
            </div>
          </div>
        )}
      </div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  )
}
