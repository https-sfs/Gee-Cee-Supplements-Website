const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 py-12 sm:flex-row">
        <a href="#home" className="flex items-center gap-3">
          <img
            src="/images/logotrpc.png"
            alt="Gee Cee"
            className="h-8 w-auto object-contain brightness-0 invert"
          />
        </a>

        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} Gee Cee. All rights reserved.
        </p>

        <ul className="flex items-center gap-6">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                className="text-sm text-slate-400 transition-colors duration-200 hover:text-white"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
