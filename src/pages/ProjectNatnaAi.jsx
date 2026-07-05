import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiWifiOff, FiMessageCircle, FiSmartphone, FiBook } from 'react-icons/fi'
import classroom1 from '../assets/natna-ai-classroom1.jpg'
import classroom2 from '../assets/natna-ai-classroom2.jpg'
import team from '../assets/natna-ai-team.jpg'
import demo from '../assets/natna-ai-demo.jpg'
import terminal from '../assets/natna-ai-terminal.jpg'
import screenMedical from '../assets/natna-ai-screen-medical.jpg'
import screenEducation from '../assets/natna-ai-screen-education.jpg'

export default function ProjectNatnaAi() {
  const [lightboxImage, setLightboxImage] = useState(null)
  
  return (
    <section className="project-page">
      <div className="container">
        <Link to="/missions" className="back-link">← Back to Programs</Link>
        
        <div className="project-header">
          <h1>NATNA AI</h1>
          <p className="project-subtitle">Resilient Knowledge in Every Community</p>
        </div>
        
        <div className="project-hero-image">
          <img src={classroom1} alt="Students in classroom learning with NATNA AI" />
        </div>
        
        <div className="project-content">
          <div className="project-intro">
            <h2>How It Works</h2>
            <p>
              NATNA AI is a complete offline knowledge infrastructure: not just an AI, but a full 
              education system containing millions of Wikipedia articles, domain-specific learning 
              materials, and an intelligent assistant that can answer questions in English and Tigrinya. 
              The entire platform runs on a single laptop and fits on a USB drive. Students 
              connect via their phones over a local network.
            </p>
            <p>
              In partnership with Mekelle University and MIT, we are developing the world's first 
              comprehensive Tigrinya large language model, making this technology even more 
              powerful and culturally relevant.
            </p>
          </div>
          
          <div className="project-gallery">
            <img src={classroom2} alt="Students studying with NATNA AI presentation" />
            <img src={demo} alt="Team demonstrating NATNA AI system" />
          </div>
          
          <div className="project-features">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3><FiWifiOff className="feature-icon" /> Fully Offline</h3>
                <p>The entire system runs on a single laptop and fits on a USB drive. A complete education platform for any community, anywhere.</p>
              </div>
              <div className="feature-card">
                <h3><FiMessageCircle className="feature-icon" /> Bilingual Support</h3>
                <p>Supports both English and Tigrinya, ensuring students can learn in their native language while also building English skills.</p>
              </div>
              <div className="feature-card">
                <h3><FiSmartphone className="feature-icon" /> Phone Accessible</h3>
                <p>Students connect via their phones over a local network. No internet required.</p>
              </div>
              <div className="feature-card">
                <h3><FiBook className="feature-icon" /> Comprehensive Knowledge</h3>
                <p>Covers medicine, agriculture, mental health, college preparation, and programming. Essential knowledge for community development.</p>
              </div>
            </div>
          </div>
          
          <div className="phone-mockups">
            <div className="phone-frame" onClick={() => setLightboxImage(screenMedical)}>
              <div className="phone-notch"></div>
              <img src={screenMedical} alt="NATNA AI Medical domain - answering health questions" />
            </div>
            <div className="phone-frame" onClick={() => setLightboxImage(screenEducation)}>
              <div className="phone-notch"></div>
              <img src={screenEducation} alt="NATNA AI Education domain - explaining Euler's formula" />
            </div>
          </div>
          
          {lightboxImage && (
            <div className="lightbox" onClick={() => setLightboxImage(null)}>
              <img src={lightboxImage} alt="NATNA AI screenshot" />
            </div>
          )}
          
          <div className="project-impact">
            <h2>Our Vision</h2>
            <p>
              We believe that access to knowledge should not depend on geography or infrastructure. 
              NATNA AI represents a new approach to education, one that meets communities where they are, 
              works with the resources available, and empowers local leaders to become educators.
            </p>
            <p>
              In partnership with Mekelle University and MIT, we are developing a Tigrinya Large Language Model 
              that will make this technology even more powerful and culturally relevant.
            </p>
          </div>
          
          <div className="project-cta">
            <h2>Support This Project</h2>
            <p>Your donation helps us deploy NATNA AI to more communities, train local facilitators, and continue developing this technology.</p>
            <Link to="/donate" className="btn-primary large">Donate Now</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
