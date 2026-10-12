import React from 'react'
import { updates } from '../data/updates'

function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function UpdateEntry({ entry }) {
  return (
    <article className="update-entry">
      <time className="update-entry__date" dateTime={entry.date}>{formatDate(entry.date)}</time>
      <h2>{entry.title}</h2>
      <p>{entry.summary}</p>
      {entry.metrics?.length > 0 && (
        <ul className="update-entry__metrics">
          {entry.metrics.map((m) => (
            <li key={m.label} className="update-entry__metric">
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </li>
          ))}
        </ul>
      )}
      {entry.bullets?.length > 0 && (
        <ul>
          {entry.bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
      )}
      {entry.photos?.length > 0 && (
        <div className="update-entry__photos">
          {entry.photos.map((ph) => <img key={ph.src} src={ph.src} alt={ph.alt} loading="lazy" />)}
        </div>
      )}
    </article>
  )
}

export default function Updates() {
  return (
    <section className="updates-page">
      <h1>Updates</h1>
      <p className="updates-intro">Recent work on the ground in Tigray.</p>
      {updates.length === 0
        ? <p className="updates-empty">The first updates are on their way.</p>
        : updates.map((entry) => <UpdateEntry key={entry.id} entry={entry} />)}
    </section>
  )
}
