import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/AT0hajj4qmQeXO1J/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950 pointer-events-none" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Real-time oil analytics SaaS
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-200 to-amber-200 drop-shadow-2xl">
            Liquidity meets clarity.
            <br />
            Optimize your oil operations.
          </h1>
          <p className="mt-6 text-lg text-slate-200/90 max-w-xl">
            PetraFlow helps operators monitor production, forecast demand, and reduce downtime with an AI-driven platform designed for the energy industry.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#pricing" className="px-6 py-3 rounded-md bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition">View pricing</a>
            <a href="#contact" className="px-6 py-3 rounded-md bg-white/10 text-white border border-white/20 hover:bg-white/15 transition">Talk to sales</a>
          </div>
        </div>
      </div>
    </section>
  )
}
