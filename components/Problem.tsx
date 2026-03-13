'use client'

import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { EASE_OUT } from '@/lib/easing'

const PROBLEMS = [
  {
    number: '01',
    headline: '77 items.',
    subline: '15 you actually wear.',
    body: "The rest? Invisible. You've spent thousands on a wardrobe you don't use, because nothing connects the dots. Your wardrobe is full. Your options feel empty.",
    icon: '◻',
  },
  {
    number: '02',
    headline: '17 minutes.',
    subline: 'Gone. Every morning.',
    body: "That's 4 days a year, standing in front of your wardrobe, anxious. The cost isn't just time — it's the mental energy you're robbing from the rest of your day before it even starts.",
    icon: '◈',
  },
  {
    number: '03',
    headline: 'Your taste exists.',
    subline: 'It just doesn\'t work for you.',
    body: "Pinterest boards. Saved reels. Screenshot folders. You know exactly what you love. You just have no system that takes that knowledge and turns it into what to wear today.",
    icon: '◎',
  },
]

function TiltCard({ p, index }: { p: (typeof PROBLEMS)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy

    const rotateX = -(dy / (rect.height / 2)) * 8
    const rotateY = (dx / (rect.width / 2)) * 8

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`

    // Move specular highlight
    const glowX = ((e.clientX - rect.left) / rect.width) * 100
    const glowY = ((e.clientY - rect.top) / rect.height) * 100
    glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
    glow.style.opacity = '1'
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    glow.style.opacity = '0'
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.14, ease: EASE_OUT }}
      style={{ position: 'relative' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor="hover"
        style={{
          borderRadius: '20px',
          padding: 'clamp(28px, 3vw, 44px)',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          transition: 'transform 0.15s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          willChange: 'transform',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Specular highlight layer */}
        <div
          ref={glowRef}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '20px',
            opacity: 0,
            transition: 'opacity 0.2s ease',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Top accent line — appears on hover via border */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, var(--accent), transparent)',
            opacity: 0.6,
          }}
        />

        {/* Background number watermark */}
        <span
          className="font-display"
          style={{
            position: 'absolute',
            right: '-4px',
            bottom: '-20px',
            fontSize: '130px',
            fontWeight: 700,
            lineHeight: 1,
            color: 'var(--border)',
            userSelect: 'none',
            pointerEvents: 'none',
            letterSpacing: '-0.05em',
            zIndex: 0,
          }}
        >
          {p.number}
        </span>

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Icon */}
          <div style={{ fontSize: '24px', color: 'var(--accent)', marginBottom: '24px', lineHeight: 1 }}>
            {p.icon}
          </div>

          {/* Headline */}
          <h3 className="font-display" style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--text-primary)', marginBottom: '2px' }}>
            {p.headline}
          </h3>
          <h3 className="font-display" style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--accent)', marginBottom: '22px' }}>
            {p.subline}
          </h3>

          {/* Body */}
          <p style={{ fontSize: '13px', lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: '320px', fontWeight: 300 }}>
            {p.body}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Problem() {
  return (
    <section
      style={{
        padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 80px)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '56px' }}
      >
        <div style={{ width: '32px', height: '1px', background: 'var(--accent)' }} />
        <span className="font-mono-accent" style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)' }}>
          The Problem
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="font-display"
        style={{
          fontSize: 'clamp(44px, 6.5vw, 88px)',
          fontWeight: 300,
          lineHeight: 1.0,
          letterSpacing: '-0.04em',
          color: 'var(--text-primary)',
          marginBottom: '80px',
          maxWidth: '700px',
        }}
      >
        You lose before
        <br />
        <span style={{ fontStyle: 'italic', fontWeight: 600, color: 'var(--accent)' }}>the day begins.</span>
      </motion.h2>

      {/* Cards with 3D tilt */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        {PROBLEMS.map((p, i) => (
          <TiltCard key={p.number} p={p} index={i} />
        ))}
      </div>
    </section>
  )
}
