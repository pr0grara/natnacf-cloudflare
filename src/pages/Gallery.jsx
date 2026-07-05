import React from 'react'
import PhotoGallery from '../components/PhotoGallery'

export default function Gallery() {
  return (
    <>
      <div className="gallery-page">
        <div className="container">
          <div className="page-header">
            <h1>Our Impact Gallery</h1>
            <p className="lead">
              Witness the real stories and faces behind NATNA's mission. These photos capture moments of hope, 
              resilience, and community strength across our programs in Tigray.
            </p>
          </div>
        </div>
        <PhotoGallery />
      </div>
    </>
  )
}