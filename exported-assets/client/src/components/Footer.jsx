import { Link, useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const currentYear = new Date().getFullYear()

  if (!isHomePage) {
    return (
      <footer className="mt-10 border-t border-black/5 dark:border-white/5 bg-white dark:bg-zinc-900">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#111210] dark:bg-white text-white dark:text-black grid place-items-center text-[11px] font-black" style={{ fontFamily: "'Fraunces', serif" }}>K</span>
            <span className="text-[13px] font-bold tracking-tight">KAIRØ — Japanese Atelier</span>
          </div>
          <p className="text-[12px] font-semibold mono tracking-[0.08em] text-black/40 dark:text-white/40">© {currentYear} KAIRØ. Crafted for learners.</p>
        </div>
      </footer>
    )
  }

  return (
    <footer className="relative mt-10 overflow-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=JetBrains+Mono:wght@500&display=swap');`}</style>

      {/* footplate slab */}
      <div className="relative bg-[#0F1110] text-zinc-100">
        {/* top bevel highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
        {/* soft vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(900px 500px at 18% 0%, rgba(217,61,26,0.14), transparent 60%), radial-gradient(700px 500px at 88% 8%, rgba(26,42,74,0.14), transparent 60%)' }} />

        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-6">
          {/* top row: brand + newsletter */}
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 items-start">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white text-black grid place-items-center shadow-[0_6px_16px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.8)]">
                  <span className="text-[12px] font-black" style={{ fontFamily: "'Fraunces', serif" }}>K</span>
                </div>
                <div>
                  <div className="text-[20px] font-black tracking-[-0.04em] leading-none" style={{ fontFamily: "'Fraunces', serif" }}>KAIRØ</div>
                  <div className="text-[11px] tracking-[0.14em] font-bold mono text-white/50 -mt-0.5">JAPANESE ATELIER • EST. 2024</div>
                </div>
              </div>
              <p className="mt-4 max-w-[48ch] text-[14px] leading-[1.6] font-medium text-white/60">
                Tactile Japanese, built like a craft tool. Flashcards with depth, exams that feel real, and corrections from people — not just bots.
              </p>
              <div className="mt-5 flex items-center gap-2">
                {[
                  { label: 'IG', href: '#' },
                  { label: 'WA', href: '#' },
                  { label: 'FB', href: '#' },
                  { label: '𝕏', href: '#' },
                ].map((s) => (
                  <a key={s.label} href={s.href} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/10 grid place-items-center text-[12px] font-black transition">
                    {s.label}
                  </a>
                ))}
                <span className="ml-2 text-[11px] mono tracking-[0.12em] font-bold text-white/40">FOLLOW THE ATELIER</span>
              </div>
            </div>

            {/* 3D mini form */}
            <div className="relative rounded-[22px] bg-white text-[#111210] p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.9)] border border-black/5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[13px] font-black tracking-tight">Get the study sheet</div>
                  <div className="text-[12px] font-medium text-black/55 leading-tight">One email / week. No spam. Unsubscribe anytime.</div>
                </div>
                <span className="hidden sm:inline-flex text-[11px] mono font-bold tracking-[0.08em] bg-[#111210] text-white px-2.5 py-1 rounded-full">3D DROP</span>
              </div>
              <form onSubmit={(e)=> e.preventDefault()} className="mt-4 flex gap-2">
                <input placeholder="you@email.com" className="flex-1 rounded-full bg-[#F3EEE6] border border-black/5 px-4 py-3 text-[13px] font-semibold placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#D93D1A]/20" />
                <button className="shrink-0 rounded-full bg-[#D93D1A] text-white px-5 py-3 text-[13px] font-black hover:brightness-[1.05] active:translate-y-px transition shadow-[0_6px_16px_rgba(217,61,26,0.28)]">Join</button>
              </form>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold mono tracking-[0.06em] text-black/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 12,482 learners on the list
              </div>
              {/* depth shadow */}
              <div className="absolute left-4 right-4 -bottom-3 h-6 bg-black/20 blur-[14px] rounded-full -z-10 hidden sm:block" />
            </div>
          </div>

          {/* links grid */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 border-t border-white/10 pt-8">
            <div>
              <h4 className="text-[11px] tracking-[0.14em] font-black mono text-white/40">LEARN</h4>
              <ul className="mt-3 space-y-2.5 text-[13px] font-semibold">
                <li><Link to="/services" className="text-white/70 hover:text-white transition">Language Learning</Link></li>
                <li><Link to="/services" className="text-white/70 hover:text-white transition">JLPT Preparation</Link></li>
                <li><Link to="/services" className="text-white/70 hover:text-white transition">Flashcards & Quizzes</Link></li>
                <li><Link to="/services" className="text-white/70 hover:text-white transition">Live Chat Exchange</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] tracking-[0.14em] font-black mono text-white/40">SUPPORT</h4>
              <ul className="mt-3 space-y-2.5 text-[13px] font-semibold">
                <li><Link to="/help" className="text-white/70 hover:text-white transition">Help Center</Link></li>
                <li><Link to="/help" className="text-white/70 hover:text-white transition">FAQ</Link></li>
                <li><Link to="/help" className="text-white/70 hover:text-white transition">Contact Us</Link></li>
                <li><Link to="/about-us" className="text-white/70 hover:text-white transition">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] tracking-[0.14em] font-black mono text-white/40">SYSTEM</h4>
              <ul className="mt-3 space-y-2.5 text-[13px] font-semibold">
                <li><span className="text-white/70">Spaced Repetition</span></li>
                <li><span className="text-white/70">Adaptive Quizzes</span></li>
                <li><span className="text-white/70">AI Tutor Paths</span></li>
                <li><span className="text-white/70">Progress Analytics</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] tracking-[0.14em] font-black mono text-white/40">ATELIER</h4>
              <div className="mt-3 rounded-2xl bg-white/10 border border-white/10 p-4">
                <div className="text-[12px] font-bold leading-tight text-white">Made with ❤️ for learners worldwide</div>
                <div className="text-[12px] leading-[1.5] font-medium text-white/60 mt-1">Paper, ink, wood and depth. Built to be remembered — like the language itself.</div>
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
            <div className="flex flex-wrap items-center justify-center gap-3 text-[12px] font-semibold">
              <span className="text-white/50">© {currentYear} KAIRØ. All rights reserved.</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/20" />
              <Link to="/privacy-policy" className="text-white/70 hover:text-white transition">Privacy Policy</Link>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <Link to="/terms-of-service" className="text-white/70 hover:text-white transition">Terms of Service</Link>
            </div>
            <div className="flex items-center gap-2 text-[11px] mono tracking-[0.12em] font-bold text-white/40">
              <span className="w-2 h-2 rounded-full bg-[#D93D1A] shadow-[0_0_10px_rgba(217,61,26,0.6)]" /> TOKYO • REMOTE • • •
            </div>
          </div>
        </div>

        {/* bottom depth edge */}
        <div className="h-[10px] bg-[#0A0A0A] border-t border-white/5" />
      </div>
    </footer>
  )
}

export default Footer
