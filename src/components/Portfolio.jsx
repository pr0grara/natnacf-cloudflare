import React from 'react'
import { Link } from 'react-router-dom'
import groupPhoto from '../assets/website_photo_2.jpg'
import communityPhoto from '../assets/website_photo_3.jpg'
import classroom from '../assets/natna-ai-classroom1.jpg'
import landscape2 from '../assets/tigray_landscape_2.jpg'

const items = [
    { id: 1, title: 'Project — Education Access Program', desc: [`Provide school supplies, uniforms, and tuition assistance.`, 'Partner with schools to improve infrastructure and access to learning materials.', 'NATNA AI — our offline education system that builds resilient access to learning in communities without internet.'], image: classroom, alt: 'Students in classroom learning with NATNA AI', link: '/projects/natna-ai' },
    { id: 2, title: 'Program — Family Mutual Aid Initiative', desc: ['Provide food packages, hygiene kits, and emergency relief to families.', 'Micro-grants or small stipends to reduce the economic pressure that forces children out of school.'], image: groupPhoto, alt: 'NATNA team with families in Tigray', link: '/projects/mutual-aid' },
    { id: 3, title: 'Project — Psychosocial & Extracurricular Programs', desc: ['Safe spaces for creative expression, art, sports, and leadership workshops.', 'Trauma-informed activities for children affected by conflict or displacement.'], image: communityPhoto, alt: 'Community gathering showing children engaged in activities with NATNA team member, demonstrating our psychosocial support programs', link: null },
    { id: 4, title: 'Program — Advocacy & Awareness', desc: ['Advocate for child protection, educational rights, and rehabilitation of schools.', 'Collaborate with UN agencies, NGOs, and community leaders to influence policy and raise awareness globally.'], image: landscape2, alt: 'Tigray landscape with traditional cactus trees', link: null }
]

export default function Portfolio() {
  return (
    <section id="work" className="portfolio">
      <div className="container">
        <h2>Our Programs & Projects</h2>
        <div className="portfolio-grid">
          {items.map(i => (
            <article key={i.id} className="portfolio-card">
              <div className="portfolio-thumb">
                <img src={i.image} alt={i.alt || i.title} />
              </div>
              <div className="portfolio-body">
                <h3>{i.title}</h3>
                {i.desc.map((d, index) => <p key={index}>{d}</p>)}
                {i.link ? (
                  <Link className="link" to={i.link} aria-label={`Learn more about ${i.title}`}>
                    Learn More
                  </Link>
                ) : (
                  <span className="link coming-soon">Coming Soon</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
