import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import ContactPage from './pages/Contact'
import Missions from './pages/Missions'
import Donate from './pages/Donate'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import Portfolio from './components/Portfolio'
import ProjectNatnaAi from './pages/ProjectNatnaAi'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/missions" element={<Portfolio />} />
          <Route path="/projects/natna-ai" element={<ProjectNatnaAi />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
