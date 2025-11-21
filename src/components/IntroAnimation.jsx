import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BLUE = '#003A8C'
const YELLOW = '#FFD400'

function BookLogo({ size = 120 }) {
  // Simple poetic book-like logo using SVG
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Montanari App"
    >
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={BLUE} stopOpacity="1" />
          <stop offset="100%" stopColor={BLUE} stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="120" height="120" rx="18" fill="url(#g)" opacity="0.08" />
      <g transform="translate(20,20)">
        <path d="M0 10c12-8 28-8 40 0v70c-12-8-28-8-40 0z" fill={BLUE} />
        <path d="M40 10c12-8 28-8 40 0v70c-12-8-28-8-40 0z" fill={BLUE} opacity="0.9" />
        <path d="M0 10c12-8 28-8 40 0" stroke={YELLOW} strokeWidth="3" fill="none" opacity="0.6" />
        <path d="M40 10c12-8 28-8 40 0" stroke={YELLOW} strokeWidth="3" fill="none" opacity="0.6" />
      </g>
    </svg>
  )
}

function FloatingPage({ delay = 0, x = 0, y = 0, rotate = 0, scale = 1, opacity = 0.15 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: y + 20, x, rotate: rotate - 5, scale: scale * 0.96 }}
      animate={{ opacity, y, x, rotate, scale }}
      transition={{ duration: 1.4, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className="absolute"
      style={{ filter: 'blur(0.5px)' }}
    >
      <div
        className="w-40 h-56 md:w-56 md:h-72 rounded-md"
        style={{
          background: `linear-gradient(135deg, ${BLUE} 0%, rgba(0,58,140,0.85) 60%, rgba(0,58,140,0.6) 100%)`,
          transform: 'skewY(-4deg)',
          boxShadow: '0 20px 40px rgba(0,58,140,0.25)',
          opacity,
        }}
      />
    </motion.div>
  )
}

export default function IntroAnimation() {
  const [showCTA, setShowCTA] = useState(false)
  const [dimBackdrop, setDimBackdrop] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowCTA(true), 5200) // CTA after ~5.2s
    const t2 = setTimeout(() => setDimBackdrop(true), 5200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: YELLOW }}>
      {/* Blue decorative pages */}
      <FloatingPage delay={0.3} x={-40} y={-30} rotate={-12} scale={1} opacity={0.15} />
      <FloatingPage delay={0.6} x={-140} y={80} rotate={-8} scale={0.9} opacity={0.12} />
      <FloatingPage delay={0.8} x={120} y={-60} rotate={10} scale={1.05} opacity={0.12} />
      <FloatingPage delay={1.0} x={220} y={120} rotate={6} scale={0.95} opacity={0.1} />
      <FloatingPage delay={1.2} x={-220} y={160} rotate={-4} scale={1.1} opacity={0.1} />

      {/* Soft vignette for depth */}
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: 'inset 0 0 120px rgba(0,0,0,0.08)' }} />

      {/* Center content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-3xl w-full text-center">
          {/* Logo fade-in */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="mx-auto mb-6"
          >
            <BookLogo size={112} />
          </motion.div>

          {/* Title / texts */}
          <div className="space-y-3">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="text-[22px] leading-snug md:text-3xl font-semibold text-[color:var(--blue)]"
              style={{ color: BLUE }}
            >
              Ecco, finalmente la nuova app è pronta!
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.9 }}
              className="text-lg md:text-2xl font-medium text-[color:var(--blue)]/90"
              style={{ color: BLUE, opacity: 0.9 }}
            >
              Scopri la Montanari App e immergiti nei libri e nella poesia
            </motion.p>
          </div>

          {/* Gentle underline flourish */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 3.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 h-[3px] w-24 origin-left rounded-full"
            style={{ backgroundColor: BLUE }}
          />

          {/* CTA Button */}
          <AnimatePresence>
            {showCTA && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mt-10"
              >
                <a
                  href="https://drive.google.com/file/d/1mCb6fNwNQSyy179mG34dYvK8IbBV3pqr/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(0,58,140,0.35)' }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                      boxShadow: [
                        '0 10px 25px rgba(0,58,140,0.25)',
                        '0 14px 34px rgba(0,58,140,0.35)',
                        '0 10px 25px rgba(0,58,140,0.25)'
                      ],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg md:text-xl font-semibold text-white"
                    style={{ backgroundColor: BLUE }}
                  >
                    Scarica l’app
                  </motion.button>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Dim rest of animation when CTA appears */}
      <AnimatePresence>
        {dimBackdrop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute inset-0"
            style={{ background: '#000' }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
