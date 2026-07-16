import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import ContactPage from './pages/Contact'
import Missions from './pages/Missions'
import Donate from './pages/Donate'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'
import Portfolio from './components/Portfolio'
import ProjectNatnaAi from './pages/ProjectNatnaAi'
import ProjectMutualAid from './pages/ProjectMutualAid'
import WhyTigray from './pages/WhyTigray'

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/missions" element={<Portfolio />} />
          <Route path="/projects/natna-ai" element={<ProjectNatnaAi />} />
          <Route path="/projects/mutual-aid" element={<ProjectMutualAid />} />
          <Route path="/why-tigray" element={<WhyTigray />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
