import logoImg from '../assets/logo.png'

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
        <img
          src={logoImg}
          alt="NeuroDraw logo"
          className="h-full w-full object-contain drop-shadow-sm"
        />
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
