import React from 'react'
import { motion } from 'framer-motion'

const slug = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export default function MediaCard({ media, variant = 'sticky' }) {
  if (!media) return null

  let dateLabel = media.date
  try {
    if (media.date) {
      dateLabel = new Date(media.date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    }
  } catch {
    /* fall back to raw string */
  }

  return (
    <motion.aside
      className={`media-card media-card--${variant}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {media.image && (
        <div className="media-card-image">
          <img src={media.image} alt={media.imageAlt || ''} loading="lazy" />
        </div>
      )}
      <div className="media-card-body">
        <div className="media-card-meta">
          <span className={`media-card-outlet media-card-outlet--${slug(media.outlet)}`}>
            {media.outlet}
          </span>
          {dateLabel && <span className="media-card-date">{dateLabel}</span>}
        </div>
        <h4 className="media-card-headline">{media.headline}</h4>
      </div>
    </motion.aside>
  )
}
