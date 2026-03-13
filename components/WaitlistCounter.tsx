'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { EASE_OUT } from '@/lib/easing'
import WaitlistForm from './WaitlistForm'

const FOUNDING_TOTAL = 500
const FOUNDING_CLAIMED = 387

function CountUp({ target, duration = 2.2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {count.toLocaleString()}
    </span>
  )
}

interface ArcStatProps {
  value: number
  max: number
  suffix: string
  label: string
  color?: string
  delay?: number
}

function ArcStat({ value, max, suffix, label, color = 'var(--accent)', delay = 0 }: ArcStatProps) {
  const ref = useRef<SVGCircleElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-40px' })
  const [count, setCount] = useState(0)

  const RADIUS = 52
  const STROKE = 3
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS
  const pct = Math.min(value / max, 1)
  const [dashOffset, setDashOffset] = useState(CIRCUMFERENCE)

  useEffect(() => {
    if (!inView) return
    const totalDuration = 1600
    const startTime = performance.now() + delay * 1000

    const tick = (now: number) => {
      const elapsed = Math.max(0, now - startTime)
      const progress = Math.min(elapsed / totalDuration, 1)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDashOffset(CIRCUMFERENCE * (1 - eased * pct))
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, max, pct, delay, CIRCUMFERENCE])

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: 'clamp(20px, 3vw, 36px)' }}>
      {/* SVG Arc */}
      <div style={{ position: 'relative', width: `${(RADIUS + STROKE) * 2 + 4}px`, height: `${(RADIUS + STROKE) * 2 + 4}px` }}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${(RADIUS + STROKE) * 2 + 4} ${(RADIUS + STROKE) * 2 + 4}`}
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Track */}
          <circle
            cx={RADIUS + STROKE + 2}
            cy={RADIUS + STROKE + 2}
            r={RADIUS}
            fill="none"
            stroke="var(--border)"
            strokeWidth={STROKE}
          />
          {/* Progress arc */}
          <circle
            ref={ref}
            cx={RADIUS + STROKE + 2}
            cy={RADIUS + STROKE + 2}
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth={STROKE + 0.5}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>
        {/* Center number */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span className="font-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1 }}>
            {count.toLocaleString()}
          </span>
          <span className="font-mono-accent" style={{ fontSize: '9px', color: 'var(--accent)', letterSpacing: '0.06em', marginTop: '2px' }}>{suffix}</span>
        </div>
      </div>
      <p className="font-mono-accent" style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '100px' }}>{label}</p>
    </div>
  )
}

const FOUNDING_BENEFITS = [
  { icon: '✦', text: 'Lifetime 40% off — locked forever, never revoked' },
  { icon: '◈', text: 'Direct access to the founding team — shape the product' },
  { icon: '◎', text: 'Beta access weeks before public launch' },
  { icon: '◻', text: 'Founding Member badge — in-app, for life' },
]

interface WaitlistCounterProps {
  initialCount?: number
}

export default function WaitlistCounter({ initialCount = 2400 }: WaitlistCounterProps) {
  const progressPct = Math.round((FOUNDING_CLAIMED / FOUNDING_TOTAL) * 100)

  return (
    <section
      id="waitlist"
      style={{
        padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-surface)',
      }}
    >
      {/* Dot grid bg */}
      <div className="dot-grid" aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      {/* Background orb */}
      <div aria-hidden style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: '700px', height: '700px', borderRadius: '50%', background: 'var(--accent)', filter: 'blur(160px)', opacity: 0.05, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}
        >
          <div style={{ width: '32px', height: '1px', background: 'var(--accent)' }} />
          <span className="font-mono-accent" style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            By The Numbers
          </span>
        </motion.div>

        {/* Arc stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1px',
            background: 'var(--border)',
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '80px',
            border: '1px solid var(--border)',
          }}
        >
          <ArcStat value={2400} max={5000} suffix="+" label="Founding members worldwide" delay={0} />
          <ArcStat value={FOUNDING_CLAIMED} max={FOUNDING_TOTAL} suffix={`/${FOUNDING_TOTAL}`} label="Founding spots claimed" color="var(--accent)" delay={0.1} />
          <ArcStat value={17} max={60} suffix="min" label="Saved every morning" delay={0.2} />
        </motion.div>

        {/* Main CTA grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(40px, 6vw, 100px)', alignItems: 'start' }}>

          {/* Left: headline + urgency + benefits */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            {/* Urgency badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255,60,60,0.08)', border: '1px solid rgba(255,60,60,0.2)', marginBottom: '28px' }}>
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF4B4B', flexShrink: 0 }}
              />
              <span className="font-mono-accent" style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FF6B6B' }}>
                {FOUNDING_TOTAL - FOUNDING_CLAIMED} founding spots remaining
              </span>
            </div>

            <h2 className="font-display" style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', fontWeight: 300, lineHeight: 1.0, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Founding member.
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 600, color: 'var(--accent)' }}>Not just a waitlist.</span>
            </h2>

            <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '32px', fontWeight: 300 }}>
              The first 500 who join aren&apos;t subscribers — they&apos;re co-architects.
              You get lifetime benefits, direct product access, and a seat at the table.
              After 500, this offer disappears permanently.
            </p>

            {/* Progress bar */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="font-mono-accent" style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Founding spots</span>
                <span className="font-mono-accent" style={{ fontSize: '9px', color: 'var(--accent)', letterSpacing: '0.1em' }}>{FOUNDING_CLAIMED} / {FOUNDING_TOTAL} claimed</span>
              </div>
              <div style={{ height: '4px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progressPct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: EASE_OUT }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent), var(--accent-glow))', borderRadius: '999px' }}
                />
              </div>
            </div>

            {/* Benefits list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {FOUNDING_BENEFITS.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
                >
                  <span style={{ fontSize: '12px', color: 'var(--accent)', flexShrink: 0, marginTop: '1px' }}>{b.icon}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{b.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
            style={{ position: 'sticky', top: '100px' }}
          >
            {/* Card */}
            <div style={{ padding: 'clamp(28px, 3.5vw, 44px)', borderRadius: '24px', border: '1px solid var(--border)', background: 'var(--bg-elevated)', position: 'relative', overflow: 'hidden' }}>
              {/* Card accent top */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--accent), transparent, var(--accent))' }} />

              <div style={{ marginBottom: '20px' }}>
                <p className="font-mono-accent" style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>Claim Your Founding Spot</p>
                <h3 className="font-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                  Join the revolution.
                  <br />
                  <em style={{ color: 'var(--accent)' }}>Before it&apos;s public.</em>
                </h3>
              </div>

              <WaitlistForm size="large" placeholder="your@email.com" />

              <div style={{ marginTop: '20px', padding: '14px', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  {['✦ 40% off for life', '✦ Beta access', '✦ Shape the product'].map((tag) => (
                    <span key={tag} className="font-mono-accent" style={{ fontSize: '8px', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>{tag}</span>
                  ))}
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Founding membership closes permanently at 500 spots.
                  No exceptions. No waitlist after that.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
