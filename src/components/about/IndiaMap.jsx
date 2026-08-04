import { INDIA_OUTLINE_PATH } from './indiaOutlinePath'

/**
 * Geographic India map for About Presence.
 * Silhouette path sourced from Wikimedia Commons “India outline.svg”
 * (also mirrored at /public/media/about/india-map.svg).
 */

const VIEW = { w: 667, h: 777 }

/** Approximate geographic marker positions in the outline viewBox. */
const MARKERS = [
  { id: 'mh', cx: 162, cy: 448 }, // Maharashtra
  { id: 'cg', cx: 342, cy: 395 }, // Chhattisgarh
  { id: 'od', cx: 412, cy: 382 }, // Odisha
  { id: 'ts', cx: 275, cy: 492 }, // Telangana
  { id: 'ap', cx: 338, cy: 542 }, // Andhra Pradesh
  { id: 'ka', cx: 218, cy: 585 }, // Karnataka
  { id: 'tn', cx: 288, cy: 655 }, // Tamil Nadu
]

export default function IndiaMap({ className = '' }) {
  return (
    <svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      className={className}
      role="img"
      aria-label="Map of India highlighting seven states where Gee Cee supplies"
    >
      <defs>
        <linearGradient id="presenceIndiaFill" x1="80" y1="40" x2="520" y2="720" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BFD9F8" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#A8CBF2" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#9AC0EC" stopOpacity="0.9" />
        </linearGradient>
        <pattern id="presenceIndiaTopo" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M0 13 H26 M13 0 V26" stroke="#4A90E8" strokeOpacity="0.22" strokeWidth="0.7" />
          <path d="M0 0 L26 26 M26 0 L0 26" stroke="#4A90E8" strokeOpacity="0.12" strokeWidth="0.55" />
        </pattern>
        <clipPath id="presenceIndiaClip">
          <path d={INDIA_OUTLINE_PATH} />
        </clipPath>
        <radialGradient id="presencePinGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2495ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2495ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Silhouette — soft but unmistakable (~30% visual weight on page) */}
      <g opacity="0.88">
        <path
          d={INDIA_OUTLINE_PATH}
          fill="url(#presenceIndiaFill)"
          fillOpacity="0.72"
          stroke="#5B9CF5"
          strokeWidth="2.6"
          strokeOpacity="0.85"
          strokeLinejoin="round"
        />
        <g clipPath="url(#presenceIndiaClip)" opacity="0.7">
          <rect width={VIEW.w} height={VIEW.h} fill="url(#presenceIndiaTopo)" />
        </g>
      </g>

      <g stroke="#2495ff" strokeOpacity="0.16" strokeWidth="1.35" fill="none">
        <path d="M162 448 L275 492 L338 542" />
        <path d="M275 492 L218 585 L288 655" />
        <path d="M275 492 L342 395 L412 382" />
      </g>

      {MARKERS.map((m) => (
        <g key={m.id} data-map-marker>
          <circle cx={m.cx} cy={m.cy} r="14.25" fill="url(#presencePinGlow)" />
          <circle
            cx={m.cx}
            cy={m.cy}
            r="7.65"
            fill="#ffffff"
            stroke="#2495ff"
            strokeWidth="2.35"
          />
          <circle cx={m.cx} cy={m.cy} r="2.45" fill="#2495ff" fillOpacity="0.9" />
        </g>
      ))}
    </svg>
  )
}
