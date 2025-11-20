import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Pricing from './components/Pricing'
import Blog from './components/Blog'
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Pricing />
        <Blog />
        <Contact />
        <footer className="border-t border-white/10 py-10 text-center text-slate-400 bg-slate-950/90">
          <p>© {new Date().getFullYear()} PetraFlow • All rights reserved</p>
        </footer>
      </main>
    </div>
  )
}

export default App
