import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export function IconBrain({ className, ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.5 4.5a3.5 3.5 0 0 0-3.5 3.5v1a3 3 0 0 0 0 6v1a3.5 3.5 0 0 0 3.5 3.5M14.5 4.5a3.5 3.5 0 0 1 3.5 3.5v1a3 3 0 0 1 0 6v1a3.5 3.5 0 0 1-3.5 3.5M12 4v16"
      />
    </svg>
  )
}

export function IconPatient({ className, ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

export function IconStethoscope({ className, ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 3.5v6a5.5 5.5 0 0 0 11 0v-6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.5v2.5a3 3 0 0 0 6 0v-2.5" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  )
}

export function IconArrowRight({ className, ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
