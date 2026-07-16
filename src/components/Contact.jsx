import React from 'react'
import classroomPhoto from '../assets/natna-ai-classroom2.jpg'

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2>Get Involved</h2>
        <p>Join our mission to empower communities and create lasting change. Whether you want to volunteer, partner with us, or learn more about our work, we'd love to hear from you.</p>

        <button
          className="btn-primary large"
          onClick={() => window.location.href = 'mailto:natnachildrensfoundation@gmail.com?subject=Getting%20Involved%20with%20NATNA'}
        >
          Send Us an Email
        </button>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a
            href="https://www.instagram.com/natnacf/"
            target="_blank"
            rel="noopener noreferrer"
            className="ig-follow-link"
          >
            Instagram — @natnacf
          </a>
        </div>

        <div className="contact-hero-image">
          <img src={classroomPhoto} alt="Students learning in classroom" />
        </div>
      </div>
    </section>
  )
}
