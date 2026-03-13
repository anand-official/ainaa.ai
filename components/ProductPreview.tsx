'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { EASE_OUT, EASE_STANDARD } from '@/lib/easing'

const GARMENTS = [
  { label: 'Silk blouse', color: '#C9A97A', accent: '#A8885E', width: '72%' },
  { label: 'Wide-leg trousers', color: '#2C2218', accent: '#4A3728', width: '85%' },
  { label: 'Linen blazer', color: '#E8E0D5', accent: '#C8C0B5', width: '90%' },
  { label: 'White sneakers', color: '#F5F5F0', accent: '#D5D5D0', width: '55%' },
  { label: 'Gold chain', color: '#D4AF72', accent: '#B08F52', width: '40%' },
]

const INSIGHTS = [
  { icon: '◎', text: 'White sneakers unlock', stat: '9 combos', color: '#C9A97A' },
  { icon: '◈', text: 'Structured blazer adds', stat: '12 outfits', color: '#C9A97A' },
  { icon: '✦', text: 'You wear 23% of your wardrobe', stat: 'Gap detected', color: '#E87474' },
]

function WardrobeGrid() {
  const palette = ['#C9A97A', '#2C2218', '#E8E0D5', '#8B7355', '#F0EAE0', '#4A3728', '#D4AF72', '#3B2F2F', '#E8D5C0', '#6B5B45']
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
      {palette.map((color, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.04 * i, duration: 0.3 }}
          style={{
            aspectRatio: '1',
            borderRadius: '6px',
            background: color,
            border: '1px solid rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)' }} />
        </motion.div>
      ))}
    </div>
  )
}

function AppScreen() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
        background: 'var(--bg-elevated)',
        borderRadius: '38px',
        padding: '40px 18px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        overflow: 'hidden',
      }}
    >
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="font-mono-accent" style={{ fontSize: '7px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Thursday — Casual</p>
          <p className="font-display" style={{ fontSize: '20px', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em' }}>My Outfit</p>
        </div>
        <motion.div
          animate={inView ? { rotate: [0, 20, -20, 0] } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
          style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'var(--accent-dim)', border: '1px solid var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '12px', color: 'var(--accent)' }}>✦</span>
        </motion.div>
      </div>

      {/* Outfit stack */}
      <motion.div
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '7px' }}
      >
        {GARMENTS.map((g, i) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.4, ease: EASE_STANDARD }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <div style={{ width: g.width, height: '20px', borderRadius: '4px', background: `linear-gradient(90deg, ${g.color}, ${g.accent})`, flexShrink: 0 }} />
            <span style={{ fontSize: '7px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.label}</span>
          </motion.div>
        ))}
        <div style={{ marginTop: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="font-mono-accent" style={{ fontSize: '7px', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>Compatibility score</span>
          <div style={{ display: 'flex', gap: '2px' }}>
            {[1,2,3,4,5].map(n => (
              <motion.div
                key={n}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.9 + n * 0.08, type: 'spring', stiffness: 400, damping: 20 }}
                style={{ width: '7px', height: '7px', borderRadius: '50%', background: n <= 4 ? 'var(--accent)' : 'var(--border)' }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Insights */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {INSIGHTS.map((ins, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0 + i * 0.12, duration: 0.4 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '6px 8px', borderRadius: '8px',
              background: i === 0 ? 'var(--accent-dim)' : 'var(--bg-card)',
              border: `1px solid ${i === 0 ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            <span style={{ fontSize: '9px', color: ins.color }}>{ins.icon}</span>
            <span style={{ fontSize: '7px', color: 'var(--text-secondary)', flex: 1 }}>{ins.text}</span>
            <span className="font-mono-accent" style={{ fontSize: '7px', color: ins.color, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{ins.stat}</span>
          </motion.div>
        ))}
      </div>

      {/* Wardrobe mini grid */}
      <div style={{ flex: 1 }}>
        <p className="font-mono-accent" style={{ fontSize: '7px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Your Wardrobe</p>
        <WardrobeGrid />
      </div>

      {/* Bottom nav */}
      <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '6px', borderTop: '1px solid var(--border)' }}>
        {['◎', '◈', '✦', '◻'].map((icon, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <span style={{ fontSize: '10px', color: i === 0 ? 'var(--accent)' : 'var(--text-muted)' }}>{icon}</span>
            <div style={{ width: i === 0 ? '12px' : '4px', height: '2px', borderRadius: '999px', background: i === 0 ? 'var(--accent)' : 'transparent' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProductPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'center center'] })
  const rawRotate = useTransform(scrollYProgress, [0, 1], [8, 0])
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const rawY = useTransform(scrollYProgress, [0, 1], [80, 0])
  const rotate = useSpring(rawRotate, { stiffness: 60, damping: 18 })
  const scale = useSpring(rawScale, { stiffness: 60, damping: 18 })
  const phoneY = useSpring(rawY, { stiffness: 60, damping: 18 })

  const inView = useInView(sectionRef, { once: true, margin: '-20%' })

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 14vh, 160px) clamp(24px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-base)',
      }}
    >
      {/* Radial spotlight */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, var(--accent-dim) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '56px' }}
        >
          <div style={{ width: '40px', height: '1px', background: 'var(--accent)' }} />
          <span className="font-mono-accent" style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)' }}>Product Preview</span>
          <div style={{ width: '40px', height: '1px', background: 'var(--accent)' }} />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="font-display"
          style={{
            fontSize: 'clamp(36px, 6vw, 80px)',
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            textAlign: 'center',
            marginBottom: '16px',
            color: 'var(--text-primary)',
          }}
        >
          This is what{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>clarity</span>
          <br />
          looks like.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 'clamp(48px, 8vh, 80px)', maxWidth: '420px', margin: '0 auto clamp(48px, 8vh, 80px)' }}
        >
          A glimpse of ainaa.ai. One screen. Everything you need to get dressed and get moving.
        </motion.p>

        {/* Phone + side callouts */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
            justifyItems: 'center',
          }}
        >
          {/* Left callouts */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '260px' }}
          >
            {[
              { num: '77', unit: 'avg items', desc: 'in a typical wardrobe', note: 'ainaa knows them all' },
              { num: '20%', unit: 'worn regularly', desc: 'the rest, forgotten', note: 'ainaa surfaces the rest' },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass-card"
                style={{ padding: '20px 22px', borderRadius: '16px' }}
              >
                <div className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--accent)', lineHeight: 1 }}>{stat.num}</div>
                <div className="font-mono-accent" style={{ fontSize: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '4px' }}>{stat.unit}</div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.5 }}>{stat.desc}</p>
                <p className="font-mono-accent" style={{ fontSize: '9px', color: 'var(--accent)', marginTop: '6px', letterSpacing: '0.06em' }}>{stat.note}</p>
              </div>
            ))}
          </motion.div>

          {/* Phone */}
          <motion.div
            style={{
              width: 'clamp(240px, 24vw, 320px)',
              aspectRatio: '9/19',
              borderRadius: '44px',
              border: '2px solid var(--border-hover)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 60px 120px rgba(0,0,0,0.5), 0 0 0 1px var(--border), inset 0 1px 0 rgba(255,255,255,0.1)',
              rotate,
              scale,
              y: phoneY,
              flexShrink: 0,
            }}
          >
            {/* Notch */}
            <div style={{ position: 'absolute', top: '14px', left: '50%', transform: 'translateX(-50%)', width: '88px', height: '9px', borderRadius: '999px', background: 'var(--bg-base)', zIndex: 10 }} />
            <AppScreen />

            {/* Screen reflection */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)', pointerEvents: 'none', zIndex: 5 }} />
          </motion.div>

          {/* Right callouts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '260px' }}
          >
            {[
              { label: 'Strategic Addition', body: '"White sneakers unlock 9 new outfits from what you already own."', accent: true },
              { label: 'Daily habit', body: 'Open once. Get dressed. Move. That\'s the entire interaction.', accent: false },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-card"
                style={{
                  padding: '20px 22px',
                  borderRadius: '16px',
                  borderColor: item.accent ? 'var(--accent)' : 'var(--border)',
                  background: item.accent ? 'var(--accent-dim)' : 'var(--bg-card)',
                }}
              >
                <p className="font-mono-accent" style={{ fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>{item.label}</p>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)', fontStyle: 'italic' }}>{item.body}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-mono-accent"
          style={{ textAlign: 'center', marginTop: 'clamp(40px, 6vh, 64px)', fontSize: '9px', letterSpacing: '0.14em', color: 'var(--text-muted)', textTransform: 'uppercase' }}
        >
          UI concept — subject to change · Built with care
        </motion.p>
      </div>
    </section>
  )
}
