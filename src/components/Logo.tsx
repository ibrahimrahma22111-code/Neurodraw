interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-12 w-12',
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`relative ${sizeClasses[size]} flex-shrink-0`}>
        <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50 15 C35 15, 25 25, 25 40 C25 45, 30 50, 35 50 C30 55, 25 60, 25 70 C25 80, 35 85, 50 85 C65 85, 75 80, 75 70 C75 60, 70 55, 65 50 C70 50, 75 45, 75 40 C75 25, 65 15, 50 15 Z"
            fill="url(#logoGradient)"
            stroke="#5b21b6"
            strokeWidth="1.5"
          />
          <circle cx="40" cy="35" r="2.5" fill="#7c3aed" />
          <circle cx="60" cy="35" r="2.5" fill="#7c3aed" />
          <circle cx="50" cy="50" r="2.5" fill="#7c3aed" />
          <line x1="40" y1="35" x2="50" y2="50" stroke="#a78bfa" strokeWidth="1" />
          <line x1="60" y1="35" x2="50" y2="50" stroke="#a78bfa" strokeWidth="1" />
          <path
            d="M50 50 Q58 42, 66 50 Q58 58, 50 50 Q42 58, 34 50 Q42 42, 50 50"
            stroke="#0d9488"
            strokeWidth="2"
            fill="none"
          />
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ede9fe" />
              <stop offset="100%" stopColor="#f0fdfa" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {showText && (
        <div>
          <p className={`font-semibold text-slate-900 ${textSizeClasses[size]}`}>NeuroDraw</p>
          <p className={`text-slate-500 ${size === 'sm' ? 'text-[10px]' : 'text-[11px]'}`}>
            Parkinson&apos;s screening platform
          </p>
        </div>
      )}
    </div>
  )
}
