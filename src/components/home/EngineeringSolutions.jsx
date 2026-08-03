import { ArrowUpRight } from 'lucide-react'
import Reveal from '../shared/Reveal'
import { solutions } from '../../data/solutions'

function ProductCount({ count }) {
  return (
    <p className="mt-2.5 text-[0.68rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
      {count} PRODUCTS
    </p>
  )
}

function CardArrow() {
  return (
    <ArrowUpRight
      aria-hidden="true"
      className="explore-arrow mt-0.5 size-5 shrink-0 text-primary/70 transition-[transform,color] duration-500 [transition-timing-function:var(--ease-cine)]"
    />
  )
}

function FeaturedCard({ solution }) {
  return (
    <a href={solution.href} className="solution-card group block overflow-hidden rounded-[1.5rem]">
      <div className="grid lg:grid-cols-[1.35fr_1fr]">
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[22rem]">
          <img
            src={solution.image}
            alt={solution.name}
            loading="lazy"
            className="solution-image absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-deep/25 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/10" />
          <span className="absolute top-5 left-5 rounded-full border border-white/40 bg-white/85 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-blue-deep uppercase backdrop-blur-md">
            Flagship System
          </span>
        </div>

        <div className="flex flex-col justify-end bg-white p-7 sm:p-8 lg:p-9">
          <p className="kicker mb-3">Featured Solution</p>
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {solution.name}
            </h3>
            <CardArrow />
          </div>
          <ProductCount count={solution.productCount} />
          <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
            {solution.description}
          </p>
        </div>
      </div>
    </a>
  )
}

function SolutionCard({ solution }) {
  return (
    <a href={solution.href} className="solution-card group flex h-full flex-col overflow-hidden rounded-[1.5rem]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={solution.image}
          alt={solution.name}
          loading="lazy"
          className="solution-image absolute inset-0 size-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col bg-white p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
            {solution.name}
          </h3>
          <CardArrow />
        </div>
        <ProductCount count={solution.productCount} />
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          {solution.description}
        </p>
      </div>
    </a>
  )
}

export default function EngineeringSolutions() {
  const featured = solutions.find((item) => item.featured)
  const rest = solutions.filter((item) => !item.featured)

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="relative engineering-atmosphere section-y"
    >
      <div className="shell relative">
        <div className="max-w-3xl">
          <Reveal variant="blur">
            <p className="kicker mb-4">Engineering Solutions</p>
            <h2 id="solutions-heading" className="display-lg text-foreground">
              Engineered systems for stronger infrastructure.
            </h2>
          </Reveal>
          <Reveal variant="blur" delay={120}>
            <p className="lede mt-5">
              Gee Cee develops complete construction chemical solutions for infrastructure,
              commercial, industrial and residential projects — engineered for durability,
              protection and long-term performance under real site conditions.
            </p>
          </Reveal>
        </div>

        <Reveal variant="blur" delay={220} className="mt-14 lg:mt-20">
          <FeaturedCard solution={featured} />
        </Reveal>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          {rest.map((solution, index) => (
            <Reveal key={solution.slug} variant="blur" delay={300 + index * 110}>
              <SolutionCard solution={solution} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
