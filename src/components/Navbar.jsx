import { useRef } from 'react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)

  return (
    <header
      ref={navRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-3xl px-6 pt-3">
        <nav className="pointer-events-auto flex h-11 items-center justify-between gap-8 rounded-full border border-white/10 bg-slate-950/45 px-4 backdrop-blur-md">
          <a href="#home" className="flex shrink-0 items-center">
            <img
              src="/images/logotrpc.png"
              alt="Gee Cee"
              className="h-7 w-auto object-contain"
            />
          </a>

          <ul className="flex items-center gap-5">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-white/90 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
