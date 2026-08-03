import { ArrowRight } from 'lucide-react'
import Reveal from '../shared/Reveal'
import SectionHeading from '../shared/SectionHeading'
import Button from '../ui/Button'

const highlights = [
  'Custom-made formulations developed for project-specific requirements',
  'Products meeting BIS, ASTM and British Standard specifications',
  'Technical team supporting mix design, trials and application',
  'Supply capacity proven on national infrastructure programmes',
]

export default function ManufacturingRD() {
  return (
    <section
      id="manufacturing"
      aria-labelledby="manufacturing-heading"
      className="relative engineering-atmosphere section-y"
    >
      <div className="shell relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal variant="blur" className="order-2 lg:order-1">
          <div className="grid gap-4">
            <img
              src="/media/manufacturing/facility.jpg"
              alt="Gee Cee manufacturing unit at Nuzvid Industrial Park"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-[1.5rem] object-cover shadow-[var(--shadow-lift)]"
            />
            <img
              src="/media/manufacturing/laboratory.jpg"
              alt="In-house laboratory and R&D facility"
              loading="lazy"
              className="aspect-[16/7] w-full rounded-[1.5rem] object-cover shadow-[var(--shadow-soft)]"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            titleId="manufacturing-heading"
            kicker="Manufacturing & R&D"
            title={'Two units in Nuzvid.\nOne laboratory\nbehind every batch.'}
            body="Gee Cee Group was the first construction chemicals manufacturing establishment in the combined state of Andhra Pradesh. Today our two units produce 200 tons per day, with every formulation traceable to in-house testing."
          />

          <Reveal variant="blur" delay={140} className="mt-10 space-y-5">
            {highlights.map((line) => (
              <div key={line} className="flex gap-4">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                <p className="text-sm leading-relaxed text-muted-foreground">{line}</p>
              </div>
            ))}
          </Reveal>

          <Reveal variant="blur" delay={220} className="mt-10">
            <Button asChild variant="outlineBlue" size="lg">
              <a href="#about">
                Our story <ArrowRight className="size-4" />
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
