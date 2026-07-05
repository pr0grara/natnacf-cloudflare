import React from 'react'

export default function Missions() {
  return (
    <section className="container missions-page">
      <h1>Missions</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
        Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at
        nibh elementum imperdiet.
      </p>
      <div className="mission-cards">
        <article className="card">
          <h3>Mission One</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </article>
        <article className="card">
          <h3>Mission Two</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </article>
        <article className="card">
          <h3>Mission Three</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </article>
      </div>
    </section>
  )
}
