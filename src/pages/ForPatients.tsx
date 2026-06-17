import { Link } from 'react-router-dom'
import { MarketingNavbar } from '../components/MarketingNavbar'
import { Chatbot } from '../components/Chatbot'
import featurePatient from '../assets/feature_patient.png'

export function ForPatients() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-white text-slate-800 scroll-smooth">
            <MarketingNavbar />

            <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6 md:pt-14">
                {/* Hero */}
                <section className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-tech-50 text-tech-700 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-6">
                            Patient-Centered Care
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl mb-6">
                            Take Control of Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-600 to-emerald-500">Neurological Health</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            NeuroDraw allows you to perform clinical-grade motor tests from the comfort of your home. Track your symptoms, share data with your doctor, and stay proactive.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/signup" className="rounded-full bg-tech-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-tech-500/30 transition-all hover:bg-tech-700">
                                Start Digital Test
                            </Link>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-tech-400/20 blur-[60px] rounded-full opacity-50"></div>
                        <div className="relative glass-panel p-2 rounded-3xl transform transition-transform duration-500 hover:scale-[1.01]">
                            <img src={featurePatient} alt="Patient Interface" className="rounded-2xl shadow-lg w-full h-auto object-cover" />
                        </div>
                    </div>
                </section>

                {/* Workflow Steps */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { number: "01", title: "Draw", desc: "Use your finger or stylus to trace the spiral guides on your tablet or screen." },
                            { number: "02", title: "Analyze", desc: "Our AI measures smoothness, speed, and tremors in real-time." },
                            { number: "03", title: "Connect", desc: "Securely send your report to your neurologist for review." }
                        ].map((step, i) => (
                            <div key={i} className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:bg-white/80 transition-all">
                                <div className="text-6xl font-black text-slate-100 absolute -top-4 -right-4 transition-transform group-hover:scale-110 group-hover:text-tech-50">
                                    {step.number}
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                    <p className="text-slate-600">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Privacy Note */}
                <section className="glass-panel p-10 rounded-3xl bg-slate-900 text-slate-300 relative overflow-hidden">
                    <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Your Privacy comes First</h2>
                            <p>We are HIPAA compliant. Your spiral drawings and health data are encrypted end-to-end.</p>
                        </div>
                        <Link to="/privacy" className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-800/50 px-6 py-3 text-sm font-bold text-white backdrop-blur hover:bg-slate-800">
                            Read Privacy Policy
                        </Link>
                    </div>
                </section>

            </main>
            <Chatbot />
        </div>
    )
}
