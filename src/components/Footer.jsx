import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-left">
            <p>© {new Date().getFullYear()} NATNA Community Foundation TEST</p>
          </div>
          <nav className="footer-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/missions">Programs</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/donate">Donate</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
