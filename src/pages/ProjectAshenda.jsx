import React from 'react'
import { Link } from 'react-router-dom'
import celebrationVideo from '../assets/ashenda_celebration.mp4'
import challengeVideo from '../assets/ashenda_challenge.mp4'
import posterCelebration from '../assets/poster_ashenda_celebration.jpg'
import posterChallenge from '../assets/poster_ashenda_challenge.jpg'

const videos = [
  { src: celebrationVideo, poster: posterCelebration },
  { src: challengeVideo, poster: posterChallenge },
]

export default function ProjectAshenda() {
  return (
    <section className="project-page">
      <div className="container">
        <Link to="/missions" className="back-link">← Back to Programs</Link>

        <div className="project-header">
          <h1>Ashenda</h1>
          <p className="project-subtitle">
            Celebrating the girls and women of Tigray.
          </p>
        </div>

        <div className="project-content">
          <div className="project-intro">
            <h2>The Festival</h2>
            <p>
              Ashenda is a celebration of the girls and women of Tigray. Every August, at the
              close of the Filseta fast, they dress in traditional clothing, braid their hair,
              and move through their communities in groups, singing, drumming, and dancing in
              celebration of their culture, sisterhood, and resilience.
            </p>
            <p>
              Many girls are still living with the devastating impacts of genocide,
              displacement, and loss. While those wounds remain, moments like Ashenda offer a
              chance to reconnect, celebrate, and hold on to hope.
            </p>
          </div>

          <div className="aid-initiatives">
            <div className="aid-card has-gallery">
              <div className="aid-left">
                <div className="aid-stat">
                  <span className="aid-stat-number">5,000 birr</span>
                  <span className="aid-stat-label">($33) dresses one girl for Ashenda</span>
                </div>
                <h3>The Ashenda Challenge</h3>
                <p>
                  With #AshendaChallenge5000, Samru challenged our community to sponsor girls
                  living in IDP camps within Tigray: 5,000 birr, about $33, covers one girl's
                  traditional dress and hair.
                  Our community met the challenge. With the funds raised, we bought fabric and
                  had Ashenda dresses made for the girls and women in the camps, so each
                  of them could celebrate knowing she is seen, celebrated, and cared for.
                </p>
              </div>
              <div className="aid-gallery">
                {videos.map((v) => (
                  <video key={v.src} controls preload="metadata" playsInline poster={v.poster}>
                    <source src={v.src} type="video/mp4" />
                  </video>
                ))}
              </div>
            </div>
          </div>

          <div className="project-cta">
            <h2>Support Mental Health & Community Building</h2>
            <p>
              Your donation helps create safe, joyful spaces for children and young people
              recovering from conflict and displacement.
            </p>
            <a
              href="https://donate.stripe.com/9B600lesP6ae2HK6ek3wQ07"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary large"
            >
              Donate
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
