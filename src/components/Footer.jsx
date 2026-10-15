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
            <p className="footer-tax">A registered 501(c)(3) nonprofit. All donations are tax&#8209;deductible.</p>
          </div>
          <nav className="footer-nav">
            <Link to="/">Home</Link>
            <Link to="/missions">Programs & Projects</Link>
            <Link to="/donate">Donate</Link>
            <Link to="/about">About Us</Link>
            <Link to="/context">Context</Link>
            <Link to="/contact">Contact Us</Link>
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
