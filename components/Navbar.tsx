'use client'

import { useTheme } from './ThemeProvider'
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'
import { EASE_STANDARD } from '@/lib/easing'

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const { scrollY, scrollYProgress } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  const rawProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const scaleX = useTransform(rawProgress, [0, 1], [0, 1])

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40)
  })

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_STANDARD }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 clamp(14px, 3vw, 32px)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: scrolled ? 'var(--bg-surface)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'background-color 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease',
      }}
    >
      {/* Scroll progress bar */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, var(--accent), var(--accent-glow))',
          scaleX,
          transformOrigin: 'left center',
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
      {/* Logo */}
      <motion.a
        href="/"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'baseline',
          gap: '1px',
        }}
      >
        <span
          className="font-display"
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          ainaa
        </span>
        <span
          className="font-mono-accent"
          style={{
            fontSize: '0.7rem',
            color: 'var(--accent)',
            letterSpacing: '0.05em',
            fontWeight: 400,
          }}
        >
          .ai
        </span>
      </motion.a>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span
          className="font-mono-accent hide-xs"
          style={{
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          Coming Soon
        </span>

        {/* Theme Toggle */}
        <motion.button
          onClick={toggle}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
          data-cursor="button"
          data-cursor-label="Theme"
          style={{
            width: '44px',
            height: '24px',
            borderRadius: '999px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            position: 'relative',
            flexShrink: 0,
            padding: 0,
            outline: 'none',
          }}
        >
          <motion.div
            layout
            style={{
              position: 'absolute',
              top: '2px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '9px',
              left: theme === 'dark' ? '2px' : '22px',
              transition: 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </motion.div>
        </motion.button>
      </div>
    </motion.nav>
  )
}
