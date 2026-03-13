'use client'

import { motion } from 'framer-motion'

const LINKS = [
  { label: 'Privacy', href: '#' },
  { label: 'Contact', href: 'mailto:hello@ainaa.ai' },
]

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-surface)',
      }}
    >
      {/* Big brand quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7 }}
        style={{
          padding: 'clamp(60px, 8vh, 100px) clamp(24px, 6vw, 80px)',
          maxWidth: '1200px',
          margin: '0 auto',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <p
          className="font-display"
          style={{
            fontSize: 'clamp(24px, 4vw, 52px)',
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'var(--text-secondary)',
            maxWidth: '780px',
          }}
        >
          The world&apos;s most intentional people
          <br />
          deserve a wardrobe that{' '}
          <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>
            thinks with them.
          </em>
        </p>
      </motion.div>

      {/* Footer bottom */}
      <div
        style={{
          padding: 'clamp(24px, 3vh, 36px) clamp(24px, 6vw, 80px)',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1px' }}>
          <span
            className="font-display"
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            ainaa
          </span>
          <span
            className="font-mono-accent"
            style={{
              fontSize: '9px',
              color: 'var(--accent)',
              letterSpacing: '0.05em',
            }}
          >
            .ai
          </span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="link-draw"
              style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                letterSpacing: '0.06em',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          className="font-mono-accent"
          style={{
            fontSize: '9px',
            letterSpacing: '0.1em',
            color: 'var(--text-muted)',
          }}
        >
          © {new Date().getFullYear()} ainaa.ai · All rights reserved
        </p>
      </div>
    </footer>
  )
}
