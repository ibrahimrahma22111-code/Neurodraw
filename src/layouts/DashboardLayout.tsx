import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { UserRole } from '../types'
import { Logo } from '../components/Logo'

interface DashboardLayoutProps {
  role: UserRole
  children: ReactNode
}

export function DashboardLayout({ role, children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isPatient = role === 'patient'

  useEffect(() => {
    const handleCloseMenu = () => setIsMobileMenuOpen(false)
    document.addEventListener('closeMobileMenu', handleCloseMenu)
    return () => document.removeEventListener('closeMobileMenu', handleCloseMenu)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 rounded-lg border border-slate-200 bg-white p-2 shadow-sm hover:bg-slate-50"
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-slate-900/40 z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col z-40 transform transition-transform duration-200 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="border-b border-slate-100 px-5 py-4">
          <Logo size="md" showText={true} />
          <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-400">{role} portal</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 text-sm">
          {isPatient ? (
            <>
              <SidebarLink to="/patient" label="Dashboard" />
              <SidebarLink to="/patient/chat-doctor" label="Chat with Doctor" />
              <SidebarLink to="/patient/chat-ai" label="Chat with AI" />
            </>
          ) : (
            <>
              <SidebarLink to="/doctor" label="Dashboard" />
              <SidebarLink to="/doctor/patients" label="Patients" />
              <SidebarLink to="/doctor/chat-ai" label="AI Assistant" />
              <SidebarLink to="/doctor/chat-doctors" label="Doctor Network" />
            </>
          )}
        </nav>

        <div className="border-t border-slate-100 px-4 py-3 flex items-center justify-between gap-2 text-xs">
          <div className="min-w-0">
            <p className="font-medium text-slate-800 truncate">{user?.name ?? 'Guest'}</p>
            <p className="text-slate-500 capitalize">{user?.role ?? 'not signed in'}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="shrink-0 rounded-lg border border-slate-200 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-slate-200 bg-white px-4 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neuro-700">
              {isPatient ? 'Patient workspace' : 'Clinician workspace'}
            </p>
            <p className="mt-1 text-sm text-slate-500 hidden sm:block max-w-xl">
              {isPatient
                ? "Take spiral drawing tests and track your Parkinson's screening results."
                : "Review patient cases, analyze spiral drawings, and provide clinical assessments."}
            </p>
          </div>
          <Link
            to={isPatient ? '/patient/chat-ai' : '/doctor/chat-ai'}
            className="inline-flex items-center gap-2 rounded-lg bg-neuro-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neuro-900"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            AI Assistant
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

function SidebarLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end
      onClick={() => {
        if (window.innerWidth < 1024) {
          document.dispatchEvent(new CustomEvent('closeMobileMenu'))
        }
      }}
      className={({ isActive }) =>
        [
          'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
          isActive
            ? 'bg-neuro-50 text-neuro-800 border border-neuro-100'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
        ].join(' ')
      }
    >
      {label}
    </NavLink>
  )
}
