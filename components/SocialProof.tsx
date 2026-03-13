'use client'

import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { EASE_OUT } from '@/lib/easing'

const QUOTES = [
  {
    text: "I've tried every productivity app, every style app. Nothing ever stuck because nothing actually solved the morning. ainaa.ai solves the morning.",
    handle: '@priya.curates',
    location: 'Mumbai',
    role: 'UX Designer',
    avatar: 'P',
    avatarColor: '#C9A97A',
  },
  {
    text: "The gap intelligence feature told me exactly what I was missing from my wardrobe. One purchase. 11 new outfits. That's not a feature, that's a financial advisor.",
    handle: '@zoya_edits',
    location: 'Bangalore',
    role: 'Creative Director',
    avatar: 'Z',
    avatarColor: '#9B7FD4',
  },
  {
    text: "I shared my outfit card on Instagram stories and got 43 DMs asking what app this was. My friends all want early access. This thing is going to be massive.",
    handle: '@amara.style',
    location: 'Delhi',
    role: 'Brand Consultant',
    avatar: 'A',
    avatarColor: '#D47FA3',
  },
  {
    text: "The fact that it learns from my swipes and gets better every week is unreal. It's now genuinely better at picking my outfits than I am. That's wild to type.",
    handle: '@neha.designs',
    location: 'Hyderabad',
    role: 'Product Manager',
    avatar: 'N',
    avatarColor: '#7EB8C9',
  },
]

function QuoteCard({ q, index }: { q: (typeof QUOTES)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const spot = spotRef.current
    if (!card || !spot) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    spot.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(201,169,122,0.08), transparent 70%)`
    spot.style.opacity = '1'
  }, [])

  const handleMouseLeave = useCallback(() => {
    const spot = spotRef.current
    if (spot) spot.style.opacity = '0'
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EASE_OUT }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: 'clamp(24px, 2.8vw, 36px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        cursor: 'default',
      }}
      whileHover={{ y: -6, borderColor: 'var(--border-hover)', boxShadow: '0 20px 60px rgba(0,0,0,0.22), 0 0 0 1px var(--border-hover)' }}
    >
      {/* Spotlight layer */}
      <div
        ref={spotRef}
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Quote mark */}
      <span
        className="font-display"
        style={{
          position: 'absolute',
          top: '-10px',
          right: '16px',
          fontSize: '120px',
          zIndex: 1,
          fontWeight: 700,
          lineHeight: 1,
          color: 'var(--border)',
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.05em',
        }}
      >
        &ldquo;
      </span>

      {/* Stars */}
      <div style={{ display: 'flex', gap: '3px' }}>
        {[1,2,3,4,5].map(n => (
          <span key={n} style={{ fontSize: '11px', color: 'var(--accent)' }}>★</span>
        ))}
      </div>

      {/* Quote text */}
      <p
        style={{
          fontSize: 'clamp(13px, 1.4vw, 15px)',
          lineHeight: 1.75,
          color: 'var(--text-secondary)',
          fontWeight: 300,
          flex: 1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        &ldquo;{q.text}&rdquo;
      </p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Avatar */}
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: `${q.avatarColor}22`,
            border: `1px solid ${q.avatarColor}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            className="font-display"
            style={{ fontSize: '14px', fontWeight: 600, color: q.avatarColor }}
          >
            {q.avatar}
          </span>
        </div>

        <div>
          <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '1px' }}>{q.handle}</p>
          <p className="font-mono-accent" style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
            {q.role} · {q.location}
          </p>
        </div>

        {/* Verified badge */}
        <div style={{ marginLeft: 'auto', padding: '3px 8px', borderRadius: '999px', background: 'var(--accent-dim)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '8px', color: 'var(--accent)' }}>✦</span>
          <span className="font-mono-accent" style={{ fontSize: '7px', color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Beta</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function SocialProof() {
  return (
    <section
      style={{
        padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 80px)',
        background: 'var(--bg-base)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative orb */}
      <div aria-hidden style={{ position: 'absolute', top: '50%', right: '-150px', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--orb-2)', filter: 'blur(130px)', opacity: 0.12, transform: 'translateY(-50%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px, 5vw, 60px)', alignItems: 'end', marginBottom: 'clamp(48px, 7vh, 80px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '32px', height: '1px', background: 'var(--accent)' }} />
              <span className="font-mono-accent" style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)' }}>Early Members</span>
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', fontWeight: 300, lineHeight: 1.0, letterSpacing: '-0.04em', color: 'var(--text-primary)', margin: 0 }}>
              People who
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 600, color: 'var(--accent)' }}>already get it.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: '380px', fontWeight: 300, alignSelf: 'end' }}>
              Our closed beta runs in 8 cities. These are real members who helped shape ainaa.ai into what it is.
              Their DMs, voice notes, and obsessive daily use
              are why we&apos;re confident this changes everything.
            </p>
          </motion.div>
        </div>

        {/* Quote grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {QUOTES.map((q, i) => (
            <QuoteCard key={q.handle} q={q} index={i} />
          ))}
        </div>

        {/* Trust signal strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: '48px', display: 'flex', gap: 'clamp(24px, 4vw, 48px)', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}
        >
          {[
            { stat: '8', label: 'Cities in beta' },
            { stat: '2,400+', label: 'Founding members' },
            { stat: '94%', label: 'D1 retention (beta)' },
            { stat: '4.9/5', label: 'Avg. beta rating' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '0 clamp(12px, 2vw, 24px)' }}>
              <div className="font-display" style={{ fontSize: 'clamp(20px, 2.8vw, 32px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--accent)', lineHeight: 1, marginBottom: '4px' }}>{item.stat}</div>
              <div className="font-mono-accent" style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
