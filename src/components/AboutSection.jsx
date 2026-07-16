import React from 'react'
import { Link } from 'react-router-dom'
import educationGif from '../assets/natna_education.gif'
import samruPhoto from '../assets/samru.jpg'
import aramPhoto from '../assets/aram_centered.jpg'
import tembienPhoto from '../assets/tembien.jpg'
import MiniMap from './MiniMap'

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-shell">

        {/* Page eyebrow */}
        <p className="about-eyebrow">About Natna</p>
        <h1 className="about-pagetitle">Building from within.</h1>

        {/* Imagery band — single hero image */}
        <figure className="about-feature-image">
          <img src={educationGif} alt="NATNA education program in action" />
        </figure>

        {/* Mission */}
        <div className="about-block about-block--mission">
          <h2>Our Mission</h2>
          <p className="about-lede">
            To empower youth and communities in need by providing reliable access to mutual aid, education, medical support and opportunities for leadership and sovereignty to flourish from within.
          </p>
          <p>
            We believe in sustainable, community-driven solutions that address immediate needs while building long-term resilience and self-determination. Through direct support, advocacy, and partnership, we work to create lasting change.
          </p>
          <p>
            Our approach centers on dignity, cultural responsiveness, and community leadership, ensuring that those we serve are at the center of all decision-making processes.
          </p>
          <div className="about-block-cta">
            <Link to="/missions" className="btn-primary">View our projects</Link>
          </div>
        </div>

        {/* Why Natna Exists */}
        <div className="about-block about-block--why">
          <h2>Why Natna Exists</h2>
          <p>
            The ongoing genocide that began in 2020 in Tigray has left survivors living in devastating and debilitating conditions.
          </p>
          <p>
            Despite their resilience and strength, many are barely surviving, forced to endure inhumane circumstances far beyond their control. The issue is not a lack of ability or determination. These communities are capable of thriving. They have been systematically robbed of the opportunities to do so.
          </p>
          <p>
            The Pretoria Peace Agreement promised accountability, the withdrawal of foreign forces, the return of displaced civilians, and reconstruction. The African Union, the United Nations, and the Ethiopian federal government have failed to deliver any of it.
          </p>
          <p>
            With critical infrastructure destroyed or looted and access to basic necessities severely limited, survival itself has become a daily struggle. That gap is why mutual aid matters. This is where our work comes in: to help meet immediate needs, creating pathways for individuals to rebuild, thrive, and uplift their communities alongside them.
          </p>
          <div className="about-block-cta">
            <Link to="/why-tigray" className="btn-primary">Read the full story</Link>
          </div>
        </div>

        {/* Where Tigray Is */}
        <div className="about-block about-block--location">
          <h2>Where Tigray Is</h2>
          <div className="tigray-location-card">
            <div className="tigray-location-map"><MiniMap /></div>
            <p className="tigray-location-text">
              Tigray is a region in northern Ethiopia, bordered by Eritrea to the north and Sudan to the west, with a pre-war population of approximately 7 million. Mekelle is the capital.
            </p>
          </div>
        </div>

      </div>

      {/* Team Bios — wider container outside the narrative shell */}
      <div className="team-section">
        <h2>Our Team</h2>
        <div className="team-grid">
          <div className="team-member team-member--samru">
            <div className="team-photo">
              <img src={samruPhoto} alt="Samru" />
            </div>
            <div className="team-info">
              <h3>Samru</h3>
              <p>
                Born in Tigray, her connection to the land and its people is deeply personal. After losing several loved ones to the Tigray genocide, much of her life since 2020 has been dedicated to supporting her community in any way she could.
              </p>
              <details>
                <summary>Read full bio</summary>
                <p>
                  Her work began with organizing and joining demonstrations, raising international awareness, and attending United Nations events. She also spent time supporting Tigrayans who fled to Sudan by visiting refugee communities and helping distribute emergency funds.
                </p>
                <p>
                  When travel to Tigray reopened, she continued this work on the ground through small, community-led projects and fundraisers that provided sanitary supplies, school materials, and basic necessities. After years of working independently and on a small scale, she is grateful to now be part of a collective effort — building a more structured, sustainable, and community-rooted way to support the people of Tigray through Natna Children's Foundation.
                </p>
              </details>
            </div>
          </div>

          <div className="team-member team-member--aram">
            <div className="team-photo">
              <img src={aramPhoto} alt="Aram" />
            </div>
            <div className="team-info">
              <h3>Aram</h3>
              <p>
                Aram is an avid humanitarian and entrepreneur focused on education and contributing to communities in need. Born on the remembrance day of the Armenian genocide, struggle, truth, and liberation have always been central to his life — which pointed him to the oppression of the people of Tigray.
              </p>
              <details>
                <summary>Read full bio</summary>
                <p>
                  Regularly having envisioned doing nonprofit work, Aram is joyous for the opportunity to make an impact with Natna Children's Foundation in a concerted and organized way.
                </p>
              </details>
            </div>
          </div>

          <div className="team-member team-member--tembien">
            <div className="team-photo">
              <img src={tembienPhoto} alt="Tembien" />
            </div>
            <div className="team-info">
              <h3>Tembien</h3>
              <p>
                Tembien is a son of Tigray. Having lost his own family to starvation and siege from wars waged against Tigray, he is deeply committed to building systems of resilience within the region.
              </p>
              <details>
                <summary>Read full bio</summary>
                <p>
                  He has dedicated his life to the pursuit of digital equity and access to information. As an engineer and researcher, he focuses on systems of technology that create sovereignty for oppressed communities.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
