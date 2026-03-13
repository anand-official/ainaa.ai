'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const { scrollY } = useScroll()
  const [magStyle, setMagStyle] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const narrow = window.matchMedia('(max-width: 900px)').matches
    setEnabled(finePointer && !narrow)
  }, [])

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (typeof window !== 'undefined' && enabled) {
      setVisible(y > window.innerHeight * 0.75 && !dismissed)
    }
  })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = btnRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    setMagStyle({ x: dx * 0.3, y: dy * 0.3 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMagStyle({ x: 0, y: 0 })
  }, [])

  return (
    <AnimatePresence>
      {enabled && visible && (
        <motion.div
          key="floating-cta"
          initial={{ y: 24, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 24, opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            position: 'fixed',
            bottom: 'clamp(20px, 3vh, 36px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9800,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {/* Main button */}
          <motion.a
            ref={btnRef}
            href="#waitlist"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: magStyle.x, y: magStyle.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              fontSize: '12px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: 'var(--bg-base)',
              fontFamily: 'var(--font-space-mono)',
              fontWeight: 700,
              boxShadow: '0 8px 40px var(--accent-glow), 0 2px 12px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(20px)',
              whiteSpace: 'nowrap',
            }}
          >
            {/* Pulsing dot */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'currentColor',
                opacity: 0.7,
                flexShrink: 0,
              }}
            />
            Claim Your Founding Spot
            <span style={{ opacity: 0.7 }}>→</span>
          </motion.a>

          {/* Dismiss */}
          <motion.button
            onClick={() => { setDismissed(true); setVisible(false) }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Dismiss"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              flexShrink: 0,
            }}
          >
            ×
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
