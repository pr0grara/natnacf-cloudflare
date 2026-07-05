import React from 'react'
import Hero from '../components/Hero'
import ImpactDonate from '../components/ImpactDonate'
import Portfolio from '../components/Portfolio'
import AboutSection from '../components/AboutSection'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <div className="home-container">
        <Hero />
        <ImpactDonate />
        <Portfolio />
        <AboutSection />
        <Contact />
      </div>
      <Footer />
    </>
  )
}
