import React from 'react'
import heroPhoto from '../assets/natna1.jpg'
import teamPhoto from '../assets/website_photo_1.jpg'
import groupPhoto from '../assets/website_photo_2.jpg'
import communityPhoto from '../assets/website_photo_3.jpg'

const galleryImages = [
  {
    src: heroPhoto,
    alt: "Children in Tigray receiving aid supplies, showing the direct impact of NATNA's humanitarian work",
    title: "Direct Aid Distribution"
  },
  {
    src: teamPhoto,
    alt: "NATNA team members working directly with children at an IDP camp, demonstrating hands-on community engagement",
    title: "On-Ground Team Work"
  },
  {
    src: groupPhoto,
    alt: "Larger group photo showing NATNA team members with children and families, highlighting community relationships",
    title: "Building Relationships"
  },
  {
    src: communityPhoto,
    alt: "Community gathering with woman interacting with children, showcasing psychosocial support and community engagement",
    title: "Community Engagement"
  }
]

export default function PhotoGallery() {
  return (
    <section className="photo-gallery">
      <div className="container">
        <div className="gallery-header">
          <h2>Our Impact in Action</h2>
          <p>See firsthand how NATNA is making a difference in communities across Tigray</p>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div key={index} className="gallery-item">
              <img src={image.src} alt={image.alt} />
              <div className="gallery-overlay">
                <h3>{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}