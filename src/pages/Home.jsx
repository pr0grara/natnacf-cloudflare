import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import ImpactDonate from '../components/ImpactDonate'
import Portfolio from '../components/Portfolio'
import AboutSection from '../components/AboutSection'
import Contact from '../components/Contact'

function InstagramFollow() {
  useEffect(() => {
    if (document.querySelector('script[src*="platform.instagram.com"]')) return
    const script = document.createElement('script')
    script.src = 'https://platform.instagram.com/en_US/embeds.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process()
      }
    }
  }, [])

  return (
    <section className="ig-follow-section">
      <a
        href="https://www.instagram.com/natnacf/"
        target="_blank"
        rel="noopener noreferrer"
        className="ig-follow-link"
      >
        Instagram — @natnacf
      </a>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <div className="home-container">
        <Hero />
        <ImpactDonate />
        <InstagramFollow />
        <Portfolio />
        <AboutSection />
        <Contact />
      </div>
    </>
  )
}
