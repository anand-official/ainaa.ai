'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { EASE_OUT } from '@/lib/easing'

const STEPS = [
  {
    number: '01',
    title: 'Upload your wardrobe once.',
    description:
      'Snap, tag, done. No spreadsheets. No cataloguing. ainaa maps every item into a compatibility graph — understanding what works with what, at a level your brain can\'t consciously compute.',
    detail: 'Wardrobe graph engine',
    stat: '< 4 min',
    statLabel: 'average onboarding time for 30 items',
  },
  {
    number: '02',
    title: 'One tap. Perfect outfit.',
    description:
      'Open ainaa. Tap once. Walk out. Every suggestion is pulled from clothes you already own, calibrated to your day, your weather, and the taste profile the engine has been quietly building.',
    detail: 'Real-time outfit generation',
    stat: '2.8s',
    statLabel: 'average time to a complete outfit',
  },
  {
    number: '03',
    title: 'It learns. You win.',
    description:
      'Every swipe teaches ainaa who you are. After 30 days, it knows your style better than you do. After 6 months, it\'s irreplaceable. That\'s not a feature — that\'s a moat you build for yourself.',
    detail: 'Personal taste embedding',
    stat: '94%',
    statLabel: 'of users open ainaa within 24 hours of joining',
  },
]

function TimelineStep({
  step,
  index,
  isLast,
}: {
  step: (typeof STEPS)[number]
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '0', position: 'relative' }}>
      {/* Left column: number + line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '8px' }}>
        {/* Big number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15, type: 'spring', stiffness: 200, damping: 22 }}
          className="font-display"
          style={{
            fontSize: 'clamp(48px, 6vw, 80px)',
            fontWeight: 600,
            letterSpacing: '-0.05em',
            lineHeight: 1,
            color: inView ? 'var(--accent)' : 'var(--border)',
            transition: 'color 0.6s ease',
            width: '100px',
            textAlign: 'center',
          }}
        >
          {step.number}
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <div style={{ flex: 1, width: '1px', marginTop: '12px', position: 'relative', overflow: 'hidden', minHeight: '60px' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--border)' }} />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 + 0.3, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, var(--accent), transparent)',
                transformOrigin: 'top',
              }}
            />
          </div>
        )}
      </div>

      {/* Right column: content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.15 + 0.1, ease: EASE_OUT }}
        style={{
          paddingBottom: isLast ? '0' : 'clamp(48px, 7vh, 80px)',
          paddingLeft: '20px',
          paddingTop: '8px',
        }}
      >
        {/* Tag */}
        <span className="font-mono-accent" style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '3px 10px', border: '1px solid var(--border)', borderRadius: '999px', display: 'inline-block', marginBottom: '16px' }}>
          {step.detail}
        </span>

        {/* Title */}
        <h3
          className="font-display"
          style={{
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            marginBottom: '16px',
          }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: '540px', fontWeight: 300, marginBottom: '24px' }}>
          {step.description}
        </p>

        {/* Stat card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.35 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 16px',
            borderRadius: '10px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
          }}
        >
          <span
            className="font-display"
            style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 600, color: 'var(--accent)', letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            {step.stat}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', maxWidth: '180px', lineHeight: 1.4 }}>{step.statLabel}</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 80px)',
        background: 'var(--bg-surface)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background orb */}
      <div aria-hidden style={{ position: 'absolute', bottom: '10%', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'var(--orb-2)', filter: 'blur(140px)', opacity: 0.12, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'end',
            marginBottom: 'clamp(60px, 10vh, 100px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
              <div style={{ width: '32px', height: '1px', background: 'var(--accent)' }} />
              <span className="font-mono-accent" style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)' }}>How It Works</span>
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(44px, 6.5vw, 88px)',
                fontWeight: 300,
                lineHeight: 1.0,
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              Stupid simple.
              <br />
              <span style={{ fontWeight: 600, fontStyle: 'italic', color: 'var(--accent)' }}>Frighteningly good.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'var(--text-secondary)',
              maxWidth: '380px',
              fontWeight: 300,
              alignSelf: 'end',
            }}
          >
            We removed every step that wasn&apos;t essential.
            What remained is a product so simple it feels like cheating — and so smart it feels like magic.
          </motion.p>
        </div>

        {/* Timeline */}
        <div>
          {STEPS.map((step, i) => (
            <TimelineStep
              key={step.number}
              step={step}
              index={i}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
