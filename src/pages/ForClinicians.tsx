import { Link } from 'react-router-dom'
import { MarketingNavbar } from '../components/MarketingNavbar'
import { Chatbot } from '../components/Chatbot'
import featureDoctor from '../assets/feature_doctor.png'

export function ForClinicians() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-white text-slate-800 scroll-smooth">
            <MarketingNavbar />

            <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6 md:pt-14">
                {/* Hero */}
                <section className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="order-2 lg:order-1 relative group">
                        <div className="absolute inset-0 bg-neuro-400/20 blur-[60px] rounded-full opacity-50"></div>
                        <div className="relative glass-panel p-2 rounded-3xl transform transition-transform duration-500 hover:scale-[1.01]">
                            <img src={featureDoctor} alt="Clinician Dashboard Interface" className="rounded-2xl shadow-lg w-full h-auto object-cover" />
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 rounded-full bg-neuro-50 text-neuro-700 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-6">
                            Clinical Workspace
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl mb-6">
                            Augment Your Diagnosis with <span className="text-transparent bg-clip-text bg-gradient-to-r from-neuro-600 to-violet-500">Computational Precision</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            Quantify motor symptoms with objective metrics. NeuroDraw provides granular data on tremor amplitude, frequency, and drawing kinematics to support your clinical assessment.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/signup" className="rounded-full bg-neuro-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-neuro-500/30 transition-all hover:bg-neuro-700">
                                Request Access
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">The Digital Neurology Suite</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Objective Metrics", desc: "Move beyond subjective 0-4 scales. Get precise numerical scores for smoothness and tremor intensity.", icon: "📊" },
                            { title: "Longitudinal Tracking", desc: "Automatically graph patient performance over months to visualize medication efficacy.", icon: "📈" },
                            { title: "Remote Monitoring", desc: "Receive patient test results from home, reducing the need for frequent in-person follow-ups.", icon: "🏠" }
                        ].map((feature, i) => (
                            <div key={i} className="glass-panel p-8 rounded-2xl hover:bg-white/80 transition-all hover:-translate-y-2">
                                <div className="h-12 w-12 rounded-xl bg-neuro-50 text-2xl flex items-center justify-center mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Integration */}
                <section className="rounded-3xl border border-slate-200 bg-white/50 p-12 text-center backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Seamless EHR Integration</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto mb-8">
                        Our detailed reports can be exported as PDF or integrated directly into standard electronic health record systems via our API.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale font-bold text-xl">
                        <span>EPIC</span>
                        <span>CERNER</span>
                        <span>ALLSCRIPTS</span>
                        <span>ATHENAHEALTH</span>
                    </div>
                </section>

            </main>
            <Chatbot />
        </div>
    )
}
