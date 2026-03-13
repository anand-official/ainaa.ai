'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LETTERS = ['a', 'i', 'n', 'a', 'a']

export default function PageLoader() {
  const [done, setDone] = useState(true)

  useEffect(() => {
    const seen = sessionStorage.getItem('ainaa-loader-seen') === 'true'
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (seen || reduced) {
      setDone(true)
      return
    }

    setDone(false)
    const t = setTimeout(() => {
      setDone(true)
      sessionStorage.setItem('ainaa-loader-seen', 'true')
    }, 1100)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: 'blur(12px)',
          }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#060606',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '40px',
          }}
        >
          {/* Logo letter-by-letter reveal */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', overflow: 'hidden' }}>
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: '120%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display"
                style={{
                  fontSize: 'clamp(60px, 10vw, 100px)',
                  fontWeight: 300,
                  letterSpacing: '-0.04em',
                  color: '#F2EDE6',
                  lineHeight: 1,
                  display: 'inline-block',
                }}
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="font-mono-accent"
              style={{
                fontSize: 'clamp(16px, 2.5vw, 28px)',
                color: '#C9A97A',
                letterSpacing: '0.04em',
                marginLeft: '2px',
                lineHeight: 1,
              }}
            >
              .ai
            </motion.span>
          </div>

          {/* Tagline fade in */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="font-mono-accent"
            style={{
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(242,237,230,0.3)',
            }}
          >
            Personal Outfit OS
          </motion.p>

          {/* Loading bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.7, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, #C9A97A, rgba(201,169,122,0.4))',
              transformOrigin: 'left center',
            }}
          />

          {/* Corner dots */}
          {[
            { top: '24px', left: '24px' },
            { top: '24px', right: '24px' },
            { bottom: '24px', left: '24px' },
            { bottom: '24px', right: '24px' },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'rgba(201,169,122,0.4)',
                ...pos,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
