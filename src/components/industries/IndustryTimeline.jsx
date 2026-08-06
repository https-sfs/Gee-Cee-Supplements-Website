import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NODE_R = 10
/** Soft baby blue — matches site theme, understated. */
const STROKE = '#8EC5FF'
const HIGHLIGHT = '#B8DEFF'
const CONTENT_WIDTH = 430
/** Keep breathing room — do not tighten. */
const CONTENT_GAP = 72
const LEAD_IN = 36
/** Park nodes just inside the white gap beneath each section (not on photography). */
const GAP_NODE_INSET = 42

/**
 * Handcrafted segment rhythm. Final three transitions (05→08) are wider,
 * less symmetrical, more route-like.
 */
const SEGMENT_RHYTHM = [
  { amp: 0.52, bias: 0.38, sway: 0.22, curveSlow: 0.45 },
  { amp: 1.18, bias: 0.55, sway: -0.34, curveSlow: 0.62 },
  { amp: 0.78, bias: 0.42, sway: 0.18, curveSlow: 0.5 },
  { amp: 1.22, bias: 0.58, sway: -0.28, curveSlow: 0.65 },
  // 05 → 06 Water → Industrial — wider, asymmetric flow
  { amp: 1.35, bias: 0.32, sway: 0.48, curveSlow: 0.7 },
  // 06 → 07 Industrial → Commercial — long lazy arc
  { amp: 1.42, bias: 0.62, sway: -0.52, curveSlow: 0.72 },
  // 07 → 08 Commercial → Residential — settling approach
  { amp: 1.28, bias: 0.44, sway: 0.38, curveSlow: 0.68 },
]

function nodeXForSection(width, imageLeft) {
  const edgePad = Math.min(80, Math.max(20, width * 0.04))
  if (imageLeft) {
    return width - edgePad - CONTENT_WIDTH - CONTENT_GAP
  }
  return edgePad + CONTENT_WIDTH + CONTENT_GAP
}

function buildJourneyPath(points) {
  if (points.length < 2) return { d: '', endY: 0, lastY: 0 }

  const first = points[0]
  const last = points[points.length - 1]

  const leadX = first.x + (first.imageLeft ? -10 : 10)
  let d = `M ${leadX} ${first.y - LEAD_IN}`
  d += ` C ${leadX} ${first.y - LEAD_IN * 0.4}, ${first.x + (first.imageLeft ? -4 : 4)} ${first.y - LEAD_IN * 0.55}, ${first.x} ${first.y}`

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]
    const b = points[i + 1]
    const rhythm = SEGMENT_RHYTHM[i] || SEGMENT_RHYTHM[SEGMENT_RHYTHM.length - 1]
    const dy = b.y - a.y
    const dx = b.x - a.x

    // Asymmetric control geometry — avoid mirrored S repeats
    const pull = Math.abs(dx) * rhythm.amp * 0.32 + 22 * rhythm.amp
    const sway = rhythm.sway * pull
    const lift = dy * (0.08 + rhythm.amp * 0.04)

    const c1x = a.x + dx * (0.08 + rhythm.bias * 0.12) + sway
    const c1y = a.y + dy * rhythm.bias - lift * (i % 2 === 0 ? 1 : -0.35)
    const c2x = b.x - dx * (0.1 + (1 - rhythm.bias) * 0.1) - sway * 0.55
    const c2y = a.y + dy * (0.55 + rhythm.bias * 0.35) + lift * 0.4

    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`
  }

  // Path ends at Section 08 — no extension below the final node
  return { d, endY: last.y, lastY: last.y }
}

function closestLengthOnPath(path, totalLength, x, y) {
  let best = 0
  let bestDist = Infinity
  const samples = 320
  for (let s = 0; s <= samples; s++) {
    const len = (s / samples) * totalLength
    const pt = path.getPointAtLength(len)
    const dist = (pt.x - x) ** 2 + (pt.y - y) ** 2
    if (dist < bestDist) {
      bestDist = dist
      best = len
    }
  }
  return best
}

/** Ease into / out of nodes; linger through the curved mid-segment. */
function segmentEase(t, curveSlow = 0.55) {
  const x = Math.min(1, Math.max(0, t))
  // Smoothstep into node regions, slower mid (curves)
  const mid = curveSlow
  if (x < 0.18) {
    const u = x / 0.18
    return 0.18 * (u * u * (3 - 2 * u))
  }
  if (x > 0.82) {
    const u = (x - 0.82) / 0.18
    const eased = u * u * (3 - 2 * u)
    return 0.82 + 0.18 * eased
  }
  // Compress mid progress → physically slower on curves
  const midT = (x - 0.18) / 0.64
  const slowed = Math.pow(midT, 1 + mid * 0.35)
  return 0.18 + 0.64 * slowed
}

function clamp(v, a, b) {
  return Math.min(b, Math.max(a, v))
}

/**
 * Premium Infrastructure Journey — runs behind editorial sections.
 * Visible primarily in white gaps; sections mask the path as it passes under.
 */
export default function IndustryTimeline({ getAnchors }) {
  const rootRef = useRef(null)
  const bgPathRef = useRef(null)
  const donePathRef = useRef(null)
  const activePathRef = useRef(null)
  const highlightPathRef = useRef(null)
  const travelerCoreRef = useRef(null)
  const travelerGlowRef = useRef(null)
  const travelerTrailRef = useRef(null)
  const nodeOuterRefs = useRef([])
  const nodeRingRefs = useRef([])
  const nodeGroupRefs = useRef([])
  const pingedRef = useRef(new Set())
  const prevActiveRef = useRef(-1)

  const [geometry, setGeometry] = useState({
    width: 0,
    height: 0,
    points: [],
    pathD: '',
    lastY: 0,
    endY: 0,
  })

  const measure = () => {
    const root = rootRef.current
    const anchorEls = getAnchors?.() || []
    if (!root || anchorEls.length < 2) return

    const rootRect = root.getBoundingClientRect()
    const width = root.clientWidth
    const height = root.offsetHeight

    const points = anchorEls
      .map((el, index) => {
        if (!el) return null
        const rect = el.getBoundingClientRect()
        const next = anchorEls[index + 1]
        const imageLeft = index % 2 === 0

        // Anchor in the white gutter so the path stays masked behind panels.
        // Nodes 01–07 sit just below their section; Node 08 sits in the gap
        // above Residential so nothing continues under the final section.
        let y
        if (next) {
          const nextRect = next.getBoundingClientRect()
          const gap = nextRect.top - rect.bottom
          y = rect.bottom - rootRect.top + Math.min(GAP_NODE_INSET, gap * 0.42)
        } else {
          const prev = anchorEls[index - 1]
          if (prev) {
            const prevRect = prev.getBoundingClientRect()
            const gap = rect.top - prevRect.bottom
            y = rect.top - rootRect.top - Math.min(GAP_NODE_INSET, gap * 0.42)
          } else {
            y = rect.top - rootRect.top + rect.height / 2
          }
        }

        return {
          x: nodeXForSection(width, imageLeft),
          y,
          imageLeft,
        }
      })
      .filter(Boolean)

    if (points.length < 2) return

    const { d, endY, lastY } = buildJourneyPath(points)

    setGeometry((prev) => {
      if (
        prev.width === width &&
        prev.height === height &&
        prev.pathD === d &&
        prev.points.length === points.length &&
        prev.points.every(
          (p, i) =>
            Math.abs(p.x - points[i].x) < 0.5 &&
            Math.abs(p.y - points[i].y) < 0.5,
        )
      ) {
        return prev
      }
      return { width, height, points, pathD: d, lastY, endY }
    })
  }

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const parent = root.parentElement
    const run = () => requestAnimationFrame(measure)

    run()
    const t1 = window.setTimeout(run, 50)
    const t2 = window.setTimeout(run, 250)

    const ro = new ResizeObserver(run)
    ro.observe(root)
    if (parent) ro.observe(parent)

    window.addEventListener('resize', run)
    window.addEventListener('load', run)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      ro.disconnect()
      window.removeEventListener('resize', run)
      window.removeEventListener('load', run)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAnchors])

  useEffect(() => {
    const root = rootRef.current
    const measurePath = donePathRef.current
    if (!root || !measurePath || geometry.points.length < 2) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const totalLength = measurePath.getTotalLength()
    const container = root.parentElement || root

    // Path length at each node — journey ends at Node 08
    const nodeLens = geometry.points.map((p) =>
      closestLengthOnPath(measurePath, totalLength, p.x, p.y),
    )
    const journeyEndLen = nodeLens[nodeLens.length - 1] ?? totalLength

    const syncPaths = () => {
      ;[bgPathRef, donePathRef, activePathRef, highlightPathRef].forEach((ref) => {
        if (ref.current) {
          ref.current.setAttribute('d', geometry.pathD)
        }
      })
    }
    syncPaths()

    const triggerPing = (index) => {
      if (pingedRef.current.has(index)) return
      pingedRef.current.add(index)

      const group = nodeGroupRefs.current[index]
      const ring = nodeRingRefs.current[index]
      if (!group) return

      gsap.fromTo(
        group,
        { scale: 1 },
        {
          scale: 1.12,
          duration: 0.18,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
          transformOrigin: `${geometry.points[index].x}px ${geometry.points[index].y}px`,
        },
      )

      if (ring) {
        gsap.fromTo(
          ring,
          { attr: { r: NODE_R }, opacity: 0.3 },
          {
            attr: { r: NODE_R + 6 },
            opacity: 0,
            duration: 0.38,
            ease: 'power2.out',
          },
        )
      }
    }

    /**
     * Map page scroll → path distance via section centers vs a viewport focus line.
     * Traveller reaches Node i only when section i becomes the focused section.
     */
    const computeJourney = () => {
      const anchors = getAnchors?.() || []
      if (anchors.length < 2) {
        return { dist: 0, travellerOpacity: 0, ending: 0 }
      }

      const focusY = window.innerHeight * 0.42
      const scrollY = window.scrollY || window.pageYOffset

      const arrivals = anchors.map((el) => {
        const top = el.getBoundingClientRect().top + scrollY
        return top + el.offsetHeight / 2 - focusY
      })

      const firstArrival = arrivals[0]
      const lastArrival = arrivals[arrivals.length - 1]
      const leadStart = firstArrival - window.innerHeight * 0.35
      const lastNode = journeyEndLen

      if (scrollY < leadStart) {
        return { dist: 0, travellerOpacity: 0, ending: 0 }
      }

      if (scrollY < firstArrival) {
        const t = clamp((scrollY - leadStart) / (firstArrival - leadStart), 0, 1)
        const eased = segmentEase(t, 0.4)
        return {
          dist: eased * nodeLens[0],
          travellerOpacity: clamp(t * 1.5, 0, 1),
          ending: 0,
        }
      }

      for (let i = 0; i < arrivals.length - 1; i++) {
        const a0 = arrivals[i]
        const a1 = arrivals[i + 1]
        if (scrollY >= a0 && scrollY < a1) {
          const raw = (scrollY - a0) / Math.max(a1 - a0, 1)
          const rhythm = SEGMENT_RHYTHM[i] || SEGMENT_RHYTHM[0]
          const eased = segmentEase(raw, rhythm.curveSlow)
          // raw=0 → Node i (section i focused); raw=1 → Node i+1 (next section focuses)
          return {
            dist: nodeLens[i] + (nodeLens[i + 1] - nodeLens[i]) * eased,
            travellerOpacity: 1,
            ending: 0,
          }
        }
      }

      // Section 08 reached — freeze at final node; hide traveller once past it
      if (scrollY >= lastArrival) {
        const pastSection = scrollY > lastArrival + window.innerHeight * 0.35
        return {
          dist: lastNode,
          travellerOpacity: pastSection ? 0 : 1,
          ending: 1,
        }
      }

      return { dist: 0, travellerOpacity: 0, ending: 0 }
    }

    const applyJourney = () => {
      const { dist, travellerOpacity, ending } = computeJourney()
      const d = clamp(dist, 0, journeyEndLen)

      // Blob-driven active index: highest node the traveller has reached
      let activeIndex = -1
      for (let i = 0; i < nodeLens.length; i++) {
        if (d >= nodeLens[i] - 1.5) activeIndex = i
      }

      if (bgPathRef.current) {
        bgPathRef.current.style.strokeDasharray = 'none'
        bgPathRef.current.style.strokeDashoffset = '0'
        bgPathRef.current.setAttribute('opacity', '0.28')
      }

      if (donePathRef.current) {
        donePathRef.current.style.strokeDasharray = `${totalLength}`
        donePathRef.current.style.strokeDashoffset = `${totalLength - d}`
        donePathRef.current.setAttribute('opacity', '0.55')
      }

      const wave = Math.max(40, totalLength * 0.05)
      const waveStart = Math.max(0, d - wave)
      if (activePathRef.current) {
        activePathRef.current.style.strokeDasharray = `${wave} ${totalLength}`
        activePathRef.current.style.strokeDashoffset = `${-waveStart}`
        activePathRef.current.setAttribute(
          'opacity',
          travellerOpacity > 0.05 ? String(travellerOpacity) : '0',
        )
      }

      if (highlightPathRef.current) {
        const tip = Math.max(16, wave * 0.32)
        const tipStart = Math.max(0, d - tip)
        highlightPathRef.current.style.strokeDasharray = `${tip} ${totalLength}`
        highlightPathRef.current.style.strokeDashoffset = `${-tipStart}`
        highlightPathRef.current.setAttribute(
          'opacity',
          travellerOpacity > 0.05 ? String(0.8 * travellerOpacity) : '0',
        )
      }

      const tipPt = measurePath.getPointAtLength(d)
      const trailBack = Math.max(0, d - 20)
      const trailPt = measurePath.getPointAtLength(trailBack)
      const ahead = measurePath.getPointAtLength(Math.min(totalLength, d + 12))
      const angle = Math.atan2(ahead.y - tipPt.y, ahead.x - tipPt.x)

      const core = travelerCoreRef.current
      const glow = travelerGlowRef.current
      const trail = travelerTrailRef.current

      if (glow) {
        glow.setAttribute('cx', String(tipPt.x))
        glow.setAttribute('cy', String(tipPt.y))
        glow.setAttribute('opacity', String(0.32 * travellerOpacity))
      }
      if (core) {
        core.setAttribute('cx', String(tipPt.x))
        core.setAttribute('cy', String(tipPt.y))
        core.setAttribute('opacity', String(travellerOpacity))
      }
      if (trail) {
        trail.setAttribute('x1', String(trailPt.x))
        trail.setAttribute('y1', String(trailPt.y))
        trail.setAttribute('x2', String(tipPt.x))
        trail.setAttribute('y2', String(tipPt.y))
        trail.setAttribute('opacity', String(0.22 * travellerOpacity))
        trail.setAttribute(
          'stroke-width',
          String(2.6 + Math.abs(Math.sin(angle)) * 0.5),
        )
      }

      const lastIdx = geometry.points.length - 1

      geometry.points.forEach((_, i) => {
        const nodeLen = nodeLens[i]
        const nextLen = i < lastIdx ? nodeLens[i + 1] : journeyEndLen
        const reached = d >= nodeLen - 1.5
        const isComplete =
          (i < lastIdx && d >= nextLen - 1.5) ||
          (i === lastIdx && ending >= 1)
        const isActive = reached && !isComplete && activeIndex === i

        const group = nodeGroupRefs.current[i]
        const outer = nodeOuterRefs.current[i]
        if (!group || !outer) return

        // Always: white center + thin baby-blue outline
        outer.setAttribute('fill', '#ffffff')
        outer.setAttribute('stroke', STROKE)

        if (!reached) {
          outer.setAttribute('stroke-width', '1.5')
          outer.removeAttribute('filter')
          group.style.opacity = d > nodeLen - totalLength * 0.05 ? '0.5' : '0.28'
          if (!pingedRef.current.has(i)) group.style.transform = 'scale(0.92)'
        } else if (isActive) {
          outer.setAttribute('stroke-width', '2')
          outer.setAttribute('filter', 'url(#journey-node-active-glow)')
          group.style.opacity = '1'
          if (prevActiveRef.current !== i) {
            triggerPing(i)
            prevActiveRef.current = i
          }
        } else {
          outer.setAttribute('stroke-width', '1.5')
          outer.setAttribute('filter', 'url(#journey-node-done-glow)')
          group.style.opacity = '0.9'
          group.style.transform = 'scale(1)'
          if (!pingedRef.current.has(i)) triggerPing(i)
        }
      })
    }

    const ctx = gsap.context(() => {
      if (reduced) {
        if (donePathRef.current) {
          donePathRef.current.style.strokeDasharray = `${totalLength}`
          donePathRef.current.style.strokeDashoffset = '0'
          donePathRef.current.setAttribute('opacity', '0.55')
        }
        if (bgPathRef.current) bgPathRef.current.setAttribute('opacity', '0.28')
        geometry.points.forEach((_, i) => {
          const outer = nodeOuterRefs.current[i]
          const group = nodeGroupRefs.current[i]
          if (outer) {
            outer.setAttribute('fill', '#ffffff')
            outer.setAttribute('stroke', STROKE)
            outer.setAttribute('stroke-width', '1.5')
            outer.setAttribute('filter', 'url(#journey-node-done-glow)')
          }
          if (group) group.style.opacity = '0.9'
        })
        return
      }

      ScrollTrigger.create({
        trigger: container,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 0.4,
        invalidateOnRefresh: true,
        onUpdate: () => applyJourney(),
        onRefresh: () => applyJourney(),
      })

      applyJourney()
    }, root)

    ScrollTrigger.refresh()

    return () => {
      ctx.revert()
      pingedRef.current = new Set()
      prevActiveRef.current = -1
    }
  }, [geometry, getAnchors])

  const { points, pathD, width, height } = geometry

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-visible lg:block"
    >
      {points.length >= 2 && pathD ? (
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="absolute left-0 top-0 overflow-visible"
          fill="none"
        >
          <defs>
            <filter id="journey-line-glow" x="-80%" y="-30%" width="260%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.1" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 0.557
                        0 0 0 0 0.773
                        0 0 0 0 1
                        0 0 0 0.16 0"
                result="glow"
              />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="journey-active-glow" x="-100%" y="-40%" width="300%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 0.557
                        0 0 0 0 0.773
                        0 0 0 0 1
                        0 0 0 0.28 0"
                result="glow"
              />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="journey-node-active-glow" x="-120%" y="-120%" width="340%" height="340%">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="2.4"
                floodColor="#8EC5FF"
                floodOpacity="0.28"
              />
            </filter>

            <filter id="journey-node-done-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feDropShadow
                dx="0"
                dy="0.5"
                stdDeviation="1.1"
                floodColor="#8EC5FF"
                floodOpacity="0.14"
              />
            </filter>

            <radialGradient id="journey-traveler-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8EC5FF" stopOpacity="0.42" />
              <stop offset="45%" stopColor="#8EC5FF" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#8EC5FF" stopOpacity="0" />
            </radialGradient>

            <mask id="journey-path-mask" maskUnits="userSpaceOnUse">
              <rect x="0" y="0" width={width} height={height} fill="white" />
            </mask>
          </defs>

          <g mask="url(#journey-path-mask)">
            {/* Inactive full route */}
            <path
              ref={bgPathRef}
              d={pathD}
              stroke={STROKE}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.28"
            />

            {/* Completed route */}
            <path
              ref={donePathRef}
              d={pathD}
              stroke={STROKE}
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.55"
              filter="url(#journey-line-glow)"
            />

            {/* Active segment at full strength */}
            <path
              ref={activePathRef}
              d={pathD}
              stroke={STROKE}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0"
              filter="url(#journey-active-glow)"
            />

            {/* Light-wave highlight at tip */}
            <path
              ref={highlightPathRef}
              d={pathD}
              stroke={HIGHLIGHT}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0"
            />
          </g>

          {/* Trailing glow (motion streak) */}
          <line
            ref={travelerTrailRef}
            stroke={STROKE}
            strokeLinecap="round"
            opacity="0"
            filter="url(#journey-active-glow)"
          />

          {/* Soft radial bloom */}
          <circle
            ref={travelerGlowRef}
            r="11"
            fill="url(#journey-traveler-glow)"
            opacity="0"
          />

          {/* Soft core */}
          <circle
            ref={travelerCoreRef}
            r="3.5"
            fill="#FFFFFF"
            stroke={STROKE}
            strokeWidth="1.75"
            opacity="0"
            filter="url(#journey-node-active-glow)"
          />

          {points.map((p, i) => (
            <g
              key={`node-${i}`}
              ref={(el) => {
                nodeGroupRefs.current[i] = el
              }}
              style={{
                transformOrigin: `${p.x}px ${p.y}px`,
                transformBox: 'view-box',
                opacity: 0.28,
                transition: 'opacity 0.35s ease',
              }}
            >
              <circle
                ref={(el) => {
                  nodeRingRefs.current[i] = el
                }}
                cx={p.x}
                cy={p.y}
                r={NODE_R}
                fill="none"
                stroke={STROKE}
                strokeWidth="1.25"
                opacity="0"
              />
              <circle
                ref={(el) => {
                  nodeOuterRefs.current[i] = el
                }}
                cx={p.x}
                cy={p.y}
                r={NODE_R}
                fill="#ffffff"
                stroke={STROKE}
                strokeWidth="1.5"
              />
            </g>
          ))}
        </svg>
      ) : null}
    </div>
  )
}
