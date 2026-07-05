import React from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/natna1.jpg'
import photo1 from '../assets/website_photo_1.jpg'
import photo2 from '../assets/website_photo_2.jpg'
import photo3 from '../assets/website_photo_3.jpg'
import landscape1 from '../assets/tigray_landscape_1.jpg'
import landscape2 from '../assets/tigray_landscape_2.jpg'

export default function Hero() {
    return (
        <div className="hero-container-new">
            {/* Background gradient */}
            <div className="hero-gradient-bg"></div>
            
            {/* Main content */}
            <div className="hero-content-new">
                <div className="hero-text-center">
                    <h1 className="hero-main-title">Empowering Tigray's Future</h1>
                    <p className="hero-subtitle">
                        Providing hope, education, and essential resources to communities in need across Tigray
                    </p>
                    <div className="hero-cta">
                        <Link to="/donate" className="btn-primary large">
                            Donate Now
                        </Link>
                        <Link to="/about" className="btn-secondary large">
                            Learn More
                        </Link>
                    </div>
                </div>
                
                {/* Tilted photo arrangement */}
                <div className="hero-photos-arc">
                    <div className="photo-card photo-1">
                        <img src={heroImage} alt="Children receiving aid supplies" />
                    </div>
                    <div className="photo-card photo-2">
                        <img src={photo1} alt="Team at IDP camp" />
                    </div>
                    <div className="photo-card photo-3">
                        <img src={photo2} alt="Community group photo" />
                    </div>
                    <div className="photo-card photo-4">
                        <img src={photo3} alt="Community gathering" />
                    </div>
                    <div className="photo-card photo-5">
                        <img src={landscape1} alt="Tigray farmland landscape" />
                    </div>
                    <div className="photo-card photo-6">
                        <img src={landscape2} alt="Tigray cactus trees" />
                    </div>
                </div>
                
            </div>
        </div>
    )
}