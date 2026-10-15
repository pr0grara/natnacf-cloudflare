import React from 'react'
import { Link } from 'react-router-dom'
import groupPhoto from '../assets/website_photo_2.jpg'
import communityPhoto from '../assets/website_photo_3.jpg'
import classroom from '../assets/natna-ai-classroom1.jpg'
import landscape2 from '../assets/tigray_landscape_2.jpg'

const items = [
    {
      id: 1,
      title: 'Education',
      tagline: 'Education is how young people build a future on their own terms.',
      desc: [
        'Provide school supplies, uniforms, and tuition assistance to students from elementary school through university, so cost is never the reason a young person stops learning.',
        'Partner with schools to improve infrastructure and access to learning materials.',
        'NATNA AI, our offline education system that builds resilient access to learning in communities without internet.'
      ],
      image: classroom,
      alt: 'Students in classroom learning with NATNA AI',
      link: '/projects/natna-ai'
    },
    {
      id: 2,
      title: 'Mutual Aid',
      tagline: 'Mutual aid isn\u2019t just charity, it\u2019s solidarity.',
      desc: [
        'Distribute flour and essential food to families facing hardship across Tigray.',
        'Provide hygiene kits, sanitary items, and emergency relief to families in need.',
        'Cover medical costs, including life-saving surgeries, for young people whose families can\u2019t afford the care they need.'
      ],
      image: groupPhoto,
      alt: 'NATNA team with families in Tigray',
      link: '/projects/mutual-aid'
    },
    {
      id: 3,
      title: 'Psychosocial & Extracurricular',
      tagline: 'Wellbeing isn\u2019t just survival, it\u2019s confidence, friendships, and joy.',
      desc: [
        'Safe spaces for creative expression, art, sports, and leadership workshops.',
        'Trauma-informed activities for children affected by conflict or displacement.',
        'Support for cultural celebrations that bring joy and pride, like Ashenda, where we help women and girls take part fully through traditional dress, hair styling, and hygiene essentials.'
      ],
      image: communityPhoto,
      alt: 'Community gathering showing children engaged in activities with NATNA team member, demonstrating our psychosocial support programs',
      link: '/projects/ashenda'
    },
    {
      id: 4,
      title: 'Advocacy & Awareness',
      tagline: 'Advocacy isn\u2019t an add-on, it\u2019s what keeps every other part of our work standing.',
      desc: [
        'Advocate for child protection, educational rights, and the rebuilding of schools and other vital infrastructure, so children and youth have safe environments where they can heal, grow, and flourish from within.',
        'Collaborate with UN agencies, NGOs, and community leaders to influence policy, raise awareness globally, and protect the wellbeing of youth, children, and society as a whole.'
      ],
      image: landscape2,
      alt: 'Tigray landscape with traditional cactus trees',
      link: null
    }
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
                <p className="portfolio-tagline">{i.tagline}</p>
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
