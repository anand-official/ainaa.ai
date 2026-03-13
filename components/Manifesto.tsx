'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { EASE_OUT } from '@/lib/easing'

const LINE_1 = 'Not another app.'
const LINE_2 = 'A new category.'

function SplitReveal({ text, delay = 0, color = 'var(--text-primary)', italic = false }: {
  text: string
  delay?: number
  color?: string
  italic?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const chars = text.split('')

  return (
    <div ref={ref} style={{ display: 'inline', overflow: 'visible' }}>
      {chars.map((char, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', lineHeight: 'inherit' }}>
          <motion.span
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.028,
              ease: EASE_OUT,
            }}
            style={{
              display: 'inline-block',
              color,
              fontStyle: italic ? 'italic' : 'inherit',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

const PHILOSOPHY_WORDS = [
  'Category-defining',
  '◆',
  'One tap. Dressed.',
  '◆',
  'Intelligence, not algorithms',
  '◆',
  'Your wardrobe. Fully alive.',
  '◆',
  'Founding spots closing',
  '◆',
  'ainaa.ai',
  '◆',
  '4 days a year. Reclaimed.',
  '◆',
  'Not louder — smarter',
  '◆',
  'Precision over inspiration',
  '◆',
  'Category-defining',
  '◆',
  'One tap. Dressed.',
  '◆',
  'Intelligence, not algorithms',
  '◆',
  'Your wardrobe. Fully alive.',
  '◆',
  'Founding spots closing',
  '◆',
  'ainaa.ai',
  '◆',
  '4 days a year. Reclaimed.',
  '◆',
  'Not louder — smarter',
  '◆',
  'Precision over inspiration',
  '◆',
]

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Parallax background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-10%',
          zIndex: 0,
          scale: bgScale,
        }}
      >
        {/* Gradient mesh */}
        <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-surface)' }} />
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'var(--orb-1)', filter: 'blur(130px)', opacity: 0.25, animation: 'float1 20s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '5%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'var(--orb-3)', filter: 'blur(120px)', opacity: 0.2, animation: 'float2 26s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '40%', right: '30%', width: '30vw', height: '30vw', borderRadius: '50%', background: 'var(--orb-2)', filter: 'blur(100px)', opacity: 0.18, animation: 'float4 22s ease-in-out infinite' }} />
      </motion.div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1200px',
          padding: 'clamp(80px, 14vh, 160px) clamp(24px, 6vw, 80px)',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}
        >
          <div style={{ width: '40px', height: '1px', background: 'var(--accent)' }} />
          <span className="font-mono-accent" style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)' }}>The Principle</span>
          <div style={{ width: '40px', height: '1px', background: 'var(--accent)' }} />
        </motion.div>

        {/* Line 1 */}
        <div style={{ marginBottom: 'clamp(8px, 1.5vw, 24px)' }}>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 7.5vw, 110px)',
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              margin: 0,
              color: 'var(--text-secondary)',
            }}
          >
            <SplitReveal text={LINE_1} delay={0} color="var(--text-secondary)" />
          </h2>
        </div>

        {/* Line 2 */}
        <div style={{ marginBottom: 'clamp(48px, 8vh, 100px)' }}>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 7.5vw, 110px)',
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              margin: 0,
            }}
          >
            <SplitReveal text="The Personal Outfit " delay={0.35} color="var(--text-primary)" />
            <SplitReveal text="OS." delay={0.65} color="var(--accent)" italic />
          </h2>
        </div>

        {/* Supporting quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display"
          style={{
            fontSize: 'clamp(18px, 2.5vw, 30px)',
            fontStyle: 'italic',
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            margin: '0 auto',
            letterSpacing: '-0.01em',
          }}
        >
          &ldquo;The best style decision
          <br />
          is the one you don&apos;t have to make.&rdquo;
        </motion.p>
      </div>

      {/* Philosophy ticker */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          overflow: 'hidden',
          borderTop: '1px solid var(--border)',
          background: 'var(--marquee-bg)',
          padding: '10px 0',
        }}
      >
        <div className="marquee-track">
          {PHILOSOPHY_WORDS.map((w, i) => (
            <span
              key={i}
              className={w === '◆' ? '' : 'font-mono-accent'}
              style={{
                padding: w === '◆' ? '0 10px' : '0 28px',
                fontSize: w === '◆' ? '10px' : '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: w === '◆' ? 'var(--accent)' : 'var(--text-muted)',
                whiteSpace: 'nowrap',
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
