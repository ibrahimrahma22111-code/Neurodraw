import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export function SectionTitle({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-base font-semibold text-slate-900 tracking-tight">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm text-slate-500 leading-relaxed max-w-prose">{description}</p>
      ) : null}
    </div>
  )
}

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6 border-b border-slate-100 pb-5">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
      {description ? <p className="mt-2 max-w-2xl text-sm text-slate-500">{description}</p> : null}
    </div>
  )
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
}) {
  const variants = {
    primary: 'bg-neuro-800 text-white hover:bg-neuro-900 shadow-sm',
    secondary: 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
  }
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neuro-500/40 focus-visible:ring-offset-2 disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-neuro-400 focus:ring-2 focus:ring-neuro-100 ${className}`}
      {...props}
    />
  )
}

export function Pill({
  children,
  tone = 'default',
}: {
  children: ReactNode
  tone?: 'default' | 'success' | 'warning'
}) {
  const toneClasses =
    tone === 'success'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : tone === 'warning'
        ? 'bg-amber-50 text-amber-800 border-amber-200'
        : 'bg-slate-50 text-slate-700 border-slate-200'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-medium ${toneClasses}`}>
      {children}
    </span>
  )
}

export function Badge({
  children,
  tone = 'neuro',
  className = '',
}: {
  children: ReactNode
  tone?: 'sky' | 'rose' | 'violet' | 'danger' | 'warning' | 'success' | 'slate' | 'neuro' | 'tech'
  className?: string
}) {
  const toneStyles: Record<string, string> = {
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    violet: 'bg-violet-50 text-violet-700 border-violet-200',
    neuro: 'bg-neuro-50 text-neuro-700 border-neuro-200',
    tech: 'bg-tech-50 text-tech-700 border-tech-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    slate: 'bg-slate-50 text-slate-600 border-slate-200',
    sky: 'bg-slate-50 text-slate-600 border-slate-200',
  }

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${toneStyles[tone] || toneStyles.neuro} ${className}`}
    >
      {children}
    </span>
  )
}
