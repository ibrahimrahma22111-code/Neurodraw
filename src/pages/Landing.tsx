import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { MarketingLayout } from '../components/MarketingLayout'
import { IconArrowRight, IconBrain, IconPatient, IconStethoscope } from '../components/Icons'
import heroImage from '../assets/hero_neuro.png'

export function Landing() {
  return (
    <MarketingLayout>
      <div className="page-container pb-20 pt-10 md:pt-14">
        <section className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 mb-20 animate-slide-up">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-neuro-200 bg-neuro-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neuro-700">
              Clinical screening platform
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl lg:text-[3.25rem] leading-[1.12]">
              Parkinson&apos;s screening through{' '}
              <span className="text-gradient-brand">spiral drawing analysis</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-slate-600 leading-relaxed">
              NeuroDraw applies computer vision to hand-drawn spirals, measuring tremor, smoothness, and symmetry
              patterns that support early clinical review.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center rounded-lg bg-neuro-800 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-neuro-900 transition-colors"
              >
                Create account
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors"
              >
                How it works
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-200 pt-8">
              <div>
                <dt className="text-2xl font-semibold text-slate-900">98%</dt>
                <dd className="text-xs text-slate-500 mt-0.5">Pattern detection accuracy</dd>
              </div>
              <div>
                <dt className="text-2xl font-semibold text-slate-900">&lt;2 min</dt>
                <dd className="text-xs text-slate-500 mt-0.5">Average test duration</dd>
              </div>
              <div>
                <dt className="text-2xl font-semibold text-slate-900">HIPAA</dt>
                <dd className="text-xs text-slate-500 mt-0.5">Ready architecture</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
              <img
                src={heroImage}
                alt="Neural network visualization for spiral analysis"
                className="h-auto w-full object-cover"
              />
              <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Analysis</p>
                  <p className="text-sm font-medium text-slate-800">Processing tremor patterns</p>
                </div>
                <div className="h-9 w-9 rounded-full border-2 border-neuro-200 border-t-neuro-600 animate-spin" />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-slate-900">Built for every role</h2>
            <p className="mt-2 text-slate-500">Structured workflows for patients, clinicians, and care teams.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <PortalCard
              to="/parkinsons"
              title="About Parkinson's"
              desc="Evidence-based overview of symptoms, progression, and screening science."
              icon={<IconBrain className="h-5 w-5 text-neuro-700" />}
              iconBg="bg-neuro-50 text-neuro-700"
            />
            <PortalCard
              to="/patients"
              title="For patients"
              desc="Guided spiral tests, result history, and secure sharing with your care team."
              icon={<IconPatient className="h-5 w-5 text-tech-700" />}
              iconBg="bg-tech-50 text-tech-700"
            />
            <PortalCard
              to="/clinicians"
              title="For clinicians"
              desc="Patient queue, tremor metrics, and AI-assisted second opinions."
              icon={<IconStethoscope className="h-5 w-5 text-slate-700" />}
              iconBg="bg-slate-100 text-slate-700"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 px-8 py-14 text-center">
          <h2 className="text-2xl font-semibold text-white md:text-3xl tracking-tight">
            Start structured monitoring today
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400 leading-relaxed">
            Join patients and neurologists using data-driven spiral analysis for Parkinson&apos;s screening support.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/signup"
              className="w-full sm:w-auto rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Create free account
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto rounded-lg border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
            >
              Contact us
            </Link>
          </div>
        </section>
      </div>
    </MarketingLayout>
  )
}

function PortalCard({
  to,
  title,
  desc,
  icon,
  iconBg,
}: {
  to: string
  title: string
  desc: string
  icon: ReactNode
  iconBg: string
}) {
  return (
    <Link
      to={to}
      className="group block rounded-2xl border border-slate-200 bg-white p-6 hover-lift transition-all hover:border-slate-300"
    >
      <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}>{icon}</div>
      <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
        {title}
        <IconArrowRight className="h-4 w-4 text-slate-300 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
      </h3>
      <p className="mt-2 text-sm text-slate-500 leading-relaxed">{desc}</p>
    </Link>
  )
}
