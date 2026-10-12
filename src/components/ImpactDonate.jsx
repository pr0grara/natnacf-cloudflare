import React from 'react'

const stats = [
  { number: '500+', label: 'Youth Empowered' },
  { number: '15+', label: 'Communities' },
  { number: '1,200+', label: 'Families Supported' },
  { number: '10+', label: 'Programs' }
]

export default function ImpactDonate() {
  return (
    <section className="impact-donate">
      <div className="container">
        <div className="impact-donate-grid">
          <div className="impact-side">
            <h2>Our Impact</h2>
            <p className="impact-subtitle">Measurable change through community-centered action</p>
            <div className="stats-row">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-num">{stat.number}</span>
                  <span className="stat-lbl">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="donate-side">
            <h2>Support Our Mission</h2>
            <p className="donate-subtitle">Your contribution directly transforms lives</p>
            <div className="donate-btns">
              <a href="https://donate.stripe.com/9B600lesP6ae2HK6ek3wQ07" className="donate-amount primary" target="_blank" rel="noopener noreferrer">Donate</a>
            </div>
            <p className="donate-tax">Tax-deductible 501(c)(3)</p>
          </div>
        </div>
      </div>
    </section>
  )
}
