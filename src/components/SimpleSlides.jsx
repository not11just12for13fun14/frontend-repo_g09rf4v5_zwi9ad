import { useEffect, useRef, useState } from 'react'

const BLUE = '#003A8C'
const YELLOW = '#FFD400'

export default function SimpleSlides() {
  const slides = [
    'Ecco, finalmente la nuova app è pronta!',
    'Scopri libri e poesie con la Montanari App',
    'Immergiti in contenuti unici e poetici',
  ]

  const [index, setIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    // Start after 1s like in the snippet
    const start = setTimeout(() => setStarted(true), 1000)
    return () => clearTimeout(start)
  }, [])

  useEffect(() => {
    if (!started) return
    if (index < slides.length) {
      // advance every 3s until the last text slide
      if (index < slides.length) {
        timeoutRef.current = setTimeout(() => {
          setIndex((i) => Math.min(i + 1, slides.length))
        }, 3000)
      }
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [started, index, slides.length])

  const isLast = index >= slides.length

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: YELLOW, fontFamily: 'Arial, sans-serif' }}
    >
      {/* Slides */}
      {slides.map((text, i) => {
        const active = i === index
        return (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center px-6 text-center"
            style={{
              opacity: active ? 1 : 0,
              transition: 'opacity 1s ease',
              color: BLUE,
            }}
          >
            <div className="max-w-3xl">
              <div className="text-[1.75rem] md:text-4xl font-semibold leading-snug">{text}</div>
            </div>
          </div>
        )
      })}

      {/* Final slide with CTA */}
      <div
        className="absolute inset-0 flex items-center justify-center px-6 text-center"
        style={{
          opacity: isLast ? 1 : 0,
          transition: 'opacity 1s ease',
          color: BLUE,
        }}
      >
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={() => window.open('https://drive.google.com/file/d/1mCb6fNwNQSyy179mG34dYvK8IbBV3pqr/view?usp=sharing', '_blank')}
            className="px-8 py-4 rounded-xl text-xl md:text-2xl font-semibold shadow-lg"
            style={{ backgroundColor: BLUE, color: YELLOW, transform: isLast ? 'scale(1)' : 'scale(0.8)', transition: 'all 1s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Scarica l’App
          </button>
        </div>
      </div>
    </div>
  )
}
