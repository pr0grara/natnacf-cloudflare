import React, { useState, useEffect } from 'react'
import { Scrollama, Step } from 'react-scrollama'
import { motion, AnimatePresence } from 'framer-motion'
import TigrayMap from '../components/TigrayMap'
import MediaCard from '../components/MediaCard'
import { tigrayTimeline } from '../data/tigrayTimeline'
import tigrayLandscape from '../assets/tigray_landscape_hero.jpg'

const categoryLabel = {
  aggression:    'AGGRESSION',
  political:     'POLITICAL',
  humanitarian:  'HUMANITARIAN CRISIS',
  genocide:      'GENOCIDE',
  milestone:     'MILESTONE',
}

// Render a body string with inline **bold** markers as React fragments.
function renderBody(text) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  )
}

export default function WhyTigray() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeEvent = tigrayTimeline[activeIndex]

  // Hide the global site header once the user is past the hero. The page is dense and
  // benefits from the extra vertical real estate. The back-to-top button only surfaces
  // when the user reverses scroll direction — otherwise it would float over the sticky map.
  const [scrolledPastHero, setScrolledPastHero] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const past = y > window.innerHeight * 0.7
      setScrolledPastHero(past)
      // Only show the up arrow when the user is past the hero AND scrolling upward.
      // Hide it on any downward motion or once they're back near the top.
      if (!past || y < 240) {
        setShowBackToTop(false)
      } else if (y < lastY - 4) {
        setShowBackToTop(true)
      } else if (y > lastY + 4) {
        setShowBackToTop(false)
      }
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    document.body.classList.add('hide-header-on-scroll')
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.body.classList.remove('hide-header-on-scroll')
      document.body.classList.remove('site-header-hidden')
    }
  }, [])
  useEffect(() => {
    if (scrolledPastHero) document.body.classList.add('site-header-hidden')
    else document.body.classList.remove('site-header-hidden')
  }, [scrolledPastHero])

  return (
    <article className="why-tigray">
      {/* Hero / intro — photo background with dark gradient */}
      <header className="why-tigray-hero" style={{ backgroundImage: `url(${tigrayLandscape})` }}>
        <div className="why-tigray-hero-overlay" />
        <div className="why-tigray-hero-content">
          <p className="why-tigray-eyebrow">A timeline of Tigray</p>
          <h1>80 years.</h1>
          <p className="why-tigray-lede">
            For decades, Tigray, Ethiopia has endured violent oppression by the Ethiopian
            federal authority. Siege, starvation, and most recently (2020–2023) an active
            genocide the world chose to look away from. Its people keep rebuilding.
          </p>
          <p className="why-tigray-lede why-tigray-lede--cta">
            Scroll the timeline that shaped the communities Natna serves today.
          </p>
          <div className="why-tigray-scroll-hint" aria-hidden="true">
            <span>Scroll to begin</span>
            <span className="why-tigray-scroll-line" />
          </div>
        </div>
      </header>

      {/* Omna tribute — sits between hero and scrollytelling */}
      <aside className="omna-tribute">
        <div className="omna-tribute-inner">
          <p className="omna-tribute-eyebrow">Source & tribute</p>
          <p className="omna-tribute-body">
            The historical timeline below is drawn directly from the work of <strong>Omna Tigray</strong>,
            an organization devoted to documenting and contextualizing the events shaping Tigray.
            Their reporting made this page possible. Read the original at{' '}
            <a href="https://omnatigray.org/whats-happening-in-tigray/" target="_blank" rel="noreferrer">
              omnatigray.org/whats-happening-in-tigray
            </a>.
          </p>
        </div>
      </aside>

      {/* Sticky-map scrollytelling */}
      <section className="scrollytelling">
        <div className="scrollytelling-graphic">
          <div className="sticky-graphic">
            <div className="sticky-graphic-stage">
              <TigrayMap activeEvent={activeEvent} />
              <AnimatePresence mode="wait">
                {activeEvent.media && (
                  <MediaCard key={activeEvent.id} media={activeEvent.media} variant="sticky" />
                )}
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEvent.id}
                  className="active-year"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeEvent.dateLabel}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="scrollytelling-narrative">
          <Scrollama
            offset={0.5}
            onStepEnter={({ data }) => setActiveIndex(data)}
          >
            {tigrayTimeline.map((event, i) => (
              <Step data={i} key={event.id}>
                <motion.div
                  className={`step ${activeIndex === i ? 'is-active' : ''} step--${event.category}${event.contributedBy === 'natna' ? ' step--natna' : ''}`}
                  initial={{ opacity: 0.35 }}
                  animate={{ opacity: activeIndex === i ? 1 : 0.45 }}
                  transition={{ duration: 0.3 }}
                >
                  {event.contributedBy === 'natna' && (
                    <span className="step-natna-badge">Natna's contribution</span>
                  )}
                  <p className="step-category">{categoryLabel[event.category]}</p>
                  <p className="step-date">{event.year}</p>
                  <h3 className="step-title">{event.title}</h3>
                  <p className="step-body">{renderBody(event.body)}</p>
                  {event.milestones && event.milestones.length > 0 && (
                    <>
                      {event.milestonesTitle && (
                        <p className="step-milestones-title">{event.milestonesTitle}</p>
                      )}
                      <ul className="step-milestones">
                        {event.milestones.map((m, mi) => <li key={mi}>{m}</li>)}
                      </ul>
                    </>
                  )}
                  {event.media && <MediaCard media={event.media} variant="inline" />}
                </motion.div>
              </Step>
            ))}
          </Scrollama>
        </div>
      </section>

      {/* Floating back-to-top button — only visible when the user reverses scroll */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            className="why-tigray-back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
          >
            <span aria-hidden="true">↑</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Closing call-to-action */}
      <footer className="why-tigray-cta">
        <h2>This is why Natna exists.</h2>
        <p>
          The events on this page are not history. They are still unfolding. The communities that
          survived them are still rebuilding under siege conditions. Your support is what makes
          mutual aid, education, and medical support possible right now.
        </p>
        <a href="/donate" className="btn-primary large">Support our work</a>
      </footer>
    </article>
  )
}
