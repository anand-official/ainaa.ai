'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import WaitlistForm from './WaitlistForm'
import { EASE_OUT, EASE_STANDARD } from '@/lib/easing'

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const animRef = useRef<number>(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const narrow = window.matchMedia('(max-width: 900px)').matches
    if (reducedMotion || narrow) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    window.addEventListener('mousemove', onMove)

    interface Particle {
      x: number; y: number; vx: number; vy: number
      size: number; opacity: number; baseOpacity: number
    }

    const count = 55
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.4 + 0.4,
      opacity: Math.random() * 0.35 + 0.1,
      baseOpacity: Math.random() * 0.35 + 0.1,
    }))

    const CONNECT_DIST = 90
    const REPEL_DIST = 110

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouse.current.x
      const my = mouse.current.y
      const accentColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim() || '#C9A97A'

      for (let i = 0; i < count; i++) {
        const p = particles[i]
        const dx = mx - p.x
        const dy = my - p.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < REPEL_DIST && d > 0) {
          const force = (1 - d / REPEL_DIST) * 0.06
          p.vx -= (dx / d) * force
          p.vy -= (dy / d) * force
        }
        p.vx *= 0.985
        p.vy *= 0.985
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) { p.x = 0; p.vx *= -1 }
        if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1 }
        if (p.y < 0) { p.y = 0; p.vy *= -1 }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1 }

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = accentColor
        ctx.globalAlpha = p.opacity
        ctx.fill()

        // Draw connecting lines
        for (let j = i + 1; j < count; j++) {
          const q = particles[j]
          const lx = p.x - q.x
          const ly = p.y - q.y
          const ld = Math.sqrt(lx * lx + ly * ly)
          if (ld < CONNECT_DIST) {
            const a = (1 - ld / CONNECT_DIST) * 0.07
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = accentColor
            ctx.globalAlpha = a
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
      animRef.current = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('mousemove', onMove)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.55,
      }}
    />
  )
}

const CYCLE_WORDS = ['Reclaimed.', 'Zero friction.', 'Your edge.', 'Effortless.', 'Owned.']

function TextCycler() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CYCLE_WORDS.length)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        overflow: 'hidden',
        height: 'clamp(50px, 7vw, 100px)',
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={CYCLE_WORDS[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="font-display"
          style={{
            fontSize: 'clamp(42px, 6vw, 88px)',
            fontWeight: 300,
            fontStyle: 'italic',
            letterSpacing: '-0.03em',
            color: 'var(--accent)',
            lineHeight: 1.1,
            display: 'block',
          }}
        >
          {CYCLE_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

function PhoneMockup() {
  const items = [
    { color: '#C9A97A', label: 'Silk blouse', width: '70%' },
    { color: '#4A3728', label: 'Wide-leg trousers', width: '60%' },
    { color: '#E8E0D5', label: 'Linen blazer', width: '80%' },
    { color: '#8B7355', label: 'Leather loafers', width: '50%' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateY: -15, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.5, ease: EASE_OUT }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: 'clamp(220px, 22vw, 300px)',
          aspectRatio: '9/19',
          borderRadius: '40px',
          border: '2px solid var(--border-hover)',
          background: 'var(--bg-elevated)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px var(--border), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '8px',
            borderRadius: '999px',
            background: 'var(--bg-base)',
            zIndex: 10,
          }}
        />

        {/* Screen content */}
        <div style={{ padding: '36px 16px 20px', height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div>
              <p className="font-mono-accent" style={{ fontSize: '8px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Friday, March</p>
              <p className="font-display" style={{ fontSize: '18px', color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1 }}>Today&apos;s Outfit</p>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-dim)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '10px', color: 'var(--accent)' }}>✦</span>
            </div>
          </div>

          {/* Outfit card */}
          <motion.div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '14px',
              padding: '12px',
              flex: 1,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {items.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.12, duration: 0.4 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <div
                    style={{
                      width: item.width,
                      height: '22px',
                      borderRadius: '4px',
                      background: item.color,
                      opacity: 0.85,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: '7px', color: 'var(--text-muted)', letterSpacing: '0.05em', whiteSpace: 'nowrap', overflow: 'hidden' }}>{item.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Compatibility score */}
            <div style={{ marginTop: '10px', padding: '6px 8px', background: 'var(--accent-dim)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-mono-accent" style={{ fontSize: '7px', color: 'var(--accent)', letterSpacing: '0.08em' }}>Compatibility</span>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1,2,3,4,5].map(n => (
                  <div key={n} style={{ width: '6px', height: '6px', borderRadius: '50%', background: n <= 4 ? 'var(--accent)' : 'var(--border)' }} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Gap insight */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            style={{
              background: 'linear-gradient(135deg, var(--accent-dim), transparent)',
              border: '1px solid var(--accent)',
              borderRadius: '10px',
              padding: '8px 10px',
            }}
          >
            <p className="font-mono-accent" style={{ fontSize: '7px', color: 'var(--accent)', letterSpacing: '0.08em', marginBottom: '2px', textTransform: 'uppercase' }}>Strategic Addition</p>
            <p style={{ fontSize: '8px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>White sneakers unlock <strong style={{ color: 'var(--text-primary)' }}>9 new combos</strong></p>
          </motion.div>

          {/* Nav dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', paddingTop: '4px' }}>
            {[0,1,2].map(n => (
              <div key={n} style={{ width: n === 0 ? '16px' : '4px', height: '4px', borderRadius: '999px', background: n === 0 ? 'var(--accent)' : 'var(--border)' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Phone reflection glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '40px',
          background: 'var(--accent)',
          filter: 'blur(30px)',
          opacity: 0.2,
          borderRadius: '50%',
        }}
      />
    </motion.div>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const rawY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const y = useSpring(rawY, { stiffness: 80, damping: 30 })
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-base)',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {/* Canvas particle field */}
      <ParticleCanvas />

      {/* Floating orbs */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', width: 'clamp(400px, 55vw, 900px)', height: 'clamp(400px, 55vw, 900px)', borderRadius: '50%', background: 'var(--orb-1)', filter: 'blur(110px)', opacity: 0.45, top: '-20%', left: '-15%', animation: 'float1 22s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: 'clamp(300px, 40vw, 600px)', height: 'clamp(300px, 40vw, 600px)', borderRadius: '50%', background: 'var(--orb-2)', filter: 'blur(100px)', opacity: 0.35, bottom: '0%', right: '10%', animation: 'float2 28s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: 'clamp(200px, 25vw, 400px)', height: 'clamp(200px, 25vw, 400px)', borderRadius: '50%', background: 'var(--orb-3)', filter: 'blur(80px)', opacity: 0.3, top: '50%', left: '55%', animation: 'float3 18s ease-in-out infinite' }} />
      </div>

      {/* Vignette */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 30%, var(--bg-base) 100%)', zIndex: 1, pointerEvents: 'none' }} />

      {/* Content grid */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(100px, 12vh, 140px) clamp(24px, 6vw, 80px) clamp(80px, 10vh, 120px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
          opacity: contentOpacity as unknown as number,
          y,
        }}
      >
        {/* Left column */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_STANDARD }}
            style={{ marginBottom: '32px' }}
          >
            <div className="hero-badge" style={{ display: 'inline-flex' }}>
              <div className="hero-badge-dot" />
              2,400+ founding members · Waitlist open
            </div>
          </motion.div>

          {/* Headline */}
          <div style={{ marginBottom: '20px' }}>
            {['Clarity before', 'you leave'].map((line, i) => (
              <div key={i} style={{ overflow: 'hidden', paddingBottom: '0.04em' }}>
                <motion.h1
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: EASE_OUT }}
                  className="font-display"
                  style={{
                    fontSize: 'clamp(52px, 8vw, 120px)',
                    fontWeight: i === 0 ? 300 : 600,
                    lineHeight: 1.0,
                    letterSpacing: '-0.04em',
                    color: 'var(--text-primary)',
                    margin: 0,
                    display: 'block',
                  }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
            <div style={{ overflow: 'hidden', paddingBottom: '0.04em' }}>
              <motion.h1
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.49, ease: EASE_OUT }}
                className="font-display"
                style={{
                  fontSize: 'clamp(52px, 8vw, 120px)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1.0,
                  letterSpacing: '-0.04em',
                  color: 'var(--accent)',
                  margin: 0,
                  display: 'block',
                }}
              >
                the house.
              </motion.h1>
            </div>
          </div>

          {/* Text cycler */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{ marginBottom: '36px' }}
          >
            <TextCycler />
          </motion.div>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: EASE_STANDARD }}
            style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              lineHeight: 1.75,
              color: 'var(--text-secondary)',
              maxWidth: '460px',
              fontWeight: 300,
              marginBottom: '40px',
            }}
          >
            The average woman spends{' '}
            <em style={{ color: 'var(--text-primary)', fontStyle: 'normal', fontWeight: 500 }}>17 minutes</em>{' '}
            choosing what to wear every morning. That&apos;s 4 full days a year, gone.{' '}
            <em style={{ color: 'var(--text-primary)', fontStyle: 'normal', fontWeight: 500 }}>ainaa.ai</em> turns
            your wardrobe into a daily decision engine — and gives you those days back.
          </motion.p>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15, ease: EASE_STANDARD }}
          >
            <WaitlistForm size="large" placeholder="your@email.com" />
            <p className="font-mono-accent" style={{ marginTop: '14px', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
              ✦ Founding spots — not a newsletter ✦ First 500 get lifetime benefits ✦ Zero spam
            </p>
          </motion.div>
        </div>

        {/* Right column — phone mockup, desktop only */}
        <div className="hidden-mobile" style={{ position: 'relative', flexShrink: 0 }}>
          <PhoneMockup />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: 'clamp(20px, 3vh, 40px)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 5,
        }}
      >
        <span className="font-mono-accent" style={{ fontSize: '8px', letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
