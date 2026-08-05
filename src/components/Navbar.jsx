import { useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Phone } from 'lucide-react'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Projects', to: '/#projects' },
  { label: 'Contact', to: '/#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)

  return (
    <header
      ref={navRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-5xl px-4 pt-3 sm:px-6">
        <nav className="pointer-events-auto flex h-12 items-center justify-between gap-4 rounded-full border border-white/10 bg-slate-950/45 px-3 backdrop-blur-md sm:h-11 sm:gap-6 sm:px-4">
          <Link to="/" className="flex shrink-0 items-center">
            <img
              src="/images/logotrpc.png"
              alt="Gee Cee"
              className="h-7 w-auto object-contain"
            />
          </Link>

          <ul className="hidden items-center gap-5 md:flex">
            {links.map((link) => (
              <li key={link.label}>
                {link.to.startsWith('/#') ? (
                  <a
                    href={link.to}
                    className="text-sm font-medium text-white/85 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors duration-200 ${
                        isActive ? 'text-white underline underline-offset-4' : 'text-white/85 hover:text-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:+919849990061"
              className="hidden items-center gap-1.5 text-xs font-medium text-white/85 transition-colors hover:text-white lg:inline-flex"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              +91 98499 90061
            </a>
            <a
              href="mailto:info@geeceechem.com?subject=Quote%20Request"
              className="inline-flex h-8 items-center rounded-full bg-primary px-3.5 text-xs font-medium text-white transition-all duration-300 hover:bg-blue-deep sm:px-4"
            >
              Request a quote
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
