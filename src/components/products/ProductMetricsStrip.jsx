import { Calendar, Factory, FlaskConical, ShieldCheck } from 'lucide-react'
import Reveal from '../shared/Reveal'
import CountUp from '../shared/CountUp'
import { cn } from '../../lib/utils'

const metrics = [
  {
    icon: FlaskConical,
    end: 60,
    suffix: '+',
    deferSuffix: true,
    animate: true,
    subtext: 'Products',
    caption: 'For every construction need',
  },
  {
    icon: ShieldCheck,
    headline: 'ISO',
    animate: false,
    subtext: 'Certified',
    caption: 'Quality you can trust',
  },
  {
    icon: Calendar,
    end: 25,
    suffix: '+',
    deferSuffix: true,
    animate: true,
    subtext: 'Years',
    caption: 'Of industry expertise',
  },
  {
    icon: Factory,
    end: 200,
    suffix: 'T',
    deferSuffix: false,
    animate: true,
    subtext: 'Daily Production',
    caption: 'Manufacturing with precision',
  },
]

export default function ProductMetricsStrip() {
  return (
    <Reveal>
      <div
        className={cn(
          'mt-20 mb-20 grid grid-cols-1 overflow-visible rounded-3xl border bg-white md:grid-cols-2 lg:grid-cols-4',
          'min-h-[8.5rem] lg:min-h-[8.75rem]',
        )}
        style={{
          borderColor: '#EEF2F7',
          boxShadow: '0 20px 60px rgba(16,24,40,0.05)',
        }}
      >
        {metrics.map((metric, i) => {
          const Icon = metric.icon
          const showDivider = i < metrics.length - 1
          const key = metric.subtext

          return (
            <div
              key={key}
              className={cn(
                'group relative flex items-center gap-5 px-6 py-6 transition-transform duration-300 ease-out',
                'hover:-translate-y-[3px]',
                'md:px-7 lg:px-8 lg:py-0',
              )}
            >
              <Icon
                className="size-[42px] shrink-0 text-primary transition-transform duration-300 ease-out group-hover:scale-105"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p
                  className="font-display font-bold tracking-[-0.03em]"
                  style={{ color: '#101722', fontSize: '3rem', lineHeight: 1 }}
                >
                  {metric.animate ? (
                    <CountUp
                      end={metric.end}
                      suffix={metric.suffix}
                      deferSuffix={metric.deferSuffix}
                      duration={1500}
                      aria-label={`${metric.end}${metric.suffix} ${metric.subtext}`}
                    />
                  ) : (
                    metric.headline
                  )}
                </p>
                <p
                  className="mt-1 font-semibold"
                  style={{ color: '#101722', fontSize: '1.375rem', lineHeight: 1.2 }}
                >
                  {metric.subtext}
                </p>
                <p className="mt-1.5 font-normal" style={{ color: '#6d7684', fontSize: '0.9375rem' }}>
                  {metric.caption}
                </p>
              </div>

              {showDivider ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 top-1/2 hidden h-[60px] w-px -translate-y-1/2 lg:block"
                  style={{ background: '#ECEFF5' }}
                />
              ) : null}
            </div>
          )
        })}
      </div>
    </Reveal>
  )
}
