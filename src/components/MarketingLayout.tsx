import type { ReactNode } from 'react'
import { MarketingNavbar } from './MarketingNavbar'
import { SiteFooter } from './SiteFooter'
import { Chatbot } from './Chatbot'

interface MarketingLayoutProps {
  children: ReactNode
  showChatbot?: boolean
}

export function MarketingLayout({ children, showChatbot = true }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col text-slate-800">
      <MarketingNavbar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      {showChatbot ? <Chatbot /> : null}
    </div>
  )
}
