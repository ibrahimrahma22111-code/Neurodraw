import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'

const navLinks = [
  { to: '/parkinsons', label: "Parkinson's" },
  { to: '/patients', label: 'Patients' },
  { to: '/clinicians', label: 'Clinicians' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export function MarketingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="page-container flex items-center justify-between py-3.5 md:py-4">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
          <Logo size="md" showText={true} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 md:inline-flex"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="hidden rounded-lg bg-neuro-800 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neuro-900 sm:inline-flex"
          >
            Get started
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <nav className="page-container space-y-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-700"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-lg bg-neuro-800 px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Get started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
