import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from './shared/Reveal'
import { cn } from '../lib/utils'

const companyLinks = [
  { href: '/', label: 'Home', internal: true },
  { href: '/about', label: 'About', internal: true },
  { href: '/products', label: 'Products', internal: true },
  { href: '/#projects', label: 'Industries' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
]

const productLinks = [
  {
    href: '/products/concrete-admixtures',
    label: 'Concrete & Mortar Admixtures',
    internal: true,
  },
  {
    href: '/products/integral-waterproofing',
    label: 'Integral Waterproofing Compounds',
    internal: true,
  },
  {
    href: '/products/grouts-anchoring',
    label: 'Grouts & Anchoring Systems',
    internal: true,
  },
  {
    href: '/products/waterproofing-protective-coatings',
    label: 'Waterproofing & Protective Coatings',
    internal: true,
  },
  {
    href: '/products/bonding-agents',
    label: 'Bonding Agents',
    internal: true,
  },
  {
    href: '/products/repairs-rehabilitation',
    label: 'Repairs & Rehabilitation',
    internal: true,
  },
]

function FooterLink({ href, label, className, internal = false }) {
  const classes = cn(
    'group inline-flex items-center gap-1.5 text-sm text-foreground/55 transition-all duration-[250ms] [transition-timing-function:var(--ease-cine)] hover:text-primary',
    className,
  )
  const content = (
    <>
      <span>{label}</span>
      <ArrowRight
        aria-hidden="true"
        className="size-3.5 -translate-x-1 opacity-0 transition-all duration-[250ms] [transition-timing-function:var(--ease-cine)] group-hover:translate-x-0 group-hover:opacity-100"
      />
    </>
  )

  if (internal) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  )
}

export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        background: `
          radial-gradient(70% 55% at 18% 0%, color-mix(in oklab, #5b9cf5 12%, transparent) 0%, transparent 58%),
          linear-gradient(
            180deg,
            rgba(243, 247, 250, 0.92) 0%,
            rgba(238, 243, 248, 0.88) 45%,
            rgba(232, 238, 245, 0.94) 100%
          )
        `,
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #2547a0 1px, transparent 1px),
            linear-gradient(to bottom, #2547a0 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px',
        }}
      />

      <Reveal className="relative mx-auto w-full max-w-[1400px] px-6 pt-20 pb-[3.125rem] sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[1.45fr_1fr_1.15fr_1.25fr] lg:gap-16 xl:gap-20">
          <div>
            <a href="#home" className="inline-flex">
              <img
                src="/images/logotrpc.png"
                alt="Gee Cee"
                className="h-12 w-auto object-contain sm:h-14"
                width={160}
                height={56}
              />
            </a>
            <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary">
              Construction Chemicals
            </p>
            <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-foreground/55">
              Construction chemicals manufactured in Andhra Pradesh and supplied
              to infrastructure across India since 1999.
            </p>
          </div>

          <div>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-foreground/80">
              Company
            </h3>
            <ul className="mt-6 space-y-4">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLink
                      href={link.href}
                      label={link.label}
                      internal={link.internal}
                    />
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-foreground/80">
              Product Range
            </h3>
            <ul className="mt-6 space-y-4">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink
                    href={link.href}
                    label={link.label}
                    internal={link.internal}
                  />
                </li>
              ))}
              <li>
                <FooterLink
                  href="/products"
                  label="View all categories"
                  internal
                  className="font-medium text-blue-deep hover:text-primary"
                />
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-foreground/80">
              Get in Touch
            </h3>
            <ul className="mt-6 space-y-5 text-sm text-foreground/55">
              <li className="flex gap-3.5">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-[1.15rem] shrink-0 text-primary"
                  strokeWidth={1.5}
                />
                <span className="leading-relaxed">
                  Plot No.35, 1st Lane, Srinivasa Nagar Bank Colony 3,
                  Vijayawada 520008, Andhra Pradesh, India
                </span>
              </li>
              <li className="flex gap-3.5">
                <Phone
                  aria-hidden="true"
                  className="mt-0.5 size-[1.15rem] shrink-0 text-primary"
                  strokeWidth={1.5}
                />
                <a
                  href="tel:+919849990061"
                  className="transition-colors duration-[250ms] hover:text-primary"
                >
                  +91 98499 90061
                </a>
              </li>
              <li className="flex gap-3.5">
                <Mail
                  aria-hidden="true"
                  className="mt-0.5 size-[1.15rem] shrink-0 text-primary"
                  strokeWidth={1.5}
                />
                <a
                  href="mailto:info@geeceechem.com"
                  className="transition-colors duration-[250ms] hover:text-primary"
                >
                  info@geeceechem.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mt-14 h-px w-full sm:mt-16"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(100, 130, 170, 0.25) 50%, transparent 100%)',
          }}
        />

        <div className="mt-7 flex flex-col gap-4 text-xs tracking-wide text-foreground/45 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Gee Cee Supplements. All rights reserved.</p>
          <p className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
            <span>ISI Certified — IS: 2645 (CM/L-4774885)</span>
            <span>ISO 9001:2015</span>
          </p>
        </div>
      </Reveal>
    </footer>
  )
}
