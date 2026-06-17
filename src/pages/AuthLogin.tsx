import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { UserRole } from '../types'
import { Logo } from '../components/Logo'
import { getLoginErrorMessage } from '../utils/authErrors'

export function AuthLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('patient')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await login({ email, password, role })
      navigate(role === 'patient' ? '/patient' : '/doctor')
    } catch (err) {
      console.error(err)
      setError(getLoginErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent px-4 py-8">
      <div className="glass-panel grid w-full max-w-5xl gap-10 rounded-3xl p-6 md:grid-cols-[1.2fr,1fr] md:p-10">
        <div>
          <div className="mb-6">
            <Logo size="md" showText={true} />
          </div>

          <h1 className="mb-3 text-2xl font-bold text-slate-900 leading-relaxed tracking-tight">
            Sign in to <span className="text-gradient-brand">NeuroDraw</span>
          </h1>
          <p className="mb-7 text-sm text-slate-600 leading-relaxed">
            Choose your role to access a tailored experience. Patients can take spiral drawing tests and track results; clinicians can analyze drawings and provide Parkinson's assessments.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 text-sm">
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-50/50 p-1 backdrop-blur-sm">
              <RoleToggle
                label="Patient"
                value="patient"
                active={role === 'patient'}
                onSelect={setRole}
              />
              <RoleToggle
                label="Doctor"
                value="doctor"
                active={role === 'doctor'}
                onSelect={setRole}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email or username
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="glass-input w-full rounded-xl px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-neuro-500 focus:ring-2 focus:ring-neuro-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="glass-input w-full rounded-xl px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-neuro-500 focus:ring-2 focus:ring-neuro-100"
              />
            </div>

            {error ? <p className="text-sm text-rose-600">{error}</p> : null}

            <p className="rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-600">
              Demo accounts: <span className="font-medium">patient@demo.com</span> or{' '}
              <span className="font-medium">doctor@demo.com</span> — password{' '}
              <span className="font-medium">demo1234</span> (match the role toggle).
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-neuro-600 to-neuro-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-neuro-500/30 transition-all hover:scale-[1.02] hover:shadow-neuro-500/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Signing you in…' : 'Sign in'}
            </button>

            <p className="text-sm text-slate-600">
              No account yet?{' '}
              <Link to="/signup" className="font-semibold text-neuro-600 hover:text-neuro-700">
                Create one
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden flex-col justify-between rounded-2xl bg-slate-900 p-6 text-xs text-slate-100 md:flex relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neuro-900 via-slate-900 to-tech-900 opacity-90" />

          <div className="relative z-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-tech-300">
              Interactive Spiral Test
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              AI-powered Parkinson's diagnosis through spiral drawing analysis.
            </p>
            <p className="mt-3 text-[11px] text-slate-300">
              Draw spirals, get instant tremor analysis, and collaborate with your neurologist—all in one secure, HIPAA-compliant platform.
            </p>
          </div>
          <div className="relative z-10 mt-6 grid grid-cols-2 gap-3 text-[11px]">
            <div className="glass-panel bg-white/10 border-white/10 p-3 rounded-xl hover:bg-white/20 transition-colors">
              <p className="font-semibold text-tech-200">For patients</p>
              <p className="mt-1 text-slate-300">
                Take spiral drawing tests, view instant AI analysis, and communicate with your neurologist.
              </p>
            </div>
            <div className="glass-panel bg-white/10 border-white/10 p-3 rounded-xl hover:bg-white/20 transition-colors">
              <p className="font-semibold text-tech-200">For clinicians</p>
              <p className="mt-1 text-slate-300">
                Review spiral drawings, analyze tremor patterns, and provide Parkinson's assessments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface RoleToggleProps {
  label: string
  value: UserRole
  active: boolean
  onSelect: (role: UserRole) => void
}

function RoleToggle({ label, value, active, onSelect }: RoleToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`flex h-10 items-center justify-center rounded-xl text-sm font-semibold transition-all ${active
          ? 'bg-white text-neuro-700 shadow-sm ring-1 ring-black/5'
          : 'text-slate-600 hover:bg-white/60'
        }`}
    >
      {label}
    </button>
  )
}
