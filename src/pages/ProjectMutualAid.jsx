import React from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/natna_impact.jpg'
import flourVideo from '../assets/flour_distribution.mp4'
import finoVideo from '../assets/fino.mp4'
import padsVideo from '../assets/reusable_pads.mp4'
import cashVideo from '../assets/cash_disbursement.mp4'
import educationGif from '../assets/natna_education.gif'
import posterFlour from '../assets/poster_flour.jpg'
import posterFino from '../assets/poster_fino.jpg'
import posterPads from '../assets/poster_pads.jpg'
import posterCash from '../assets/poster_cash.jpg'

const initiatives = [
  {
    title: 'Flour Distribution',
    stat: '10,000 kg',
    statLabel: 'of flour distributed',
    body: 'We were able to provide 100 kuntals (10,000 kilograms) of fino/flour to 400 households in Tembien, Tigray.',
    videos: [],
    gallery: [
      { src: flourVideo, poster: posterFlour },
      { src: finoVideo, poster: posterFino },
    ],
  },
  {
    title: 'Reusable Pads',
    stat: '2,500',
    statLabel: 'pads distributed',
    body: 'In displacement camps where sanitary products are nearly impossible to access, 833 women and girls had been relying on rags and unsafe alternatives. We distributed 2,500 reusable pads that will last up to two years and soap — helping restore dignity, safety, and peace of mind.',
    videos: [{ src: padsVideo, poster: posterPads }],
  },
  {
    title: 'Education Supplies',
    stat: 'Thousands',
    statLabel: 'of students reached',
    body: 'Through repeated distributions across Tigray over the years, we have delivered essential school supplies such as notebooks, pens, pencils, braille paper, and study exercise books — ensuring students have the tools they need to learn.',
    videos: [],
    image: educationGif,
  },
  {
    title: 'Cash Distribution',
    stat: 'Multiple',
    statLabel: 'disbursements to IDPs',
    body: 'Through multiple cash disbursements to IDP communities throughout Tigray, we have provided direct financial support to families in urgent need. While hardship is widespread, priority was given to the most marginalized — including elders, single mothers, people with disabilities, and parentless children.',
    videos: [{ src: cashVideo, poster: posterCash }],
  },
]

export default function ProjectMutualAid() {
  return (
    <section className="project-page">
      <div className="container">
        <Link to="/missions" className="back-link">
          ← Back to Programs
        </Link>

        <div className="project-header">
          <h1>Family Mutual Aid Initiative</h1>
          <p className="project-subtitle">
            Direct support to families and communities
            across Tigray.
          </p>
        </div>

        <div className="project-hero-image">
          <img
            src={heroImage}
            alt="NATNA distributing aid in Tigray"
          />
        </div>

        <div className="project-content">
          <div className="project-intro">
            <h2>Our Approach</h2>
            <p>
              The Family Mutual Aid Initiative delivers
              direct, tangible support to communities across
              Tigray. From food security to hygiene and
              education, we focus on meeting the most urgent
              needs of families affected by conflict and
              displacement.
            </p>
          </div>

          <div className="aid-initiatives">
            {initiatives.map((item, i) => (
              <div
                key={i}
                className={`aid-card${item.videos.length === 0 && !item.image && !(item.gallery && item.gallery.length) ? ' no-video' : ''}${item.gallery && item.gallery.length ? ' has-gallery' : ''}`}
              >
                <div className="aid-left">
                  <div className="aid-stat">
                    <span className="aid-stat-number">
                      {item.stat}
                    </span>
                    <span className="aid-stat-label">
                      {item.statLabel}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                {item.image && (
                  <div className="aid-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                )}
                {item.videos.length > 0 && (
                  <div className="aid-videos">
                    {item.videos.map((v, j) => (
                      <video
                        key={j}
                        controls
                        preload="metadata"
                        playsInline
                        poster={v.poster}
                      >
                        <source
                          src={v.src}
                          type="video/mp4"
                        />
                      </video>
                    ))}
                  </div>
                )}
                {item.gallery && item.gallery.length > 0 && (
                  <div className="aid-gallery">
                    {item.gallery.map((v, j) => (
                      <video
                        key={j}
                        controls
                        preload="metadata"
                        playsInline
                        poster={v.poster}
                      >
                        <source
                          src={v.src}
                          type="video/mp4"
                        />
                      </video>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="project-cta">
            <h2>Support This Initiative</h2>
            <p>
              Your donation provides flour, school supplies,
              sanitary products, and emergency cash to
              families who need it most.
            </p>
            <Link to="/donate" className="btn-primary large">
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
