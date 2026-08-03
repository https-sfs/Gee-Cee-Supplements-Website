import { CalendarDays, Boxes, Landmark, Layers } from 'lucide-react'
import SectionHeading from '../shared/SectionHeading'
import Reveal from '../shared/Reveal'

const stats = [
  {
    value: '25+',
    label: 'Years of Experience',
    detail: 'Engineering construction chemistry since 1999.',
    icon: CalendarDays,
  },
  {
    value: '60+',
    label: 'Products',
    detail: 'Formulated systems for mix, protect, repair and finish.',
    icon: Boxes,
  },
  {
    value: '100+',
    label: 'Infrastructure Projects',
    detail: 'Highways, rail, irrigation and capital works nationwide.',
    icon: Landmark,
  },
  {
    value: '8',
    label: 'Industries Served',
    detail: 'From roads and dams to plants, commercial and residential.',
    icon: Layers,
  },
]

export default function EngineeringHeritage() {
  return (
    <section
      id="engineering"
      aria-labelledby="engineering-heading"
      className="relative sky section-y"
    >
      {/* Soft bridge from cinematic black into engineering white */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/[0.06] to-transparent"
      />

      <div className="shell relative">
        <SectionHeading
          titleId="engineering-heading"
          kicker="Engineering Since 1999"
          title="You see the structure. We strengthen what you don't see."
          body="Gee Cee Supplements is an ISI and ISO certified construction chemicals manufacturer. For more than two decades we have formulated admixtures, waterproofing, grouts and protective systems that keep critical infrastructure performing — quietly, reliably, and to standard."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-5">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100}>
              <article className="glass-panel group flex h-full flex-col rounded-[1.5rem] p-7 transition-[transform,box-shadow] duration-700 [transition-timing-function:var(--ease-cine)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] lg:p-8">
                <div className="flex items-center justify-between gap-4">
                  <stat.icon
                    className="size-5 text-primary"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <span className="h-px flex-1 bg-gradient-to-r from-primary/35 to-transparent" />
                </div>

                <p className="font-display mt-8 text-4xl font-semibold tracking-tight text-blue-deep sm:text-5xl">
                  {stat.value}
                </p>
                <h3 className="mt-3 text-base font-semibold text-foreground">
                  {stat.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {stat.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
