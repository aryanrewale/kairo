import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Sparkles, ArrowUpRight, Check, Layers, MessageCircle, Target, BookOpen, Brain, Users, Zap } from 'lucide-react'
import VideoDemo from '../components/VideoDemo'
import TiltCard from '../components/3d/TiltCard'
import HeroStage from '../components/3d/HeroStage'

const Home = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const features = [
    {
      icon: <BookOpen className="h-[22px] w-[22px]" />,
      kicker: '01 — SRS',
      title: 'Interactive Flashcards',
      description: 'Paper-feel cards with spaced repetition that actually sticks. Kanji, kana and vocab — engineered for recall.',
      accent: '#D93D1A',
      meta: '1,200+ decks'
    },
    {
      icon: <Brain className="h-[22px] w-[22px]" />,
      kicker: '02 — ADAPTIVE',
      title: 'Adaptive Quizzes',
      description: 'Quizzes that reshape around your mistakes and push your weak spots until they’re strong.',
      accent: '#1A2A4A',
      meta: 'Instant breakdown'
    },
    {
      icon: <Target className="h-[22px] w-[22px]" />,
      kicker: '03 — EXAM',
      title: 'JLPT & MEXT Exams',
      description: 'Authentic mock exams modelled on the real tests. Timed, scored, and reviewable by skill.',
      accent: '#0E7A6B',
      meta: 'N5 → N1'
    },
    {
      icon: <MessageCircle className="h-[22px] w-[22px]" />,
      kicker: '04 — EXCHANGE',
      title: 'Language Exchange Chat',
      description: 'Practice with natives and peers. Corrections, voice, and everyday phrasing — not textbook-only.',
      accent: '#B45309',
      meta: 'Live • 24h'
    },
    {
      icon: <Users className="h-[22px] w-[22px]" />,
      kicker: '05 — COMMUNITY',
      title: 'Global Community',
      description: 'Study rooms, challenges and leaderboards. Stay accountable with people on the same path.',
      accent: '#6D28D9',
      meta: '50K+ learners'
    },
    {
      icon: <Zap className="h-[22px] w-[22px]" />,
      kicker: '06 — AI',
      title: 'AI-Powered Paths',
      description: 'Your own learning path. AI curates what’s next based on retention, not streaks.',
      accent: '#111210',
      meta: 'Personal tutor'
    }
  ]

  const stats = [
    { n: '50K+', l: 'Active learners', sub: '30-day active' },
    { n: '1M+', l: 'Flashcards created', sub: 'community decks' },
    { n: '100K+', l: 'Chat messages / day', sub: 'avg. 4.8★ rated' },
    { n: '95%', l: 'Pass rate', sub: 'JLPT N5–N3' }
  ]

  return (
    <>
      {/* page-wide 3d tokens + fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,ital,wght@9..144,0,700;9..144,1,700&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500&family=Noto+Sans+JP:wght@700;900&display=swap');
        .display { font-family: 'Fraunces', serif; letter-spacing: -0.04em; }
        .sans { font-family: 'Instrument Sans', 'Inter', system-ui, sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .paper { background: #FFFCF8; }
        .ink { color: #111210; }
        .hairline { border-color: rgba(17,18,16,0.08); }
        .soft-shadow { box-shadow: 0 1px 1px rgba(17,18,16,0.04), 0 12px 28px rgba(17,18,16,0.08), 0 28px 64px rgba(17,18,16,0.08); }
        .extruded-btn { box-shadow: 0 1px 0 rgba(255,255,255,0.9) inset, 0 -8px 0 rgba(17,18,16,0.12), 0 12px 24px rgba(17,18,16,0.14); }
        .extruded-btn:active { transform: translateY(4px); box-shadow: 0 1px 0 rgba(255,255,255,0.8) inset, 0 -4px 0 rgba(17,18,16,0.12), 0 6px 12px rgba(17,18,16,0.12); }
        .extruded-secondary { box-shadow: 0 1px 0 rgba(255,255,255,0.95) inset, 0 -6px 0 #E8E6E1, 0 10px 22px rgba(17,18,16,0.08), 0 0 0 1px rgba(17,18,16,0.08) inset; }
        .extruded-secondary:active { transform: translateY(3px); box-shadow: 0 1px 0 rgba(255,255,255,0.95) inset, 0 -3px 0 #E8E6E1, 0 6px 12px rgba(17,18,16,0.08); }
        .grid-dots { background-image: radial-gradient(rgba(17,18,16,0.09) 1px, transparent 1px); background-size: 18px 18px; }
        @keyframes marq { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      `}</style>

      <div className="min-h-screen bg-[#FFFCF8] dark:bg-[#0F1110] text-[#111210] dark:text-zinc-100 sans selection:bg-[#D93D1A]/20">
        {/* HERO */}
        <section className="relative overflow-hidden">
          {/* paper base */}
          <div className="absolute inset-0 bg-[#FFFCF8] dark:bg-[#0F1110]" />
          {/* subtle dots */}
          <div className="absolute inset-0 grid-dots opacity-[0.45] dark:opacity-[0.06] pointer-events-none" />
          {/* top vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(900px 500px at 18% 18%, rgba(217,61,26,0.08), transparent 60%), radial-gradient(900px 600px at 88% 12%, rgba(26,42,74,0.08), transparent 62%)' }} />
          {/* floor perspective - thin */}
          <div className="absolute left-0 right-0 bottom-0 h-[28%] pointer-events-none hidden lg:block" style={{
            background: 'linear-gradient(to bottom, transparent, rgba(17,18,16,0.04))',
            maskImage: 'linear-gradient(to bottom, transparent, black 40%)'
          }} />

          {/* large watermark kanji with 3d parallax */}
          <div
            aria-hidden
            className="absolute -top-10 right-[-6%] hidden lg:block pointer-events-none select-none"
            style={{
              transform: `translateY(${scrollY * 0.08}px) rotate(-6deg)`,
              opacity: 0.055,
            }}
          >
            <div className="display text-[420px] leading-none font-black" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>漢字</div>
          </div>

          <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* mini top rule */}
            <div className="hidden sm:flex items-center justify-between pt-6 sm:pt-8 text-[11px] tracking-[0.16em] font-semibold mono text-black/40 dark:text-white/40">
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D93D1A] animate-pulse" />
                EST. 2024 • TOKYO / REMOTE
              </span>
              <span className="hidden md:inline-flex items-center gap-6">
                <span>JLPT N5 → N1</span>
                <span>•</span>
                <span>SPACED REPETITION • AI TUTOR</span>
              </span>
            </div>

            <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-6 items-center pt-10 lg:pt-10 pb-10 lg:pb-16">
              {/* copy */}
              <div className="relative">
                {/* badge - tactile pill with extrusion */}
                <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 pl-1.5 pr-3 py-1.5 soft-shadow">
                  <span className="inline-flex items-center gap-1.5 bg-[#111210] text-white rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[0.08em]">
                    <Sparkles className="w-3.5 h-3.5" />
                    NEW
                  </span>
                  <span className="text-[13px] font-semibold tracking-tight">Trusted by 50,000+ learners worldwide</span>
                  <span className="hidden sm:inline-flex w-6 h-6 rounded-full bg-[#F3EEE6] dark:bg-zinc-800 items-center justify-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <h1 className="display mt-6 sm:mt-7 text-[42px] sm:text-[54px] lg:text-[74px] leading-[0.88] font-black">
                  <span className="block text-[#111210] dark:text-white">Master</span>
                  <span className="block text-[#D93D1A] italic font-bold pr-2">Japanese</span>
                  <span className="block text-[#111210] dark:text-white font-[700] tracking-[-0.05em] text-[32px] sm:text-[44px] lg:text-[52px] mt-1">the modern way.</span>
                </h1>

                <p className="mt-5 max-w-[56ch] text-[17px] sm:text-[19px] leading-[1.55] text-black/60 dark:text-white/60 font-medium">
                  Not another flat flashcard app. <span className="text-[#111210] dark:text-white font-semibold underline decoration-[#D93D1A]/30 underline-offset-4">Tactile decks, 3D retention,</span> and real conversations — everything you need to become fluent, built like a craft tool.
                </p>

                {/* actions */}
                <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    to="/register"
                    className="relative inline-flex items-center justify-center gap-2 rounded-full bg-[#D93D1A] text-white px-7 sm:px-8 py-[14px] sm:py-[15px] text-[15px] font-bold tracking-tight extruded-btn transition-all hover:brightness-[1.05]"
                  >
                    Start Learning Free
                    <span className="w-7 h-7 rounded-full bg-white text-[#D93D1A] grid place-items-center">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-white dark:bg-zinc-900 px-7 py-[14px] text-[15px] font-bold tracking-tight text-[#111210] dark:text-white extruded-secondary transition-all hover:bg-[#FFFCF8]"
                  >
                    <span className="w-9 h-9 rounded-full bg-[#111210] dark:bg-white text-white dark:text-black grid place-items-center">
                      <Play className="w-4 h-4 ml-0.5" />
                    </span>
                    Watch 40s demo
                    <span className="hidden sm:inline text-black/40 dark:text-white/40 font-semibold">— no sign-up</span>
                  </button>
                </div>

                {/* proof row - avatars with depth */}
                <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {[
                        'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=80&h=80&fit=crop&crop=face',
                        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=face',
                        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&crop=face',
                        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
                      ].map((src,i)=> (
                        <img key={i} src={src} alt="" className="w-9 h-9 rounded-full object-cover border-[3px] border-white dark:border-zinc-900 shadow-[0_4px_12px_rgba(0,0,0,0.12)]" style={{ zIndex: 4 - i }} />
                      ))}
                      <span className="w-9 h-9 rounded-full bg-[#111210] text-white grid place-items-center text-[11px] font-black border-[3px] border-white dark:border-zinc-900 shadow-[0_4px_12px_rgba(0,0,0,0.12)]">+2k</span>
                    </div>
                    <div className="ml-3 leading-tight">
                      <div className="flex items-center gap-1 text-amber-500">
                        {'★★★★★'.split('').map((s,i)=><span key={i} className="text-[13px]">★</span>)}
                        <span className="ml-1 text-[13px] font-black text-[#111210] dark:text-white">4.9/5</span>
                      </div>
                      <div className="text-[12px] font-semibold text-black/50 dark:text-white/50">from 3,842 reviews</div>
                    </div>
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-black/10 dark:bg-white/10" />
                  <div className="flex items-center gap-2 text-[12px] font-bold tracking-[0.08em] mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    1,247 learning right now
                  </div>
                </div>

                {/* kana bar — 3D letterpress */}
                <div className="mt-8 sm:mt-10">
                  <div className="inline-flex flex-wrap gap-2 sm:gap-2.5">
                    {[
                      { k: 'あ', l: 'A' },
                      { k: 'い', l: 'I' },
                      { k: 'う', l: 'U' },
                      { k: 'え', l: 'E' },
                      { k: 'お', l: 'O' },
                    ].map((it, idx) => (
                      <div
                        key={it.k}
                        className="group relative w-[64px] sm:w-[72px] h-[64px] sm:h-[72px] rounded-2xl bg-white dark:bg-zinc-900 border border-black/[0.07] dark:border-white/10 grid place-items-center soft-shadow cursor-pointer will-change-transform hover:-translate-y-1 transition-all"
                        style={{ transform: `translateZ(0) rotate(${idx===2? '1.2deg' : idx===0? '-1deg' : '0deg'})` }}
                      >
                        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.06)' }} />
                        <div className="text-center">
                          <div className="text-[26px] leading-none font-black" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>{it.k}</div>
                          <div className="text-[10px] tracking-[0.14em] font-bold mono text-black/40 dark:text-white/40">{it.l}</div>
                        </div>
                        <div className="absolute -bottom-1 left-3 right-3 h-3 bg-black/10 blur-[8px] rounded-full -z-10 opacity-60 group-hover:opacity-80 transition" />
                      </div>
                    ))}
                    <div className="hidden sm:grid place-items-center px-4 rounded-full bg-[#111210] text-white text-[12px] font-bold tracking-[0.12em] mono">
                      HIRAGANA →
                    </div>
                  </div>
                </div>
              </div>

              {/* stage */}
              <div className="relative lg:pl-4">
                <HeroStage />
                {/* caption under stage - editorial */}
                <div className="mt-2 lg:mt-1 flex items-center justify-center lg:justify-start gap-3 text-[11px] font-semibold tracking-[0.12em] mono text-black/40 dark:text-white/40">
                  <span className="w-8 h-px bg-black/15 dark:bg-white/15" />
                  REAL CARDS • REAL DEPTH • REAL RETENTION
                </div>
              </div>
            </div>

            {/* bottom marquee rule - not infinite AI gradient, but typeset ticker */}
            <div className="relative overflow-hidden rounded-full border hairline bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md">
              <div className="absolute inset-0 grid-dots opacity-[0.22] pointer-events-none" />
              <div className="relative flex gap-8 py-2.5 whitespace-nowrap will-change-transform" style={{ animation: 'marq 26s linear infinite' }}>
                {[...Array(2)].map((_,dup)=>(
                  <span key={dup} className="flex items-center gap-8 mono text-[11px] tracking-[0.16em] font-bold text-black/55 dark:text-white/55">
                    <span>漢字 • KANJI</span><span className="w-1 h-1 rounded-full bg-[#D93D1A]" />
                    <span>ひらがな • HIRAGANA</span><span className="w-1 h-1 rounded-full bg-black/20" />
                    <span>カタカナ • KATAKANA</span><span className="w-1 h-1 rounded-full bg-black/20" />
                    <span>JLPT N5 → N1</span><span className="w-1 h-1 rounded-full bg-black/20" />
                    <span>AI TUTOR</span><span className="w-1 h-1 rounded-full bg-black/20" />
                    <span>SPACED REPETITION</span><span className="w-1 h-1 rounded-full bg-[#D93D1A]" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STATS — 3D podium tiles */}
        <section className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:mt-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="relative rounded-[20px] bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 overflow-hidden"
                style={{
                  boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 8px 20px rgba(17,18,16,0.06), 0 20px 40px rgba(17,18,16,0.06)',
                  transform: `translateY(${i%2===0? '0' : '6px'})`
                }}
              >
                {/* top rule color */}
                <div className="absolute top-0 inset-x-0 h-[3px]" style={{ background: i===0? '#D93D1A' : i===1? '#1A2A4A' : i===2? '#0E7A6B' : '#B45309' }} />
                <div className="p-5 sm:p-6">
                  <div className="display text-[30px] sm:text-[36px] leading-none font-black tracking-tight">{s.n}</div>
                  <div className="mt-1 text-[13px] sm:text-[14px] font-bold tracking-tight leading-tight">{s.l}</div>
                  <div className="text-[12px] font-semibold text-black/40 dark:text-white/40 mono tracking-[0.06em]">{s.sub}</div>
                  {/* tiny 3d inset bar */}
                  <div className="mt-4 h-1.5 rounded-full bg-black/[0.06] dark:bg-white/10 overflow-hidden p-0.5">
                    <div className="h-full rounded-full" style={{ width: `${78 - i*9}%`, background: i===0? '#D93D1A' : i===1? '#1A2A4A' : i===2? '#0E7A6B' : '#B45309', boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset' }} />
                  </div>
                </div>
                {/* paper grain */}
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES — 3D grid */}
        <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.16em] font-bold mono text-black/40 dark:text-white/40">
                <span className="w-8 h-px bg-black/20 dark:bg-white/20" />
                CAPABILITIES
              </div>
              <h2 className="display text-[32px] sm:text-[44px] leading-[0.9] font-black mt-2">
                Everything you need, <span className="italic font-bold text-[#D93D1A]">no clutter.</span>
              </h2>
            </div>
            <p className="max-w-[48ch] text-[15px] leading-[1.6] font-medium text-black/55 dark:text-white/55">
              Six tools. Each one tactile and focused. No infinite dashboards — just the pieces that move your Japanese forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 [perspective:1200px]">
            {features.map((f, idx) => (
              <TiltCard key={idx} accent={f.accent} intensity={11} className="min-h-[248px]">
                <div className="p-6 sm:p-7 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-11 h-11 rounded-xl grid place-items-center text-white shadow-[0_8px_16px_rgba(0,0,0,0.16)]" style={{ background: f.accent }}>
                      {f.icon}
                    </div>
                    <span className="text-[11px] mono tracking-[0.14em] font-bold text-black/30 dark:text-white/30 border border-black/10 dark:border-white/10 rounded-full px-2.5 py-1 bg-white/70 dark:bg-white/5">{f.kicker}</span>
                  </div>
                  <h3 className="mt-5 text-[19px] leading-tight font-bold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.6] font-medium text-black/55 dark:text-white/60 line-clamp-3">{f.description}</p>
                  <div className="mt-auto pt-5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[0.06em] mono">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: f.accent }} />
                      {f.meta}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#F3EEE6] dark:bg-zinc-800 grid place-items-center">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE — editorial split + isometric 3D */}
        <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-10 items-center">
            {/* left copy */}
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.16em] font-bold mono text-black/40 dark:text-white/40">
                <span className="w-8 h-px bg-black/20 dark:bg-white/20" />
                WHY KAIRØ
              </div>
              <h2 className="display text-[34px] sm:text-[46px] leading-[0.9] font-black mt-2">
                Built like a <span className="underline decoration-[#D93D1A]/20 underline-offset-8">craft tool,</span> not a feed.
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  { t: 'Retention over streaks', d: 'Spaced repetition is tuned to your memory, not your calendar. Miss a day? It adapts — no guilt.', c: '#D93D1A' },
                  { t: 'Paper-like memory', d: 'Cards have weight, texture and depth. Your brain remembers objects in space better than flat lists.', c: '#1A2A4A' },
                  { t: 'Real language, real people', d: 'Natives correct you inline. Learn the Japanese people actually speak.', c: '#0E7A6B' },
                ].map((it, i) => (
                  <div key={i} className="group flex gap-4 rounded-2xl p-4 sm:p-5 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 soft-shadow hover:-translate-y-0.5 transition">
                    <div className="w-10 h-10 rounded-xl grid place-items-center text-white shrink-0 shadow-[0_6px_16px_rgba(0,0,0,0.14)]" style={{ background: it.c }}>
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[16px] font-bold leading-tight">{it.t}</div>
                      <div className="text-[14px] leading-[1.6] font-medium text-black/55 dark:text-white/55 mt-1">{it.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-[#111210] dark:bg-white text-white dark:text-black px-6 py-3 text-[14px] font-bold">
                  Start free <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-black/50 dark:text-white/50">
                  <Layers className="w-4 h-4" /> No credit card • 2-min setup
                </span>
              </div>
            </div>

            {/* right — isometric 3D sculpture (pure CSS) */}
            <div className="relative">
              <div className="relative mx-auto max-w-[520px] aspect-[1.18] rounded-[28px] bg-[#F3EEE6] dark:bg-zinc-900 border border-black/5 dark:border-white/10 overflow-hidden soft-shadow">
                <div className="absolute inset-0 grid-dots opacity-[0.18] pointer-events-none" />
                {/* isometric stacks */}
                <div className="absolute inset-0 grid place-items-center [perspective:1000px]">
                  <div className="relative w-[78%] h-[68%] [transform:rotateX(54deg)_rotateZ(-32deg)] [transform-style:preserve-3d] will-change-transform" style={{ transform: 'rotateX(54deg) rotateZ(-36deg) translateZ(0)' }}>
                    {/* base slab */}
                    <div className="absolute inset-0 rounded-[18px] bg-white dark:bg-zinc-800 border border-black/10" style={{ transform: 'translateZ(0px)', boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset' }} />
                    {/* book stacks - 3D blocks */}
                    {[
                      { x: '12%', y: '18%', z: 18, w: '34%', h: '22%', c: '#D93D1A', label: '漢字' },
                      { x: '44%', y: '10%', z: 34, w: '28%', h: '18%', c: '#1A2A4A', label: '語彙' },
                      { x: '18%', y: '52%', z: 26, w: '30%', h: '20%', c: '#0E7A6B', label: '文法' },
                      { x: '52%', y: '48%', z: 14, w: '36%', h: '24%', c: '#111210', label: '会話' },
                    ].map((b, i) => (
                      <div
                        key={i}
                        className="absolute rounded-[14px] grid place-items-center border border-black/10 overflow-hidden"
                        style={{
                          left: b.x, top: b.y, width: b.w, height: b.h,
                          background: b.c,
                          transform: `translateZ(${b.z}px)`,
                          boxShadow: `0 ${b.z * 0.6}px ${b.z * 1.2}px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.22)`,
                          animation: `isoFloat ${5 + i * 0.7}s ease-in-out infinite`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      >
                        <span className="text-white font-black text-[18px]" style={{ fontFamily: "'Noto Sans JP', sans-serif", transform: 'rotateZ(36deg) rotateX(-54deg)' }}>{b.label}</span>
                        {/* side faces for extrusion */}
                        <div className="absolute inset-0 rounded-[14px] pointer-events-none" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -6px 0 rgba(0,0,0,0.14)' }} />
                      </div>
                    ))}

                    {/* floating indicator */}
                    <div className="absolute left-[68%] top-[6%] w-3 h-3 rounded-full bg-[#D93D1A] shadow-[0_0_0_6px_rgba(217,61,26,0.16)]" style={{ transform: 'translateZ(48px)' }} />
                  </div>
                </div>

                {/* caption chips */}
                <div className="absolute left-3 sm:left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white dark:bg-zinc-800 border border-black/5 px-3 py-1.5 soft-shadow">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold tracking-[0.12em] mono">ISOMETRIC WORKSPACE</span>
                </div>
                <div className="absolute right-3 sm:right-4 bottom-4 bg-[#111210] text-white rounded-2xl px-4 py-3 soft-shadow max-w-[200px]">
                  <div className="text-[12px] font-bold leading-tight">Your desk, in 3D.</div>
                  <div className="text-[12px] leading-[1.4] text-white/60 font-medium mt-1">Stacks grow as you master them. Physical memory, digital craft.</div>
                </div>

                {/* top highlight */}
                <div className="absolute inset-0 rounded-[28px] pointer-events-none" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.06)' }} />
              </div>

              {/* contact shadow */}
              <div className="absolute left-8 right-8 -bottom-3 h-6 bg-black/10 dark:bg-black/30 blur-[14px] rounded-full -z-10" />

              <style>{`@keyframes isoFloat { 0%,100%{ transform: translateZ(var(--z, 18px)) translateY(0)} 50%{ transform: translateZ(var(--z, 18px)) translateY(-4px)} }`}</style>
            </div>
          </div>
        </section>

        {/* CTA — deep extruded block */}
        <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-12">
          <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden border border-black/5 dark:border-white/10 soft-shadow" style={{ background: '#111210' }}>
            {/* texture + gradients */}
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(800px 400px at 22% 18%, rgba(217,61,26,0.22), transparent 60%), radial-gradient(700px 500px at 88% 78%, rgba(26,42,74,0.22), transparent 60%)' }} />
            {/* top edge bevel */}
            <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
            <div className="absolute inset-x-0 bottom-0 h-[18px] bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

            {/* big watermark */}
            <div aria-hidden className="absolute -right-6 -bottom-8 hidden lg:block opacity-[0.06] pointer-events-none select-none display text-[220px] leading-none font-black text-white" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>未来</div>

            <div className="relative grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 p-6 sm:p-10 lg:p-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D93D1A] shadow-[0_0_10px_rgba(217,61,26,0.6)]" />
                  <span className="text-[11px] tracking-[0.14em] font-bold mono text-white/70">START TODAY — FREE FOREVER PLAN</span>
                </div>
                <h2 className="display text-[30px] sm:text-[40px] lg:text-[48px] leading-[0.9] font-black text-white mt-4">
                  Ready to make <span className="text-[#FF6B4A] italic">Japanese stick?</span>
                </h2>
                <p className="mt-4 text-[15px] sm:text-[17px] leading-[1.6] font-medium text-white/60 max-w-[52ch]">
                  Join 50,000 learners who traded flat drills for tactile memory. Flashcards that feel like cards. Progress you can see.
                </p>
                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D93D1A] text-white px-8 py-4 text-[15px] font-bold extruded-btn hover:brightness-105 transition">
                    Get Started — Free <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/login" className="inline-flex items-center justify-center rounded-full bg-white text-[#111210] px-8 py-4 text-[15px] font-bold hover:bg-zinc-100 transition">
                    Sign in
                  </Link>
                </div>
                <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-white/50 mono">
                  <Check className="w-4 h-4 text-emerald-400" /> No credit card • Cancel anytime
                </div>
              </div>

              {/* 3D quick peek — mini stack */}
              <div className="relative hidden lg:block">
                <div className="relative mx-auto w-[86%] aspect-[1.35] [perspective:1000px]">
                  <div className="absolute inset-0 grid place-items-center [transform-style:preserve-3d]" style={{ transform: 'rotateX(10deg) rotateY(-14deg)' }}>
                    <div className="absolute w-[72%] aspect-[1.5] rounded-[18px] bg-[#F3EEE6] border border-black/10 grid place-items-center" style={{ transform: 'translateZ(-18px) rotateZ(-1.5deg)', boxShadow: '0 10px 28px rgba(0,0,0,0.18)' }}>
                      <span className="text-[28px] font-black text-black/80" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>学</span>
                    </div>
                    <div className="absolute w-[76%] aspect-[1.52] rounded-[18px] bg-white border border-black/5 grid place-items-center" style={{ transform: 'translateZ(6px) rotateZ(1deg)', boxShadow: '0 16px 36px rgba(0,0,0,0.20)' }}>
                      <div className="text-center p-4">
                        <div className="text-[10px] tracking-[0.16em] font-bold mono text-black/40">TODAY’S REVIEW</div>
                        <div className="display text-[36px] font-black leading-none mt-1">42<span className="text-[16px] text-black/40">/60</span></div>
                        <div className="mt-2 h-1.5 w-32 mx-auto rounded-full bg-black/10 overflow-hidden"><div className="h-full w-[70%] bg-[#D93D1A] rounded-full" /></div>
                      </div>
                    </div>
                    <div className="absolute w-[68%] aspect-[1.45] rounded-[18px] bg-[#111210] text-white grid place-items-center" style={{ transform: 'translateZ(32px) translateY(28px) rotateZ(-0.8deg)', boxShadow: '0 20px 44px rgba(0,0,0,0.28)' }}>
                      <div className="text-center">
                        <div className="text-[42px] font-black" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>あ</div>
                        <div className="text-[11px] tracking-[0.14em] font-bold mono text-white/60">HIRAGANA • A</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* tiny footer meta under CTA */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] mono tracking-[0.12em] font-bold text-black/30 dark:text-white/30">
            <span>© {new Date().getFullYear()} KAIRØ</span><span className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20" /><span>MADE FOR LEARNERS, NOT SCROLLERS</span>
          </div>
        </section>
      </div>

      <VideoDemo isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </>
  )
}

export default Home
