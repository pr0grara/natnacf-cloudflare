import React, { useState, useEffect } from 'react'
import { FiCheck, FiCopy } from 'react-icons/fi'
import donateGif from '../assets/donate_video.gif'
import impactImage from '../assets/natna_impact.jpg'

const ZELLE_EMAIL = 'natnachildrensfoundation@gmail.com'

function ZelleSection() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(ZELLE_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="dn-zelle">
      <p className="dn-zelle__label">Prefer to donate directly?</p>
      <button
        className="zelle-btn"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className="zelle-logo">Zelle</span>
        Pay with Zelle
      </button>
      {open && (
        <div className="zelle-info">
          <p>Send your donation via Zelle to:</p>
          <div className="zelle-email">
            <span>{ZELLE_EMAIL}</span>
            <button onClick={copyEmail} className="copy-btn" type="button">
              {copied
                ? <><FiCheck size={14} /> Copied</>
                : <><FiCopy size={14} /> Copy</>}
            </button>
          </div>
          <p className="zelle-note">
            Open your bank app, select Zelle, and send to the email above.
          </p>
        </div>
      )}
    </div>
  )
}

export default function Donate() {
  useEffect(() => {
    if (document.querySelector('script[src*="pricing-table.js"]')) return
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/pricing-table.js'
    script.async = true
    document.head.appendChild(script)
  }, [])

  return (
    <section className="dn-page">
      {/* Hero */}
      <div className="dn-hero">
        <h1 className="dn-hero__title">Support Our Mission</h1>
        <p className="dn-hero__sub">
          Your contribution directly empowers communities
          and transforms lives across Tigray.
        </p>
      </div>

      {/* Quick give — $5/month */}
      <div className="dn-quick-give">
        <a
          href="https://buy.stripe.com/4gMcN784r4262HKfOU3wQ06"
          target="_blank"
          rel="noopener noreferrer"
          className="dn-quick-give__btn"
        >
          <span className="dn-quick-give__amt">$5</span>
          <span className="dn-quick-give__label">/ month</span>
        </a>
        <p className="dn-quick-give__hint">The easiest way to help — recurring support that adds up.</p>
      </div>

      {/* Pricing table */}
      <div className="dn-pricing">
        <stripe-pricing-table
          pricing-table-id="prctbl_1TIYoIQQkg3V48Jv4koytm1S"
          publishable-key="pk_live_51T65F9QQkg3V48JvfdqFzVDxV3Dd3DfGKPQACXQ0GpSWaaOREXu2eyhSj6FeAnJBv4NLrdBJdchhkozyn50ZjaLC00c3vzOsHH"
        />
      </div>

      {/* Zelle — right below pricing */}
      <ZelleSection />

      {/* Your Impact */}
      <div className="dn-impact-section">
        <h2 className="dn-impact-section__title">Your Impact</h2>
        <div className="dn-impact-section__card">
          <span className="dn-impact-section__amt">$25</span>
          <p>Provides basic school supplies — including notebooks and pens — for three students for an entire year.</p>
        </div>
        <div className="dn-impact-section__card">
          <span className="dn-impact-section__amt">$50</span>
          <p>Ensures a child receives three meals a day for a full month.</p>
        </div>
        <div className="dn-impact-section__card">
          <span className="dn-impact-section__amt">$100</span>
          <p>Provides enough flour to sustain four households for an entire month.</p>
        </div>
      </div>

      {/* Instagram */}
      <div className="dn-ig">
        <a
          href="https://www.instagram.com/natnacf/"
          target="_blank"
          rel="noopener noreferrer"
          className="ig-follow-link"
        >
          Instagram — @natnacf
        </a>
      </div>

      {/* Media section */}
      <div className="dn-bottom">
        <div className="dn-bottom__media">
          <img src={donateGif} alt="NATNA community work" />
        </div>
        <div className="dn-bottom__media">
          <img
            src={impactImage}
            alt="Children supported by NATNA"
          />
        </div>
      </div>

      <p className="dn-tax">
        All donations are tax-deductible. NATNA is a registered
        501(c)(3) nonprofit organization.
      </p>
    </section>
  )
}
