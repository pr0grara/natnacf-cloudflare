import React from 'react'
import educationGif from '../assets/natna_education.gif'
import samruPhoto from '../assets/samru.jpg'
import aramPhoto from '../assets/aram.jpg'
import tembienPhoto from '../assets/tembien.jpg'

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <h2>Our Mission</h2>
            <p>
              Natna empowers communities in need: fostering reliable access to mutual aid, education, and medical support. We provide opportunities for leadership and sovereignty to flourish from within.
            </p>
            <p>
              We believe in sustainable, community-driven solutions that address immediate needs while building long-term resilience and self-determination. Through direct support, advocacy, and partnership, we work to create lasting change.
            </p>
            <p>
              Our approach centers on dignity, cultural responsiveness, and community leadership, ensuring that those we serve are at the center of all decision-making processes.
            </p>
          </div>
          <div className="about-image">
            <img src={educationGif} alt="NATNA education program in action" />
          </div>
        </div>
        
        {/* Team Bios */}
        <div className="team-section">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-photo">
                <img src={samruPhoto} alt="Samru" />
              </div>
              <div className="team-info">
                <h3>Samru</h3>
                <p>
                  Born in Tigray, her connection to the land and its people is deeply personal. After losing several loved ones to the Tigray genocide, much of her life since 2020 has been dedicated to supporting her community in any way she could. Her work began with organizing and joining demonstrations, raising international awareness, and attending United Nations events. She also spent time supporting Tigrayans who fled to Sudan by visiting refugee communities and helping distribute emergency funds.
                </p>
                <p>
                  When travel to Tigray reopened, she continued this work on the ground through small, community-led projects and fundraisers that provided sanitary supplies, school materials, and basic necessities. After years of working independently and on a small scale, she is grateful to now be part of a collective effort — building a more structured, sustainable, and community-rooted way to support the people of Tigray through Natna Children's Foundation.
                </p>
              </div>
            </div>
            
            <div className="team-member">
              <div className="team-photo">
                <img src={aramPhoto} alt="Aram" />
              </div>
              <div className="team-info">
                <h3>Aram</h3>
                <p>
                  Aram is an avid humanitarian and entrepreneur focused on education and contributing to communities in need. Being born on the remembrance day of the Armenian genocide; struggle, truth, and liberation have always been important themes in his life, which pointed him to the oppression of the people of Tigray.
                </p>
                <p>
                  Regularly having envisioned doing nonprofit work, Aram is joyous for the opportunity to make an impact with Natna Children's Foundation in a concerted and organized way.
                </p>
              </div>
            </div>
            
            <div className="team-member">
              <div className="team-photo">
                <img src={tembienPhoto} alt="Tembien" />
              </div>
              <div className="team-info">
                <h3>Tembien</h3>
                <p>
                  Tembien is a son of Tigray. Having lost his own family to starvation and siege from wars waged against Tigray, he is deeply committed to building systems of resilience within the region.
                </p>
                <p>
                  He has dedicated his life to the pursuit of digital equity and access to information. As an engineer and researcher, he focuses on systems of technology that create sovereignty for oppressed communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
