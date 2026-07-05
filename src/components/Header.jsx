import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import natna_logo from '../assets/natna_logo_new.png';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="site-header compact">
        <div className="container nav-bar">
          <Link to="/" className="logo-link">
            <img src={natna_logo} alt="NATNA" className="logo" />
            <div className="logo-text">
              <span className="logo-title">NATNA</span>
              <span className="logo-subtitle">CHILDREN'S FOUNDATION</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="nav-links desktop-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/missions">Programs & Projects</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/donate">Donate</Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link to="/missions" onClick={() => setIsMobileMenuOpen(false)}>Programs & Projects</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
          <Link to="/donate" onClick={() => setIsMobileMenuOpen(false)}>Donate</Link>
        </nav>
      </div>
    </>
  )
}
