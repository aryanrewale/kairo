import { useEffect, useRef, useState } from 'react'

/*
  HeroStage — pure CSS 3D hero sculpture
  - perspective stack of paper flashcards
  - floating chips, orbital ring, depth shadows
  - mouse parallax without any 3D library
*/

const HeroStage = () => {
  const wrapRef = useRef(null)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [tilt, setTilt] = useState({ x: 8, y: -14 })

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      setParallax({ x: px, y: py })
      setTilt({ x: 8 + py * -6, y: -14 + px * 10 })
    }
    const onLeave = () => {
      setParallax({ x: 0, y: 0 })
      setTilt({ x: 8, y: -14 })
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="relative w-full max-w-[560px] mx-auto lg:mx-0 aspect-[1.05] lg:aspect-[1.02] select-none"
      style={{ perspective: '1400px', perspectiveOrigin: '58% 45%' }}
    >
      {/* soft ambient glow behind */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[92%] h-[72%] rounded-[40px] blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(55% 70% at 50% 40%, rgba(217,61,26,0.16) 0%, rgba(217,61,26,0.06) 38%, transparent 72%), radial-gradient(42% 52% at 78% 68%, rgba(26,42,74,0.16) 0%, transparent 62%)',
          transform: `translate3d(${parallax.x * 14}px, ${parallax.y * 10}px, -60px)`,
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
        }}
      />

      {/* floor ellipse */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[78%] -translate-x-1/2 w-[78%] h-[22%] rounded-[50%] blur-[18px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(17,18,16,0.16) 0%, rgba(17,18,16,0.08) 32%, transparent 72%)',
          transform: `translate3d(${parallax.x * -10}px, 0, -20px) scale(${0.98 + Math.abs(parallax.x)*0.04})`,
        }}
      />

      {/* depth grid floor */}
      <div
        aria-hidden
        className="absolute inset-x-[4%] bottom-[6%] top-[56%] rounded-[28px] overflow-hidden pointer-events-none opacity-[0.55] dark:opacity-30"
        style={{
          background: `
            linear-gradient(to bottom, transparent 0%, rgba(17,18,16,0.035) 100%),
            linear-gradient(rgba(17,18,16,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(17,18,16,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 28px 28px, 28px 28px',
          transform: `rotateX(62deg) translateZ(-40px) translateY(${parallax.y * -8}px)`,
          transformOrigin: 'center bottom',
          maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
        }}
      />

      {/* main sculpture */}
      <div
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)'
        }}
      >
        {/* orbital ring */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[46%] w-[74%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            border: '1px dashed rgba(17,18,16,0.14)',
            transform: `rotateX(72deg) translateZ(-6px)`,
            maskImage: 'radial-gradient(ellipse at center, black 52%, transparent 71%)'
          }}
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-[46%] w-[54%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none border border-[rgba(217,61,26,0.22)]"
          style={{ transform: `rotateX(72deg) translateZ(4px)` }}
        />
        {/* small orbiting dots */}
        <div
          className="absolute left-[18%] top-[22%] w-2 h-2 rounded-full bg-[#D93D1A] shadow-[0_2px_10px_rgba(217,61,26,0.5)] pointer-events-none"
          style={{ transform: `translateZ(28px) translate3d(${parallax.x * 18}px, ${parallax.y * 12}px, 0)`, animation: 'floatA 5.2s ease-in-out infinite' }}
        />
        <div
          className="absolute right-[16%] bottom-[28%] w-[10px] h-[10px] rounded-full bg-[#1A2A4A] shadow-[0_4px_16px_rgba(26,42,74,0.35)] pointer-events-none hidden sm:block"
          style={{ transform: `translateZ(36px) translate3d(${parallax.x * -14}px, ${parallax.y * -10}px, 0)`, animation: 'floatB 6s ease-in-out infinite' }}
        />

        {/* CARD 3 — back */}
        <div
          className="absolute w-[62%] max-w-[320px] aspect-[1.45] rounded-[20px] overflow-hidden"
          style={{
            transform: `translate3d(${parallax.x * -10 + -10}px, ${parallax.y * -6 + -18}px, -28px) rotateZ(-2.8deg)`,
            background: '#F3EEE6',
            border: '1px solid rgba(17,18,16,0.07)',
            boxShadow: '0 12px 32px rgba(17,18,16,0.10), 0 1px 0 rgba(255,255,255,0.9) inset',
            transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            animation: 'floatCard3 6.5s ease-in-out infinite'
          }}
        >
          <div className="absolute inset-0 p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-[0.18em] font-semibold text-black/40">JLPT N4 • VOCAB</span>
              <span className="text-[10px] px-2 py-1 rounded-full bg-black text-white tracking-widest font-bold">03</span>
            </div>
            <div className="text-center">
              <div className="text-[42px] leading-none font-black tracking-tight text-black/90" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>勉強</div>
              <div className="mt-1 text-[11px] tracking-[0.2em] text-black/45 font-semibold">BENKYOU — TO STUDY</div>
            </div>
            <div className="h-[4px] w-full rounded-full bg-black/5 overflow-hidden">
              <div className="h-full w-[42%] bg-[#1A2A4A] rounded-full" />
            </div>
          </div>
          <div className="absolute inset-0 opacity-[0.035] mix-blend-multiply pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        </div>

        {/* CARD 2 — middle */}
        <div
          className="absolute w-[66%] max-w-[340px] aspect-[1.48] rounded-[20px] overflow-hidden"
          style={{
            transform: `translate3d(${parallax.x * 8 + 10}px, ${parallax.y * 6 + 6}px, 8px) rotateZ(1.6deg)`,
            background: 'white',
            border: '1px solid rgba(17,18,16,0.08)',
            boxShadow: '0 18px 40px rgba(17,18,16,0.12), 0 1px 0 rgba(255,255,255,0.95) inset, 0 -1px 0 rgba(17,18,16,0.06) inset',
            transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            animation: 'floatCard2 6s ease-in-out infinite'
          }}
        >
          {/* red top rule */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-[#D93D1A]" />
          <div className="absolute inset-0 p-[18px] sm:p-5 flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.14em] font-bold text-[#D93D1A] bg-[#D93D1A]/10 px-2 py-1 rounded-full">● KANJI • N3</div>
                <div className="mt-3 text-[11px] tracking-[0.16em] font-semibold text-black/45">KANJI COMPOUND</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#111210] text-white grid place-items-center text-[11px] font-bold">漢</div>
            </div>
            <div className="flex-1 flex items-center justify-center gap-3 sm:gap-5 mt-2">
              <div className="text-center">
                <div className="text-[44px] sm:text-[52px] leading-none font-black tracking-[-0.04em] text-[#111210]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>語</div>
                <div className="text-[10px] tracking-[0.18em] text-black/40 font-bold mt-1">GO • LANGUAGE</div>
              </div>
              <div className="w-px h-12 bg-black/10" />
              <div className="text-left">
                <div className="text-[11px] tracking-[0.14em] font-bold text-black/45">READINGS</div>
                <div className="text-[12px] font-semibold text-[#111210] leading-tight mt-1">音: ゴ<br/>訓: かたる</div>
                <div className="mt-2 inline-flex text-[10px] font-bold tracking-widest bg-[#F3EEE6] px-2 py-1 rounded-full">日本語 • LANGUAGE</div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5">
              <span className="text-[11px] font-semibold text-black/50">Mastered by 12,482 learners</span>
              <span className="text-[11px] font-black tracking-widest text-[#D93D1A]">→ REVEAL</span>
            </div>
          </div>
        </div>

        {/* CARD 1 — front */}
        <div
          className="absolute w-[62%] max-w-[316px] aspect-[1.5] rounded-[20px] overflow-hidden"
          style={{
            transform: `translate3d(${parallax.x * -6 + -2}px, ${parallax.y * -5 + 34}px, 42px) rotateZ(-1.2deg)`,
            background: '#121310',
            color: 'white',
            boxShadow: '0 24px 56px rgba(17,18,16,0.22), 0 1px 0 rgba(255,255,255,0.08) inset',
            transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            animation: 'floatCard1 5.6s ease-in-out infinite'
          }}
        >
          <div className="absolute inset-0 opacity-[0.09]" style={{ backgroundImage: `radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 70% 60%, white, transparent), radial-gradient(1px 1px at 40% 80%, white, transparent)` }} />
          <div className="relative h-full p-5 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-[0.18em] font-bold text-white/55">HIRAGANA • あ行</span>
              <span className="w-2 h-2 rounded-full bg-[#D93D1A] shadow-[0_0_12px_rgba(217,61,26,0.7)] animate-pulse" />
            </div>
            <div className="flex-1 grid place-items-center text-center mt-1">
              <div>
                <div className="text-[64px] leading-none font-black" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>あ</div>
                <div className="mt-2 inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded-full text-[12px] font-bold tracking-[0.14em]">A — as in “ah”</div>
                <div className="mt-3 flex justify-center gap-1.5">
                  {['あ','い','う','え','お'].map((k,i)=> (
                    <span key={k} className={`w-7 h-7 grid place-items-center rounded-full text-[12px] font-bold border ${i===0 ? 'bg-white text-black border-white' : 'bg-white/10 text-white/70 border-white/15'}`}>{k}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-white/60">
              <span>Stroke order • 3 strokes</span>
              <span className="text-white font-bold">↺ FLIP</span>
            </div>
          </div>
          {/* edge highlight */}
          <div className="absolute inset-0 rounded-[20px] pointer-events-none" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.4)' }} />
        </div>

        {/* floating chips — translateZ makes them hover above */}
        <div
          className="absolute left-[2%] top-[10%] hidden sm:flex items-center gap-2.5 bg-white dark:bg-zinc-900 rounded-full pl-1.5 pr-3 py-1.5 shadow-[0_10px_28px_rgba(17,18,16,0.14)] border border-black/5 pointer-events-none"
          style={{ transform: `translateZ(68px) translate3d(${parallax.x * 22}px, ${parallax.y * 16}px, 0)`, animation: 'floatA 4.8s ease-in-out infinite' }}
        >
          <span className="w-7 h-7 rounded-full bg-[#D93D1A] grid place-items-center text-white text-[11px] font-black">✓</span>
          <span className="text-[12px] font-bold tracking-tight text-zinc-900 dark:text-white">Streak 14 days</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div
          className="absolute right-[1%] top-[12%] hidden sm:flex items-center gap-2 bg-[#111210] text-white rounded-full px-3 py-2 shadow-[0_12px_32px_rgba(17,18,16,0.2)] pointer-events-none"
          style={{ transform: `translateZ(56px) translate3d(${parallax.x * -18}px, ${parallax.y * -12}px, 0)`, animation: 'floatB 5.4s ease-in-out infinite 0.6s' }}
        >
          <span className="w-6 h-6 rounded-full bg-white text-black grid place-items-center text-[10px] font-black">あ</span>
          <span className="text-[12px] font-bold">+50 XP</span>
        </div>

        <div
          className="absolute left-[6%] bottom-[8%] hidden sm:flex items-center gap-3 bg-white dark:bg-zinc-900 rounded-2xl px-3 py-2.5 shadow-[0_16px_40px_rgba(17,18,16,0.16)] border border-black/5 pointer-events-none"
          style={{ transform: `translateZ(52px) translate3d(${parallax.x * 16}px, ${parallax.y * 10}px, 0)`, animation: 'floatA 5.8s ease-in-out infinite 0.3s' }}
        >
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face" alt="" className="w-8 h-8 rounded-full object-cover" />
          <div className="leading-tight">
            <div className="text-[11px] font-bold tracking-tight">Mika • N2 passed</div>
            <div className="text-[11px] text-black/50 dark:text-white/60">“Kairō made kanji stick.”</div>
          </div>
          <span className="ml-1 text-[10px] font-black tracking-widest bg-black text-white px-2 py-1 rounded-full">★ 4.9</span>
        </div>

        <div
          className="absolute right-[4%] bottom-[14%] hidden lg:flex flex-col items-center gap-1 bg-[#F3EEE6] rounded-2xl px-3 py-3 shadow-[0_12px_28px_rgba(17,18,16,0.12)] border border-black/5 pointer-events-none"
          style={{ transform: `translateZ(48px) translate3d(${parallax.x * -12}px, ${parallax.y * 8}px, 0)`, animation: 'floatB 4.6s ease-in-out infinite' }}
        >
          <div className="text-[10px] tracking-[0.16em] font-bold text-black/50">TODAY</div>
          <div className="text-[20px] font-black leading-none">27<span className="text-[12px] font-bold text-black/40">/30</span></div>
          <div className="w-14 h-1.5 rounded-full bg-black/10 overflow-hidden">
            <div className="h-full w-[90%] bg-[#1A2A4A] rounded-full" />
          </div>
          <div className="text-[10px] font-bold tracking-widest text-[#1A2A4A]">CARDS DUE</div>
        </div>
      </div>

      <style>{`
        @keyframes floatCard1 { 0%,100% { transform: translate3d(-2px, 34px, 42px) rotateZ(-1.2deg) } 50% { transform: translate3d(-2px, 26px, 42px) rotateZ(-0.6deg) } }
        @keyframes floatCard2 { 0%,100% { transform: translate3d(10px, 6px, 8px) rotateZ(1.6deg) } 50% { transform: translate3d(10px, -2px, 8px) rotateZ(1.0deg) } }
        @keyframes floatCard3 { 0%,100% { transform: translate3d(-10px, -18px, -28px) rotateZ(-2.8deg) } 50% { transform: translate3d(-10px, -24px, -28px) rotateZ(-2.2deg) } }
        @keyframes floatA { 0%,100% { transform: translateZ(68px) translateY(0) } 50% { transform: translateZ(68px) translateY(-6px) } }
        @keyframes floatB { 0%,100% { transform: translateZ(56px) translateY(0) } 50% { transform: translateZ(56px) translateY(-8px) } }
      `}</style>
    </div>
  )
}

export default HeroStage
