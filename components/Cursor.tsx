'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'button' | 'text'

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [state, setCursorState] = useState<CursorState>('default')
  const [label, setLabel] = useState('')
  const [isTouch, setIsTouch] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Main dot — snappy
  const dotX = useSpring(mouseX, { stiffness: 600, damping: 40, mass: 0.3 })
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 40, mass: 0.3 })

  // Ring — laggy for trail effect
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.5 })

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true)
      return
    }

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const el = target.closest('button, a, [data-cursor], input, [role="button"]') as HTMLElement | null

      if (el) {
        const cursorType = el.getAttribute('data-cursor') as CursorState | null
        setCursorState(cursorType ?? 'hover')
        const cursorLabel = el.getAttribute('data-cursor-label') ?? ''
        setLabel(cursorLabel)
      } else {
        setCursorState('default')
        setLabel('')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener('mouseover', onMouseOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mouseover', onMouseOver)
    }
  }, [mouseX, mouseY, visible])

  if (isTouch) return null

  const ringSize = state === 'hover' || state === 'button' ? 52 : state === 'text' ? 80 : 32
  const ringOpacity = state === 'hover' || state === 'button' ? 0.7 : 0.3
  const dotSize = state === 'hover' || state === 'button' ? 6 : 8

  return (
    <>
      {/* Hide native cursor via global style */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 99998,
          pointerEvents: 'none',
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: `1.5px solid var(--accent)`,
          opacity: visible ? ringOpacity : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              fontFamily: 'var(--font-space-mono), monospace',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      {/* Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 99999,
          pointerEvents: 'none',
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          opacity: visible ? 1 : 0,
          mixBlendMode: state === 'text' ? 'difference' : 'normal',
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      />
    </>
  )
}
