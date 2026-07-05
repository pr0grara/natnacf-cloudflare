import React from 'react'
import { Link } from 'react-router-dom'

export default function DonateCTA() {
  return (
    <section className="donate-cta">
      <div className="container">
        <h2>Make a Difference Today</h2>
        <div className="donate-buttons">
          <Link to="/donate" className="donate-btn">$25</Link>
          <Link to="/donate" className="donate-btn featured">$50</Link>
          <Link to="/donate" className="donate-btn">$100</Link>
        </div>
        <p className="donate-note">All donations are tax-deductible. We are a registered 501(c)(3).</p>
      </div>
    </section>
  )
}
