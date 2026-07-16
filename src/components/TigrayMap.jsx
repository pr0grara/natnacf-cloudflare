import React, { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { motion, AnimatePresence } from 'framer-motion'
import hornMap from '../data/horn-map.json'
import { locations } from '../data/tigrayTimeline'

const STYLE_URL = 'https://tiles.openfreemap.org/styles/dark'

// Per-location bounding boxes. We use fitBounds() instead of flyTo({zoom}) so the map
// scales correctly to whatever container size it's rendered in (desktop wide, mobile narrow).
// Each bbox is [[west, south], [east, north]] in lon/lat.
const BBOXES = {
  // Default Tigray-focused view (Tigray region with neighbor context)
  tigray:           [[36.0, 11.8], [41.0, 15.4]],
  mekelle:          [[39.05, 13.20], [40.00, 13.80]],
  hawzien:          [[39.05, 13.70], [39.85, 14.25]],
  axum:             [[38.30, 13.85], [39.10, 14.45]],
  togoga:           [[39.00, 13.25], [39.65, 13.80]],
  'western-tigray': [[36.10, 13.05], [38.30, 14.55]],
  addis:            [[37.40, 7.40], [40.20, 10.60]],
  eritrea:          [[37.40, 14.30], [42.30, 17.20]],
  'somali-region':  [[41.50, 3.50], [48.50, 10.50]],
}

// Pretoria is external — frame stays on Tigray and the overlay card carries the location.
const EXTERNAL_BBOX = [[36.5, 11.5], [41.0, 16.0]]

// Per-event bbox overrides for scenes that span multiple regions/actors.
const PER_EVENT_BBOXES = {
  // Opening event: frame Tigray AND central Ethiopia so both editorial labels read,
  // grounding the viewer geographically before the timeline narrows in.
  'bombs-1943':                  [[34.0, 8.0], [42.0, 15.2]],
  // Isaias visit: Addis ↔ Eritrea axis — both visibly framed.
  'isaias-visit-2020':           [[37.40, 8.50], [41.50, 16.50]],
  // Eritrea–Ethiopia peace deal: same axis frame.
  'eritrea-peace-2018':          [[37.40, 8.50], [41.50, 16.50]],
  // Western Tigray seizure: shift the bbox west so the highlighted regions sit in the right
  // half of the map, clear of the bottom-left citation card.
  'western-tigray-seizure-2020': [[32.50, 7.50], [40.50, 17.50]],
  // Federal attack: Addis → Tigray axis.
  'attack-launched-2020':        [[37.50, 8.50], [40.50, 14.80]],
  // ESAT joint-action call: Tigray + Eritrea.
  'esat-2020':                   [[36.50, 11.80], [41.50, 17.00]],
  // Refugee forced return: Tigray + Eritrea + Sudan border.
  'refugees-back-2020':          [[35.50, 12.00], [41.50, 17.00]],
  // Eritrean troops in Tigray: both regions.
  'eritrea-withdraw-2021':       [[36.50, 12.00], [41.50, 17.00]],
  // Pretoria signing: Ethiopia federal + Tigray (the agreement's parties).
  'pretoria-agreement':          [[37.50, 8.50], [40.50, 14.80]],
  // Top officials assassinated: include both Addis (where it happened) and Amhara (regional governor killed).
  'murders-2019':                [[36.50, 8.20], [40.50, 13.50]],
}

// Tigray feature extraction
const tigrayFeature = hornMap.features.find(f => f.properties?.isTigray)

// Ethiopia base — all Ethiopian admin1 regions except Tigray, used as a constant background layer
// so the country is always visible underneath whatever's highlighted.
const ethiopiaBaseFeatures = hornMap.features.filter(
  f => f.properties?.kind === 'eth-region' && !f.properties?.isTigray
)

// Editorial country labels (replaces OpenFreeMap's stripped multi-script symbol labels).
// Hoisted to module scope so the per-event effect can rebuild this layer's source data,
// dropping the always-on label for whichever country is the active actor (otherwise the
// active-marker label and the always-on label render on top of each other).
const COUNTRY_LABELS = [
  { name: 'ETHIOPIA', lon: 39.5,  lat:  9.4 },
  { name: 'ERITREA',  lon: 39.0,  lat: 16.0 },
  { name: 'SUDAN',    lon: 32.5,  lat: 13.0 },
  { name: 'S. SUDAN', lon: 30.5,  lat:  7.5 },
  { name: 'YEMEN',    lon: 47.0,  lat: 15.5 },
  { name: 'DJIBOUTI', lon: 42.8,  lat: 11.7 },
  { name: 'SOMALIA',  lon: 47.0,  lat:  6.0 },
  { name: 'KENYA',    lon: 38.0,  lat:  1.5 },
]

const countryLabelFC = (excludeNames = new Set()) => ({
  type: 'FeatureCollection',
  features: COUNTRY_LABELS
    .filter(c => !excludeNames.has(c.name))
    .map(c => ({
      type: 'Feature',
      properties: { name: c.name },
      geometry: { type: 'Point', coordinates: [c.lon, c.lat] },
    })),
})

// Find a highlight feature for a location key (one entry from the locations table).
// Returns a GeoJSON Feature or null. Skips Tigray (which has its own dedicated red layer).
function highlightFeatureForLocation(locKey) {
  if (!locKey) return null
  const loc = locations[locKey]
  if (!loc) return null
  if (loc.kind === 'country') {
    return hornMap.features.find(f => f.properties?.kind === 'country' && f.properties?.name === loc.countryName) || null
  }
  if (loc.kind === 'region' && loc.regionName !== 'Tigray') {
    return hornMap.features.find(f => f.properties?.kind === 'eth-region' && f.properties?.name === loc.regionName) || null
  }
  return null
}

// Build the FeatureCollection of all highlighted regions for an event:
// the primary location (if it's a non-Tigray region/country) plus every entry in event.actors.
// Special actor key: 'ethiopia-rest' highlights every Ethiopian region except Tigray (used for
// events where the rest of Ethiopia closes around Tigray, e.g. the 2021–22 siege).
function highlightFeaturesForEvent(event) {
  if (!event) return []
  const keys = []
  if (event.location) keys.push(event.location)
  if (Array.isArray(event.actors)) keys.push(...event.actors)
  const seen = new Set()
  const out = []
  for (const k of keys) {
    if (seen.has(k)) continue
    seen.add(k)
    if (k === 'ethiopia-rest') {
      for (const f of hornMap.features) {
        if (f.properties?.kind === 'eth-region' && !f.properties?.isTigray) {
          out.push(f)
        }
      }
      continue
    }
    const f = highlightFeatureForLocation(k)
    if (f) out.push(f)
  }
  return out
}

// Troop / movement lines per event. Coords are [lon, lat] tuples.
// Categories: 'attack' (red, hostile movement), 'displacement' (orange, civilian forced movement),
// 'allied' (purple, foreign army into Tigray), 'visit' (blue, diplomatic).
const MOVEMENT_LINES = {
  'attack-launched-2020': { kind: 'attack',       coords: [[38.74, 9.03], [39.475, 13.498]], label: 'Federal offensive begins' },
  'western-tigray-seizure-2020': { kind: 'attack', coords: [[38.0, 11.5], [37.0, 13.95]], label: 'Amhara forces seize Western Tigray' },
  'no-mercy-2020':        { kind: 'attack',       coords: [[38.74, 9.03], [39.475, 13.498]], label: 'Mekelle offensive' },
  'troops-1nov-2020':     { kind: 'attack',       coords: [[44.5, 6.5], [38.5, 13.5]], label: 'Troop movements reported' },
  'refugees-back-2020':   { kind: 'displacement', coords: [[38.5, 13.5], [38.5, 15.5]], label: 'Refugees forcibly returned' },
  'eritrea-withdraw-2021':{ kind: 'allied',       coords: [[39.0, 15.7], [38.7, 13.8]], label: 'Eritrean forces inside Tigray' },
  'isaias-visit-2020':    { kind: 'visit',        coords: [[39.0, 15.7], [38.74, 9.03]], label: 'Isaias visits Ethiopian military sites' },
}

const LINE_STYLES = {
  attack:       { color: '#f4685a', width: 3 },
  displacement: { color: '#f5b15a', width: 2.6 },
  allied:       { color: '#b07ed6', width: 2.6 },
  visit:        { color: '#7eb1d6', width: 2 },
}

function lineFeatureFor(eventId) {
  const m = MOVEMENT_LINES[eventId]
  if (!m) return null
  return {
    type: 'Feature',
    properties: { kind: m.kind, label: m.label },
    geometry: { type: 'LineString', coordinates: m.coords },
  }
}

export default function TigrayMap({ activeEvent }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const lastBboxRef = useRef(BBOXES.tigray)
  const [styleLoaded, setStyleLoaded] = useState(false)
  const [webglFailed, setWebglFailed] = useState(false)

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current) return
    let map
    try {
      map = new maplibregl.Map({
        container: containerRef.current,
        style: STYLE_URL,
        // Match the opening event's bbox so the very first paint shows Ethiopia + Tigray
        // both labeled, before scrollama animates into subsequent events.
        bounds: PER_EVENT_BBOXES['bombs-1943'],
        fitBoundsOptions: { padding: 28 },
        // Attribution is rendered as a static line in the page (see WhyTigray.jsx footer area)
        // so it doesn't crowd the map. License compliance preserved.
        attributionControl: false,
        cooperativeGestures: false,
        interactive: false,
      })
    } catch (err) {
      console.warn('MapLibre init failed, falling back:', err)
      setWebglFailed(true)
      return
    }
    mapRef.current = map

    // Catch async runtime errors from the map (style load, tile fetch, etc.) so the React tree stays alive
    map.on('error', (e) => {
      console.warn('MapLibre error:', e?.error?.message || e)
    })

    map.on('load', () => {
      // Hide every label layer from the base style. OpenFreeMap's "dark" theme paints country,
      // region, city, and POI names in multiple languages — they collide with the deliberate labels
      // (TIGRAY, ERITREA, Mekelle, etc.) we draw ourselves. Killing the basemap symbols keeps
      // the map readable and keeps our editorial framing in control.
      for (const layer of map.getStyle().layers) {
        if (layer.type === 'symbol') {
          map.setLayoutProperty(layer.id, 'visibility', 'none')
        }
      }

      // Ethiopia base — quiet permanent fill so the country is always visible under whatever's active.
      // Distinct from Sudan / Eritrea / etc. which retain their default basemap appearance.
      map.addSource('ethiopia-base', { type: 'geojson', data: { type: 'FeatureCollection', features: ethiopiaBaseFeatures } })
      map.addLayer({
        id: 'ethiopia-base-fill',
        type: 'fill',
        source: 'ethiopia-base',
        paint: {
          'fill-color': '#ffffff',
          'fill-opacity': 0.09,
        },
      })
      map.addLayer({
        id: 'ethiopia-base-line',
        type: 'line',
        source: 'ethiopia-base',
        paint: {
          'line-color': '#ffffff',
          'line-width': 0.6,
          'line-opacity': 0.32,
        },
      })

      // Permanent dashed-blue outline around Addis Ababa region. Highlights Ethiopia's
      // multi-national federal structure — Addis is its own admin unit even though it's a city.
      const addisFeature = ethiopiaBaseFeatures.find(f => f.properties?.name === 'Addis Ababa')
      if (addisFeature) {
        map.addSource('addis-outline', { type: 'geojson', data: addisFeature })
        map.addLayer({
          id: 'addis-outline',
          type: 'line',
          source: 'addis-outline',
          paint: {
            'line-color': '#7eb1d6',
            'line-width': 2.2,
            'line-dasharray': [3, 2],
            'line-opacity': 0.95,
          },
        })
      }


      // Active region/country highlight (blue tint for non-Tigray active locations)
      map.addSource('region-highlight', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } })
      map.addLayer({
        id: 'region-highlight-fill',
        type: 'fill',
        source: 'region-highlight',
        paint: {
          'fill-color': '#3a72c4',
          'fill-opacity': 0.32,
        },
      })
      map.addLayer({
        id: 'region-highlight-outline',
        type: 'line',
        source: 'region-highlight',
        paint: {
          'line-color': '#7eb1d6',
          'line-width': 1.6,
          'line-blur': 0.4,
        },
      })

      // Tigray fill + outline
      map.addSource('tigray', { type: 'geojson', data: tigrayFeature })
      map.addLayer({
        id: 'tigray-fill',
        type: 'fill',
        source: 'tigray',
        paint: {
          'fill-color': '#c83d2e',
          'fill-opacity': [
            'interpolate', ['linear'], ['zoom'],
            4, 0.55,
            7, 0.42,
            9, 0.28,
            11, 0.16,
          ],
        },
      })
      map.addLayer({
        id: 'tigray-outline',
        type: 'line',
        source: 'tigray',
        paint: {
          'line-color': '#f4685a',
          'line-width': 1.4,
          'line-blur': 0.6,
        },
      })

      // Pulsing accent line (subtle glow on top of outline)
      map.addLayer({
        id: 'tigray-glow',
        type: 'line',
        source: 'tigray',
        paint: {
          'line-color': '#ff8b78',
          'line-width': 4,
          'line-blur': 6,
          'line-opacity': 0.45,
        },
      })

      // Persistent "TIGRAY" label — single point, anchored to the polygon's visual center.
      // The bbox-centroid sits near the southern border because Tigray's polygon has a long
      // southern peninsula. Visual mass is in the wider northern half, so we place the label
      // higher in latitude (~14.0) to read as centered on the highlighted region.
      map.addSource('tigray-label', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: { type: 'Point', coordinates: [38.45, 14.05] },
        },
      })
      map.addLayer({
        id: 'tigray-label',
        type: 'symbol',
        source: 'tigray-label',
        layout: {
          'text-field': 'TIGRAY',
          'text-font': ['Noto Sans Bold'],
          'text-size': ['interpolate', ['linear'], ['zoom'], 5, 12, 8, 18, 11, 24],
          'text-letter-spacing': 0.18,
        },
        paint: {
          'text-color': '#ffffff',
          'text-halo-color': '#7a1d10',
          'text-halo-width': 1.4,
        },
      })

      // Permanent country labels — replace OpenFreeMap's stripped multi-script labels with
      // our own editorial labels for the surrounding countries, in our typography. The
      // source data is rebuilt per event so we can drop the always-on label for whichever
      // country is the active actor (the active-marker layer draws a more prominent label
      // for that country, and showing both stacked them on top of each other).
      map.addSource('country-labels', {
        type: 'geojson',
        data: countryLabelFC(),
      })
      map.addLayer({
        id: 'country-labels',
        type: 'symbol',
        source: 'country-labels',
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['Noto Sans Regular'],
          'text-size': ['interpolate', ['linear'], ['zoom'], 4, 9, 7, 12, 10, 16],
          'text-letter-spacing': 0.18,
        },
        paint: {
          'text-color': 'rgba(255, 255, 255, 0.55)',
          'text-halo-color': '#0a0e1a',
          'text-halo-width': 1.2,
        },
      })

      // Movement / troop lines
      map.addSource('movement', { type: 'geojson', data: { type: 'FeatureCollection', features: [] }, lineMetrics: true })
      map.addLayer({
        id: 'movement-glow',
        type: 'line',
        source: 'movement',
        paint: {
          'line-color': [
            'match', ['get', 'kind'],
            'attack', LINE_STYLES.attack.color,
            'displacement', LINE_STYLES.displacement.color,
            'allied', LINE_STYLES.allied.color,
            'visit', LINE_STYLES.visit.color,
            '#ffffff',
          ],
          'line-opacity': 0.35,
          'line-width': 8,
          'line-blur': 6,
        },
      })
      map.addLayer({
        id: 'movement-line',
        type: 'line',
        source: 'movement',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': [
            'match', ['get', 'kind'],
            'attack', LINE_STYLES.attack.color,
            'displacement', LINE_STYLES.displacement.color,
            'allied', LINE_STYLES.allied.color,
            'visit', LINE_STYLES.visit.color,
            '#ffffff',
          ],
          'line-width': [
            'match', ['get', 'kind'],
            'attack', LINE_STYLES.attack.width,
            'displacement', LINE_STYLES.displacement.width,
            'allied', LINE_STYLES.allied.width,
            'visit', LINE_STYLES.visit.width,
            2,
          ],
          'line-dasharray': [2, 1.5],
        },
      })

      // Cities are now rendered only when they're the active event's location (see active-marker
      // layer below). The previous always-on city-dots layer made unrelated cities (Togoga, etc.)
      // visible during events that don't reference them.

      setStyleLoaded(true)
    })

    // ResizeObserver triggers map.resize() so the canvas tracks container changes
    // (orientation changes, mobile address-bar reveal, sticky-graphic height shifts).
    // Also re-fits the last applied bbox without animation so the geographic frame
    // stays accurate at the new aspect ratio.
    const ro = new ResizeObserver(() => {
      if (!mapRef.current) return
      mapRef.current.resize()
      mapRef.current.fitBounds(lastBboxRef.current, { padding: 28, duration: 0 })
    })
    ro.observe(containerRef.current)

    return () => {
      ro.disconnect()
      map.remove()
      mapRef.current = null
    }
  }, [])

  // React to activeEvent — fly to the appropriate camera state and update an "active marker"
  useEffect(() => {
    const map = mapRef.current
    if (!map || !styleLoaded) return

    const loc = activeEvent?.location ? locations[activeEvent.location] : null
    const isExternal = loc?.kind === 'external'
    // Resolution order: per-event bbox override → location default → Tigray fallback.
    // fitBounds (rather than flyTo with a fixed zoom) auto-scales to the container so the same
    // event renders the same geographic extent on desktop, tablet, and phone.
    const target = isExternal
      ? EXTERNAL_BBOX
      : (PER_EVENT_BBOXES[activeEvent?.id] || BBOXES[activeEvent?.location] || BBOXES.tigray)

    lastBboxRef.current = target
    map.fitBounds(target, {
      padding: 28,
      duration: 2200,
      essential: true,
      curve: 1.42,
      pitch: 0,
      bearing: 0,
    })

    // Update region highlights — primary location's region/country plus every actor.
    // Multiple features can be active at once (e.g. a federal-Ethiopia + Eritrea joint scene).
    const highlightFeatures = highlightFeaturesForEvent(activeEvent)
    const highlightSource = map.getSource('region-highlight')
    if (highlightSource) {
      highlightSource.setData({ type: 'FeatureCollection', features: highlightFeatures })
    }

    // Rebuild always-on country labels, excluding any country whose editorial label is
    // already being drawn by the active-marker layer (otherwise the two stack on top of
    // each other and the muted always-on label peeks out from under the bright active one).
    const activeCountryLabels = new Set()
    const actorKeys = []
    if (activeEvent?.location) actorKeys.push(activeEvent.location)
    if (Array.isArray(activeEvent?.actors)) actorKeys.push(...activeEvent.actors)
    for (const k of actorKeys) {
      const l = locations[k]
      if (l?.kind === 'country' && l.label) activeCountryLabels.add(l.label)
    }
    const countryLabelsSource = map.getSource('country-labels')
    if (countryLabelsSource) {
      countryLabelsSource.setData(countryLabelFC(activeCountryLabels))
    }

    // Update troop / movement line for the active event
    const lineFeature = lineFeatureFor(activeEvent?.id)
    const movementSource = map.getSource('movement')
    if (movementSource) {
      movementSource.setData(lineFeature
        ? { type: 'FeatureCollection', features: [lineFeature] }
        : { type: 'FeatureCollection', features: [] }
      )
    }

    // Highlight the active location with a marker (cities) or just a label (regions/countries).
    // The `kind` property on the feature controls which layers paint a dot vs. only a label.
    // Marker features: the primary location plus every actor that has a coordinate.
    // This way Addis (or any other named city/region) gets its dot + label whenever
    // it's referenced in an event, even if it's an actor rather than the primary subject.
    const markerKeys = []
    if (activeEvent?.location) markerKeys.push(activeEvent.location)
    if (Array.isArray(activeEvent?.actors)) markerKeys.push(...activeEvent.actors)
    const seenMarker = new Set()
    const markerFeatures = []
    for (const k of markerKeys) {
      if (seenMarker.has(k)) continue
      seenMarker.add(k)
      const l = locations[k]
      if (!l || l.lon == null || l.kind === 'external') continue
      markerFeatures.push({
        type: 'Feature',
        properties: { label: l.label, kind: l.kind, cityDot: !!l.cityDot },
        geometry: { type: 'Point', coordinates: [l.lon, l.lat] },
      })
    }
    const activeFC = !isExternal
      ? { type: 'FeatureCollection', features: markerFeatures }
      : { type: 'FeatureCollection', features: [] }

    if (map.getSource('active-marker')) {
      map.getSource('active-marker').setData(activeFC)
    } else {
      map.addSource('active-marker', { type: 'geojson', data: activeFC })
      // Cities (and city-regions like Addis with cityDot:true) get a halo + dot.
      // Pure regions/countries get only a label.
      const dotFilter = ['any',
        ['==', ['get', 'kind'], 'city'],
        ['==', ['get', 'cityDot'], true],
      ]
      map.addLayer({
        id: 'active-marker-halo',
        type: 'circle',
        source: 'active-marker',
        filter: dotFilter,
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 4, 12, 9, 26, 11, 38],
          'circle-color': '#f4685a',
          'circle-opacity': 0.22,
          'circle-blur': 0.5,
        },
      })
      map.addLayer({
        id: 'active-marker-dot',
        type: 'circle',
        source: 'active-marker',
        filter: dotFilter,
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 4, 4, 9, 7, 11, 9],
          'circle-color': '#ffffff',
          'circle-stroke-color': '#a92218',
          'circle-stroke-width': 2,
        },
      })
      // City label sits to the right of the dot; region/country label sits centered on the polygon.
      // 'cityDot' locations (like Addis) are treated as city for label placement.
      const isDotted = ['any',
        ['==', ['get', 'kind'], 'city'],
        ['==', ['get', 'cityDot'], true],
      ]
      map.addLayer({
        id: 'active-marker-label',
        type: 'symbol',
        source: 'active-marker',
        layout: {
          'text-field': ['get', 'label'],
          'text-font': ['Noto Sans Bold'],
          'text-size': ['case', isDotted, 13, 16],
          'text-letter-spacing': ['case', isDotted, 0.02, 0.16],
          'text-offset': ['case', isDotted, ['literal', [0.9, 0]], ['literal', [0, 0]]],
          'text-anchor': ['case', isDotted, 'left', 'center'],
          'text-allow-overlap': true,
        },
        paint: {
          'text-color': '#ffffff',
          'text-halo-color': '#0a0e1a',
          'text-halo-width': 1.5,
        },
      })
    }
  }, [activeEvent, styleLoaded])

  const loc = activeEvent?.location ? locations[activeEvent.location] : null
  const isExternal = loc?.kind === 'external'

  return (
    <div className="tigray-map">
      <div className="tigray-map-canvas" ref={containerRef} />

      {webglFailed && (
        <div className="tigray-map-fallback">
          <p className="tigray-map-fallback-eyebrow">Active location</p>
          <p className="tigray-map-fallback-place">{loc?.label ?? 'Tigray'}</p>
          <p className="tigray-map-fallback-note">Map requires WebGL.</p>
        </div>
      )}

    </div>
  )
}
