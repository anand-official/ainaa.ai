'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 600,
  y: (Math.random() - 0.5) * 400,
  scale: Math.random() * 0.8 + 0.3,
  rotate: Math.random() * 360,
  delay: Math.random() * 0.4,
  char: ['✦', '◆', '◎', '◈'][Math.floor(Math.random() * 4)],
}))

export default function ThankYouPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number; y: number; vx: number; vy: number;
      alpha: number; size: number; color: string
    }[] = []
    const colors = ['#C9A97A', '#F2EDE6', '#8C8680', '#3B0764']

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.6) * 10,
        alpha: 1,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.12
        p.alpha -= 0.012
        if (p.alpha <= 0) return
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      frame++
      if (frame < 140) requestAnimationFrame(animate)
    }
    animate()
  }, [])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' as const },
    },
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-base)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Navbar />

      {/* Canvas confetti */}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* Background orb */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'var(--accent)',
          filter: 'blur(160px)',
          opacity: 0.08,
          pointerEvents: 'none',
        }}
      />

      {/* Floating symbol particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0, x: '50vw', y: '50vh' }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, p.scale, 0],
            x: `calc(50vw + ${p.x}px)`,
            y: `calc(50vh + ${p.y}px)`,
            rotate: p.rotate,
          }}
          transition={{ duration: 1.8, delay: p.delay, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            fontSize: '14px',
            color: 'var(--accent)',
            pointerEvents: 'none',
            zIndex: 5,
          }}
        >
          {p.char}
        </motion.div>
      ))}

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(100px, 14vh, 160px) clamp(24px, 6vw, 80px)',
          textAlign: 'center',
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '600px' }}
        >
          {/* Icon */}
          <motion.div
            variants={itemVariants}
            style={{
              fontSize: '48px',
              marginBottom: '32px',
              color: 'var(--accent)',
              lineHeight: 1,
            }}
          >
            ✦
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display"
            style={{
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: '12px',
            }}
          >
            Founding spot{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>secured.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              marginBottom: '48px',
              fontWeight: 300,
            }}
          >
            You&apos;re one of our founding members — not just an email on a list.
            You get lifetime benefits, beta access, and a direct line to the team.
            This is the start of something real.
          </motion.p>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            style={{
              width: '60px',
              height: '1px',
              background: 'var(--accent)',
              margin: '0 auto 40px',
            }}
          />

          {/* Share nudge */}
          <motion.div variants={itemVariants}>
            <p
              className="font-mono-accent"
              style={{
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '16px',
              }}
            >
              Tell a friend
            </p>
            <div
              style={{
                padding: '16px 24px',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                background: 'var(--bg-elevated)',
                display: 'inline-block',
                cursor: 'pointer',
              }}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'ainaa.ai — Clarity before you leave the house.',
                    text: 'I just joined the waitlist for ainaa.ai — a personal outfit operating system. Check it out.',
                    url: 'https://ainaa.ai',
                  })
                } else {
                  navigator.clipboard.writeText('https://ainaa.ai').then(() => alert('Link copied!'))
                }
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                }}
              >
                Share ainaa.ai →
              </span>
            </div>
          </motion.div>

          {/* Back link */}
          <motion.div variants={itemVariants} style={{ marginTop: '40px' }}>
            <Link
              href="/"
              className="link-draw"
              style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                letterSpacing: '0.06em',
              }}
            >
              ← Back to ainaa.ai
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
