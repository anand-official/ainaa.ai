'use client'

import { motion } from 'framer-motion'

const ITEMS_1 = [
  'Personal Outfit OS',
  '✦',
  '4 days a year reclaimed',
  '✦',
  'ainaa.ai',
  '✦',
  'Category-defining',
  '✦',
  '2,400+ founding members',
  '✦',
  'One tap. Dressed.',
  '✦',
  'Intelligence over inspiration',
  '✦',
]

const ITEMS_2 = [
  'Founding spots closing',
  '◆',
  '500 lifetime members max',
  '◆',
  'Not a newsletter',
  '◆',
  'A new standard',
  '◆',
  'Your wardrobe. Fully alive.',
  '◆',
  'ainaa.ai',
  '◆',
  'Built different. On purpose.',
  '◆',
]

function MarqueeItem({ text }: { text: string }) {
  const isDot = text === '✦' || text === '◆'
  return (
    <span
      style={{
        padding: isDot ? '0 8px' : '0 32px',
        fontSize: isDot ? '10px' : '11px',
        letterSpacing: isDot ? '0' : '0.12em',
        textTransform: 'uppercase',
        color: isDot ? 'var(--accent)' : 'var(--text-muted)',
        fontWeight: isDot ? 400 : 500,
        whiteSpace: 'nowrap',
      }}
      className={isDot ? '' : 'font-mono-accent'}
    >
      {text}
    </span>
  )
}

export default function Marquee() {
  const doubled1 = [...ITEMS_1, ...ITEMS_1]
  const doubled2 = [...ITEMS_2, ...ITEMS_2]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8 }}
      style={{
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--marquee-bg)',
        padding: '0',
      }}
    >
      {/* Track 1 — left */}
      <div
        style={{
          overflow: 'hidden',
          borderBottom: '1px solid var(--border)',
          padding: '12px 0',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="marquee-track">
          {doubled1.map((item, i) => (
            <MarqueeItem key={i} text={item} />
          ))}
        </div>
      </div>

      {/* Track 2 — right */}
      <div
        style={{
          overflow: 'hidden',
          padding: '12px 0',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="marquee-track-reverse">
          {doubled2.map((item, i) => (
            <MarqueeItem key={i} text={item} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
