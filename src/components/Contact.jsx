import React from 'react'

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2>Get Involved</h2>
        <p>Join our mission to empower communities and create lasting change. Whether you want to volunteer, partner with us, or learn more about our work, we'd love to hear from you.</p>
        
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
          </div>
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Tell us how you'd like to get involved or ask us anything..." rows="5" required />
          <button className="btn large" type="submit">Send Message</button>
        </form>
      </div>
    </section>
  )
}
