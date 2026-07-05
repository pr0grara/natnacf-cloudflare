import React from 'react'

const stats = [
  { number: '500+', label: 'Youth Empowered' },
  { number: '25+', label: 'Communities Served' },
  { number: '1,200+', label: 'Families Supported' },
  { number: '50+', label: 'Educational Programs' }
]

export default function ImpactStats() {
  return (
    <section className="impact-stats">
      <div className="container">
        <h2>Our Impact</h2>
        <p>Measurable change through community-centered action</p>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}