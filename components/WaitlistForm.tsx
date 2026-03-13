'use client'

import { useState, useRef, useCallback, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE_SPRING } from '@/lib/easing'

interface WaitlistFormProps {
  size?: 'default' | 'large'
  placeholder?: string
}

type FormState = 'idle' | 'loading' | 'success' | 'error' | 'duplicate'

export default function WaitlistForm({
  size = 'default',
  placeholder = 'Enter your email',
}: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [position, setPosition] = useState<number | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const emailInputId = useId()

  const isLarge = size === 'large'

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.25
    const dy = (e.clientY - cy) * 0.25
    btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.02)`
    btn.style.boxShadow = `0 0 40px var(--accent-glow)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const btn = buttonRef.current
    if (!btn) return
    btn.style.transform = 'translate(0, 0) scale(1)'
    btn.style.boxShadow = 'none'
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    setState('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.status === 409) {
        setState('duplicate')
      } else if (res.ok) {
        setState('success')
        setPosition(data.position ?? null)
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  const inputHeight = isLarge ? '56px' : '48px'
  const fontSize = isLarge ? '15px' : '14px'
  const btnPadding = isLarge ? '0 32px' : '0 24px'
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  return (
    <AnimatePresence mode="wait">
      {state === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_SPRING }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            background: 'var(--accent-dim)',
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
            style={{ fontSize: '28px', lineHeight: 1 }}
          >
            ✦
          </motion.div>
          <p className="font-display" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--accent)' }}>
            Founding spot secured.
          </p>
          {position && (
            <p className="font-mono-accent" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
              Member #{position} · Welcome to the revolution
            </p>
          )}
        </motion.div>
      ) : state === 'duplicate' ? (
        <motion.div
          key="duplicate"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            padding: '16px 24px',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            background: 'var(--bg-elevated)',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            You&apos;re already on the list. We&apos;ll see you soon. ✦
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            display: 'flex',
            gap: '8px',
            width: '100%',
            maxWidth: isLarge ? '520px' : '460px',
            flexWrap: 'wrap',
          }}
        >
          <label htmlFor={emailInputId} style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
            Email address
          </label>
          <input
            id={emailInputId}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            autoComplete="email"
            inputMode="email"
            aria-invalid={email.length > 0 && !isValidEmail}
            className="input-glow"
            style={{
              flex: 1,
              minWidth: '180px',
              height: inputHeight,
              borderRadius: '999px',
              padding: '0 20px',
              fontSize,
            }}
          />
          <button
            ref={buttonRef}
            type="submit"
            disabled={state === 'loading' || !isValidEmail}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="btn-primary"
            data-cursor="button"
            data-cursor-label="Join"
            style={{
              height: inputHeight,
              padding: btnPadding,
              fontSize,
              whiteSpace: 'nowrap',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <AnimatePresence mode="wait">
              {state === 'loading' ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <span
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      border: '2px solid currentColor',
                      borderTopColor: 'transparent',
                      display: 'inline-block',
                      animation: 'spin 0.7s linear infinite',
                    }}
                  />
                  Joining...
                </motion.span>
              ) : (
                <motion.span
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Claim Your Spot →
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          {email.length > 0 && !isValidEmail && (
            <p
              style={{
                width: '100%',
                fontSize: '12px',
                color: 'var(--text-muted)',
                paddingLeft: '16px',
                marginTop: '4px',
              }}
            >
              Enter a valid email address.
            </p>
          )}
          {state === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                width: '100%',
                fontSize: '12px',
                color: '#F87171',
                paddingLeft: '16px',
                marginTop: '4px',
              }}
            >
              Something went wrong. Please try again.
            </motion.p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  )
}
