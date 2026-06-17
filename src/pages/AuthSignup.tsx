import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePatients } from '../context/PatientContext'
import type { UserRole } from '../types'
import { Logo } from '../components/Logo'

export function AuthSignup() {
  const { signup } = useAuth()
  const { addPatient } = usePatients()
  const navigate = useNavigate()
  const [name, setName] = useState('')
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
      await signup({ name, email, password, role })
      
      // If patient signs up, add them to patient list
      if (role === 'patient') {
        addPatient({
          name,
          email,
          age: undefined, // Can be added later
        })
      }
      
      navigate(role === 'patient' ? '/patient' : '/doctor')
    } catch (err) {
      console.error(err)
      setError('Unable to create account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-stone-50 to-slate-100 px-4 py-8">
      <div className="grid w-full max-w-5xl gap-10 rounded-3xl bg-white/70 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-md md:grid-cols-[1.2fr,1fr] md:p-10">
        <div>
          <div className="mb-6">
            <Logo size="md" showText={true} />
          </div>

          <h1 className="mb-3 text-2xl font-semibold text-slate-900 leading-relaxed">Create an account</h1>
          <p className="mb-7 text-sm text-slate-600 leading-relaxed">
            Join NeuroDraw to detect Parkinson's disease through spiral drawing tests. Choose whether you're a patient taking spiral drawing tests for Parkinson's screening, or a clinician analyzing tremor patterns and Parkinson's indicators.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 text-sm">
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-1">
              <RoleToggle
                label="I am a patient"
                value="patient"
                active={role === 'patient'}
                onSelect={setRole}
              />
              <RoleToggle
                label="I am a doctor"
                value="doctor"
                active={role === 'doctor'}
                onSelect={setRole}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Dr. Jane Smith"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@hospital.org"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
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
                  placeholder="At least 8 characters"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {error ? <p className="text-sm text-rose-600">{error}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-interactive flex w-full items-center justify-center rounded-xl bg-sky-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating your workspace…
                </span>
              ) : (
                'Create account'
              )}
            </button>

            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-sky-700 hover:text-sky-800">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden flex-col justify-between rounded-2xl bg-slate-900 p-6 text-xs text-slate-100 md:flex">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-300">
              Role-aware experience
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              Patients see clear summaries; clinicians see full clinical context.
            </p>
            <p className="mt-3 text-[11px] text-slate-300">
              NeuroDraw adapts navigation, language, and access levels automatically based on your
              role.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 text-[11px]">
            <div className="rounded-xl bg-slate-800/70 p-3">
              <p className="font-semibold text-sky-100">Secure by design</p>
              <p className="mt-1 text-slate-300">
                Built for PHI with encryption, audit trails, and strict access controls.
              </p>
            </div>
            <div className="rounded-xl bg-slate-800/70 p-3">
              <p className="font-semibold text-sky-100">AI transparency</p>
              <p className="mt-1 text-slate-300">
                Every spiral drawing analysis is traceable with detailed tremor, smoothness, and symmetry metrics.
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
      className={`flex h-10 items-center justify-center rounded-xl text-sm font-semibold transition-all transform ${
        active 
          ? 'bg-white text-sky-700 shadow-sm scale-105' 
          : 'text-slate-600 hover:bg-slate-100/80 hover:scale-102'
      }`}
    >
      {label}
    </button>
  )
}


