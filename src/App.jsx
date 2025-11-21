import { useState } from 'react'
import IntroAnimation from './components/IntroAnimation'
import SimpleSlides from './components/SimpleSlides'

function App() {
  const [mode] = useState('pro') // 'pro' for Framer Motion, 'simple' for CSS slides

  return (
    <div className="min-h-screen">
      {mode === 'pro' ? <IntroAnimation /> : <SimpleSlides />}
    </div>
  )
}

export default App
