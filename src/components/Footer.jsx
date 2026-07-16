import React from 'react'
import { Link } from 'react-router-dom'
import { FiInstagram } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-left">
            <p>© {new Date().getFullYear()} NATNA Children's Foundation</p>
          </div>
          <nav className="footer-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/missions">Programs</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/donate">Donate</Link>
            <a
              href="https://www.instagram.com/natnacf/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-ig"
            >
              <FiInstagram size={18} />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
