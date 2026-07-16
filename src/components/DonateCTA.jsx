import React from 'react'

export default function DonateCTA() {
  return (
    <section className="donate-cta">
      <div className="container">
        <h2>Make a Difference Today</h2>
        <div className="donate-buttons">
          <a href="https://buy.stripe.com/9B68wRdoLgOS5TW7io3wQ03" className="donate-btn" target="_blank" rel="noopener noreferrer">$25/mo</a>
          <a href="https://buy.stripe.com/9B6cN7fwT9mq824byE3wQ02" className="donate-btn featured" target="_blank" rel="noopener noreferrer">$50/mo</a>
          <a href="https://buy.stripe.com/9B65kFaczdCG1DGbyE3wQ04" className="donate-btn" target="_blank" rel="noopener noreferrer">$100/mo</a>
        </div>
        <p className="donate-note">All donations are tax-deductible. We are a registered 501(c)(3).</p>
      </div>
    </section>
  )
}
