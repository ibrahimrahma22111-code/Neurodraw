import { MarketingNavbar } from '../components/MarketingNavbar'
import { Chatbot } from '../components/Chatbot'

export function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-white text-slate-800 scroll-smooth">
      <MarketingNavbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6 md:pt-14">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-neuro-200 bg-white/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-neuro-600 backdrop-blur-sm shadow-sm mb-6">
            Graduation Project
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl leading-tight mb-6">
            Innovating for <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neuro-600 to-tech-500">Early Detection</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-light">
            We are a team of computer science students, and NeuroDraw is our graduation project.
          </p>
        </section>

        {/* Project Details */}
        <section className="mt-24 max-w-4xl mx-auto">
          <div className="glass-panel p-10 rounded-3xl space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Our platform is designed to assist in the early detection of Parkinson’s disease by analyzing drawings uploaded by patients. Using AI-assisted image analysis, NeuroDraw provides preliminary insights that help patients and doctors better understand neurological patterns.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-neuro-700 mb-3">Student-Led Innovation</h3>
                <p className="text-slate-600 leading-relaxed">
                  As students, our goal is to combine technology with healthcare in a practical and meaningful way, while showcasing our skills in web development, AI, and user-centered design.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-tech-700 mb-3">Community Impact</h3>
                <p className="text-slate-600 leading-relaxed">
                  Through NeuroDraw, we aim to create a friendly, reliable, and educational tool that supports both patients and medical professionals.
                </p>
              </div>
            </div>
          </div>
        </section>



      </main>

      <footer className="border-t border-slate-200 bg-white/40 mt-20 backdrop-blur-sm p-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} NeuroDraw Project.
      </footer>
      <Chatbot />
    </div>
  )
}
