import { Link } from 'react-router-dom'
import { Logo } from './Logo'

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white">
      <div className="page-container py-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo size="sm" showText={true} />
            <p className="mt-3 max-w-sm text-sm text-slate-500 leading-relaxed">
              Clinical-grade spiral drawing analysis for early Parkinson&apos;s screening. Built for patients and
              neurology teams.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Platform</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/patients" className="hover:text-neuro-700 transition-colors">
                  For patients
                </Link>
              </li>
              <li>
                <Link to="/clinicians" className="hover:text-neuro-700 transition-colors">
                  For clinicians
                </Link>
              </li>
              <li>
                <Link to="/parkinsons" className="hover:text-neuro-700 transition-colors">
                  About Parkinson&apos;s
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-neuro-700 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/about" className="hover:text-neuro-700 transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-neuro-700 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-neuro-700 transition-colors">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-neuro-700 transition-colors">
                  Terms of service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} NeuroDraw. All rights reserved.</span>
          <span>For research and screening support — not a substitute for clinical diagnosis.</span>
        </div>
      </div>
    </footer>
  )
}
