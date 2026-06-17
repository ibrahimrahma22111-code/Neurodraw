import { MarketingNavbar } from '../components/MarketingNavbar'
import { Chatbot } from '../components/Chatbot'

export function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-white text-slate-800 scroll-smooth">
      <MarketingNavbar />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6 md:pt-14">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column: Info */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-tech-50 text-tech-700 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-6">
              Get in Touch
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-6">Let's start a conversation.</h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              Have questions about our technology or enterprise pricing? Our team is ready to help you deploy NeuroDraw in your clinic.
            </p>

            <div className="space-y-8">
              <ContactInfo title="Email Us" value="support@neurodraw.ai" icon="✉️" />
              <ContactInfo title="Call Us" value="+1 (555) 123-4567" icon="📞" />
              <ContactInfo title="Visit Us" value="123 Innovation Dr, Tech City, TC 90210" icon="📍" />
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="glass-panel p-8 rounded-3xl shadow-glass">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">First name</label>
                  <input type="text" className="glass-input w-full rounded-xl px-4 py-3 text-sm focus:border-neuro-500 focus:ring-2 focus:ring-neuro-100" placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Last name</label>
                  <input type="text" className="glass-input w-full rounded-xl px-4 py-3 text-sm focus:border-neuro-500 focus:ring-2 focus:ring-neuro-100" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email</label>
                <input type="email" className="glass-input w-full rounded-xl px-4 py-3 text-sm focus:border-neuro-500 focus:ring-2 focus:ring-neuro-100" placeholder="jane@clinic.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Message</label>
                <textarea rows={4} className="glass-input w-full rounded-xl px-4 py-3 text-sm focus:border-neuro-500 focus:ring-2 focus:ring-neuro-100" placeholder="How can we help you?"></textarea>
              </div>

              <button className="w-full rounded-xl bg-gradient-to-r from-neuro-600 to-neuro-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-neuro-500/30 transition-all hover:scale-[1.02]">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Chatbot />
    </div>
  )
}

function ContactInfo({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl border border-slate-200">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600">{value}</p>
      </div>
    </div>
  )
}
