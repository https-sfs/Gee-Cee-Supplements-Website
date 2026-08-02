const services = [
  {
    title: 'Website Development',
    description:
      'Fast, refined web experiences engineered for performance and polish.',
  },
  {
    title: 'UI/UX Design',
    description:
      'Clear interfaces and thoughtful flows that feel effortless to use.',
  },
  {
    title: 'Brand Identity',
    description:
      'Distinct visual systems that make your brand instantly recognizable.',
  },
  {
    title: 'Digital Marketing',
    description:
      'Strategic campaigns that turn attention into lasting engagement.',
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-white py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">
            Services
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            What we craft
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl bg-slate-50/80 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)] ring-1 ring-slate-200/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
