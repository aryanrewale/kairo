import { useRef, useState } from 'react'

/*
  TiltCard — tactile 3D paper card
  - perspective container
  - inner card rotates with mouse
  - layered shadows + edge extrusion
  - glare highlight that follows pointer
  - optional accent stripe
*/

const TiltCard = ({ 
  children, 
  className = '', 
  intensity = 12, 
  glare = true, 
  extrusion = true,
  accent,
  style 
}) => {
  const ref = useRef(null)
  const [rot, setRot] = useState({ x: 0, y: 0 })
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [hover, setHover] = useState(false)

  const handleMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = x / rect.width
    const py = y / rect.height
    // rotateX : up/down, rotateY : left/right
    const rx = (py - 0.5) * -intensity
    const ry = (px - 0.5) * intensity
    setRot({ x: rx, y: ry })
    setPos({ x: px * 100, y: py * 100 })
  }

  const handleLeave = () => {
    setHover(false)
    setRot({ x: 0, y: 0 })
  }

  const handleEnter = () => setHover(true)

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative [perspective:1100px] ${className}`}
      style={style}
    >
      {/* shadow catcher - deep soft shadow */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[22px] transition-all duration-300"
        style={{
          transform: hover ? 'translateZ(-30px) scale(0.96)' : 'translateZ(-20px) scale(0.98)',
          background: 'transparent',
          boxShadow: hover
            ? '0 12px 24px rgba(17,18,16,0.10), 0 36px 64px rgba(17,18,16,0.14)'
            : '0 4px 12px rgba(17,18,16,0.06), 0 16px 32px rgba(17,18,16,0.08)',
          filter: 'blur(0px)',
          opacity: 1
        }}
      />

      {/* extruded edge - shows thickness */}
      {extrusion && (
        <div
          aria-hidden
          className="absolute inset-0 rounded-[22px] pointer-events-none"
          style={{
            transform: `translateZ(-10px) translateX(${rot.y * 0.18}px) translateY(${rot.x * -0.18}px)`,
            background: '#E8E6E1',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)'
          }}
        />
      )}

      {/* main card */}
      <div
        className="relative h-full rounded-[22px] bg-[#FFFCF8] dark:bg-[#1A1C1B] border border-[rgba(17,18,16,0.08)] dark:border-white/10 overflow-hidden will-change-transform"
        style={{
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg) translateZ(0)`,
          transformStyle: 'preserve-3d',
          transition: hover ? 'transform 0.12s linear' : 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.9),
            inset 0 -1px 0 rgba(17,18,16,0.06),
            0 1px 2px rgba(17,18,16,0.04)
          `
        }}
      >
        {/* paper grain */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* accent rail */}
        {accent && (
          <div className="absolute top-0 left-6 right-6 h-[3px] rounded-full opacity-90" style={{ background: accent }} />
        )}

        {/* glare */}
        {glare && (
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: hover ? 1 : 0,
              background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.45) 12%, rgba(255,255,255,0) 55%)`,
              mixBlendMode: 'overlay'
            }}
          />
        )}

        {/* top edge highlight following 3D */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-white/70 dark:bg-white/10 pointer-events-none"
          style={{ transform: 'translateZ(1px)' }}
        />

        <div className="relative h-full" style={{ transform: 'translateZ(22px)', transformStyle: 'preserve-3d' }}>
          {children}
        </div>

        {/* bottom bevel */}
        <div className="absolute inset-x-0 bottom-0 h-[22px] bg-gradient-to-t from-black/[0.06] to-transparent dark:from-black/20 pointer-events-none" style={{ transform: 'translateZ(0)' }} />
      </div>

      {/* floor contact shadow */}
      <div
        aria-hidden
        className="absolute left-6 right-6 -bottom-3 h-6 bg-black/10 dark:bg-black/30 blur-[12px] rounded-full pointer-events-none transition-all duration-500"
        style={{
          opacity: hover ? 0.9 : 0.45,
          transform: `scale(${hover ? 0.92 : 0.86}) translateX(${rot.y * 0.6}px)`,
        }}
      />
    </div>
  )
}

export default TiltCard
