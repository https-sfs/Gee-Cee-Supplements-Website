import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '../lib/utils'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Industries', to: '/industries' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/#contact' },
]

const QUOTE_HREF = 'mailto:info@geeceechem.com?subject=Quote%20Request'

function linkClassName(isActive) {
  return cn(
    'text-sm font-medium transition-colors duration-200',
    isActive ? 'text-white underline underline-offset-4' : 'text-white/85 hover:text-white',
  )
}

function NavItem({ link, onNavigate, className }) {
  const isHash = link.to.startsWith('/#')

  if (isHash) {
    return (
      <a href={link.to} onClick={onNavigate} className={cn(linkClassName(false), className)}>
        {link.label}
      </a>
    )
  }

  return (
    <NavLink
      to={link.to}
      end={link.to === '/'}
      onClick={onNavigate}
      className={({ isActive }) => cn(linkClassName(isActive), className)}
    >
      {link.label}
    </NavLink>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const panelId = useId()
  const headerRef = useRef(null)
  const panelRef = useRef(null)

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  // Close when resizing to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e) => {
      if (e.matches) setOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Lock body scroll while menu is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Close when tapping outside
  useEffect(() => {
    if (!open) return

    const onPointerDown = (event) => {
      const header = headerRef.current
      if (!header) return
      if (!header.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-5xl px-4 pt-3 sm:px-6">
        <nav className="pointer-events-auto relative flex h-12 items-center justify-between gap-4 rounded-full border border-white/10 bg-slate-950/45 px-3 backdrop-blur-md sm:h-11 sm:gap-6 sm:px-4">
          <Link to="/" className="flex shrink-0 items-center" onClick={closeMenu}>
            <img
              src="/images/logotrpc.png"
              alt="Gee Cee"
              className="h-7 w-auto object-contain"
            />
          </Link>

          {/* Desktop / tablet links */}
          <ul className="hidden items-center gap-5 md:flex">
            {links.map((link) => (
              <li key={link.label}>
                <NavItem link={link} />
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href={QUOTE_HREF}
            className="hidden h-8 items-center rounded-full bg-primary px-3.5 text-xs font-medium text-white transition-all duration-300 hover:bg-blue-deep sm:px-4 md:inline-flex"
          >
            Request a quote
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-5" strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Menu className="size-5" strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        </nav>

        {/* Mobile dropdown panel */}
        <div
          id={panelId}
          ref={panelRef}
          className={cn(
            'pointer-events-auto md:hidden',
            'origin-top overflow-hidden transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
            open
              ? 'mt-2 max-h-[28rem] translate-y-0 opacity-100'
              : 'mt-0 max-h-0 -translate-y-1 opacity-0 pointer-events-none',
          )}
          aria-hidden={!open}
        >
          <div className="rounded-[1.35rem] border border-white/10 bg-slate-950/90 px-4 py-4 shadow-[0_20px_50px_rgba(8,15,30,0.35)] backdrop-blur-xl">
            <ul className="flex flex-col gap-1">
              {links.map((link, i) => (
                <li
                  key={link.label}
                  className={cn(
                    'transition-all duration-300 ease-out',
                    open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                  )}
                  style={{ transitionDelay: open ? `${60 + i * 35}ms` : '0ms' }}
                >
                  <NavItem
                    link={link}
                    onNavigate={closeMenu}
                    className="block rounded-xl px-3 py-3 text-[0.95rem]"
                  />
                </li>
              ))}
            </ul>

            <div className="mt-3 border-t border-white/10 pt-4">
              <a
                href={QUOTE_HREF}
                onClick={closeMenu}
                className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-deep"
              >
                Request a quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
