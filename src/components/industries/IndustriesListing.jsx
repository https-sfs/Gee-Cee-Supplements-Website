import { useCallback, useRef } from 'react'
import IndustryPhotoSection from './IndustryPhotoSection'
import IndustryTimeline from './IndustryTimeline'
import { industries } from '../../data/industries'

const PHOTO_SLUGS = new Set([
  'roads-highways',
  'bridges-flyovers',
  'railways-metro',
  'dams-irrigation',
  'water-sewage',
  'industrial-plants',
  'commercial-institutional',
  'residential-developments',
])

const JOURNEY_LABELS = {
  'roads-highways': 'Roads',
  'bridges-flyovers': 'Bridges',
  'railways-metro': 'Railways',
  'dams-irrigation': 'Dams',
  'water-sewage': 'Water',
  'industrial-plants': 'Industrial',
  'commercial-institutional': 'Commercial',
  'residential-developments': 'Residential',
}

/**
 * Industry showcase stack with Infrastructure Journey timeline overlay.
 * Odd sections = Roads master (image left). Even = mirrored (content left).
 */
export default function IndustriesListing() {
  const photoIndustries = industries.filter((item) => PHOTO_SLUGS.has(item.slug))
  const anchorRefs = useRef([])

  const getAnchors = useCallback(() => anchorRefs.current.filter(Boolean), [])

  return (
    <section
      id="industries-listing"
      aria-labelledby="industries-listing-heading"
      className="relative bg-blue-soft"
    >
      <h2 id="industries-listing-heading" className="sr-only">
        Industries we serve
      </h2>

      <div className="relative flex flex-col" style={{ gap: '8.125rem', paddingBottom: '7.5rem' }}>
        {/* Timeline sits behind sections — revealed only in white gaps */}
        <IndustryTimeline getAnchors={getAnchors} />

        {photoIndustries.map((industry, index) => (
          <div
            key={industry.slug}
            ref={(el) => {
              anchorRefs.current[index] = el
            }}
            data-journey-label={JOURNEY_LABELS[industry.slug]}
            className="relative z-10 bg-white"
          >
            <IndustryPhotoSection
              number={industry.number}
              name={industry.name}
              description={industry.description}
              image={industry.image}
              imageAlt={industry.imageAlt}
              applications={industry.applications}
              href={industry.href}
              mirror={Number(industry.number) % 2 === 0}
              imageObjectPosition={industry.imageObjectPosition}
              imageScale={industry.imageScale}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
