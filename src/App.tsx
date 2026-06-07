import { useCallback, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { NekoLoader } from './components/NekoLoader'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Ticker } from './components/Ticker'
import { DataPoints } from './components/DataPoints'
import { Intro } from './components/Intro'
import { BodyFuture } from './components/BodyFuture'
import { Protocols } from './components/Protocols'
import { Features } from './components/Features'
import { Testimonials } from './components/Testimonials'
import { Press } from './components/Press'
import { HomeClosing } from './components/HomeClosing'
import { UnderConstruction } from './components/UnderConstruction'
import { Footer } from './components/Footer'
import { useReveal } from './hooks/useReveal'
import { useNavScroll } from './hooks/useNavScroll'
import { useCounterReveal } from './hooks/useCounterReveal'
import { toasterOptions } from './utils/toast'
import './App.css'

function App() {
  const [loaderDone, setLoaderDone] = useState(false)
  const [siteVisible, setSiteVisible] = useState(false)
  const [heroActive, setHeroActive] = useState(false)

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true)
    setTimeout(() => {
      setSiteVisible(true)
      setTimeout(() => setHeroActive(true), 500)
    }, 200)
  }, [])

  useNavScroll()
  useReveal(siteVisible)
  useCounterReveal(siteVisible)

  return (
    <>
      {!loaderDone && <NekoLoader onComplete={handleLoaderComplete} />}

      <div className={`site ${siteVisible ? 'site--visible' : ''}`}>
        <a href="#main-content" className="skip-link font-label">
          Skip to content
        </a>
        <Nav />
        <main id="main-content">
          <Hero active={heroActive} />
          <Ticker />
          <DataPoints />
          <Intro />
          <BodyFuture />
          <Protocols />
          <Features />
          <Testimonials />
          <Press />
          <HomeClosing />
          <UnderConstruction />
        </main>
        <Footer />
      </div>

      <Toaster {...toasterOptions} />
    </>
  )
}

export default App
