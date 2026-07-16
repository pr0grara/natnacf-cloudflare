import React, { useMemo } from 'react'
import { geoIdentity, geoPath } from 'd3-geo'
import hornMap from '../data/horn-map.json'

// Static, light-theme mini-map of the Horn of Africa with Tigray highlighted.
// Used on the About page's "Where Tigray Is" section. No interactivity, no WebGL,
// just real geographic boundaries rendered to SVG via d3-geo so the polygons match
// the full MapLibre map on the Why Tigray page.
const W = 400
const H = 400
const BBOX = [[26, -3], [54, 22]]

function makeProjection() {
  const proj = geoIdentity().reflectY(true)
  const [[w, s], [e, n]] = BBOX
  proj.fitSize([W, H], {
    type: 'Feature',
    geometry: { type: 'Polygon', coordinates: [[ [w,s],[e,s],[e,n],[w,n],[w,s] ]] },
  })
  return proj
}

const COUNTRY_LABELS = [
  { name: 'SUDAN',     lon: 31,    lat: 14.5 },
  { name: 'ERITREA',   lon: 39,    lat: 16   },
  { name: 'YEMEN',     lon: 47,    lat: 16   },
  { name: 'DJIBOUTI',  lon: 43.2,  lat: 11.7 },
  { name: 'SOMALIA',   lon: 47,    lat:  6   },
  { name: 'KENYA',     lon: 38,    lat:  1.5 },
  { name: 'S. SUDAN',  lon: 30.5,  lat:  7.5 },
  { name: 'ETHIOPIA',  lon: 39,    lat:  9   },
]

export default function MiniMap() {
  const projection = useMemo(makeProjection, [])
  const path = useMemo(() => geoPath(projection), [projection])

  return (
    <svg viewBox={`0 0 ${W} ${H}`} aria-label="Map of the Horn of Africa with Tigray highlighted" role="img">
      {hornMap.features.map((feature, i) => {
        const p = feature.properties
        const isTigray = p.isTigray
        let fill = '#eef1f6'
        let stroke = '#cbd3df'
        let strokeWidth = 0.6
        if (p.kind === 'eth-region' && !isTigray) {
          fill = '#dde2eb'
          stroke = '#a8b1c1'
          strokeWidth = 0.5
        }
        if (isTigray) {
          fill = '#c83d2e'
          stroke = '#8a2618'
          strokeWidth = 1.4
        }
        return (
          <path
            key={p.name + i}
            d={path(feature)}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        )
      })}

      {COUNTRY_LABELS.map((c) => {
        const xy = projection([c.lon, c.lat])
        if (!xy) return null
        if (xy[0] < -10 || xy[0] > W + 10 || xy[1] < -10 || xy[1] > H + 10) return null
        return (
          <text
            key={c.name}
            x={xy[0]}
            y={xy[1]}
            fontSize="9.5"
            fill="#7b8499"
            fontFamily="Inter, sans-serif"
            letterSpacing="1.4"
            textAnchor="middle"
          >
            {c.name}
          </text>
        )
      })}

      {/* Tigray label */}
      {(() => {
        const xy = projection([38.85, 13.55])
        return (
          <text
            x={xy[0]}
            y={xy[1]}
            fontSize="11"
            fill="#ffffff"
            fontFamily="Inter, sans-serif"
            fontWeight="700"
            letterSpacing="1.2"
            textAnchor="middle"
            style={{ paintOrder: 'stroke', stroke: '#8a2618', strokeWidth: 0.5 }}
          >
            TIGRAY
          </text>
        )
      })()}

      {/* Mekelle dot — capital marker */}
      {(() => {
        const xy = projection([39.475, 13.498])
        return (
          <g>
            <circle cx={xy[0]} cy={xy[1]} r="3" fill="#ffffff" stroke="#8a2618" strokeWidth="1.4" />
            <text x={xy[0] + 6} y={xy[1] + 3} fontSize="9" fill="#3a3f4d" fontFamily="Inter, sans-serif">Mekelle</text>
          </g>
        )
      })()}
    </svg>
  )
}
