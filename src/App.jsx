import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import ContactPage from './pages/Contact'
import Donate from './pages/Donate'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'
import Portfolio from './components/Portfolio'
import ProjectNatnaAi from './pages/ProjectNatnaAi'
import ProjectMutualAid from './pages/ProjectMutualAid'
import ProjectAshenda from './pages/ProjectAshenda'
import WhyTigray from './pages/WhyTigray'
import Updates from './pages/Updates'

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
          <Route path="/projects/ashenda" element={<ProjectAshenda />} />
          <Route path="/context" element={<WhyTigray />} />
          <Route path="/why-tigray" element={<Navigate to="/context" replace />} />
          <Route path="/updates" element={<Updates />} />
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
