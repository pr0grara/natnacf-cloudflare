import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <h1>404 — Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn large">Return Home</Link>
      </div>
    </section>
  )
}
