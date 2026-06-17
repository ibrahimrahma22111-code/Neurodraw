import { Link } from 'react-router-dom'
import { MarketingNavbar } from '../components/MarketingNavbar'
import { Chatbot } from '../components/Chatbot'
import pdAnatomy from '../assets/parkinsons_anatomy.png'
import pdSymptoms from '../assets/parkinsons_symptoms.png'

export function AboutParkinsons() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-white text-slate-800 scroll-smooth">
            <MarketingNavbar />

            <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6 md:pt-14">
                {/* Hero */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 text-violet-700 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-6">
                        Medical Education
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl mb-6">
                        Understanding <span className="text-transparent bg-clip-text bg-gradient-to-r from-neuro-600 to-violet-500">Parkinson's Disease</span>
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed md:text-xl">
                        A progressive neurodegenerative disorder affecting millions worldwide. Early detection is reliable key to better management.
                    </p>
                </div>

                <div className="space-y-24">
                    {/* Section 1: Anatomy */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-violet-400/20 blur-[60px] rounded-full opacity-50"></div>
                            <div className="relative glass-panel p-2 rounded-3xl">
                                <img src={pdAnatomy} alt="Brain Anatomy" className="rounded-2xl w-full h-auto shadow-lg mix-blend-multiply" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">The Biology Behind It</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                Parkinson's disease primarily affects neurons in a specific area of the brain called the <strong className="text-neuro-700">substantia nigra</strong>.
                            </p>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                These neurons produce dopamine, a chemical messenger responsible for transmitting signals between the substantia nigra and the corpus striatum to produce smooth, purposeful movement. Loss of dopamine causes irregular nerve firing, leading to impaired movement.
                            </p>
                            <div className="flex gap-4">
                                <div className="glass-panel px-4 py-2 rounded-xl text-sm font-semibold text-neuro-700">Dopamine Deficiency</div>
                                <div className="glass-panel px-4 py-2 rounded-xl text-sm font-semibold text-neuro-700">Motor Control</div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Symptoms */}
                    <section className="grid md:grid-cols-2 gap-12 items-center md:grid-flow-row-dense">
                        <div className="md:col-start-2 relative group">
                            <div className="absolute inset-0 bg-tech-400/20 blur-[60px] rounded-full opacity-50"></div>
                            <div className="relative glass-panel p-2 rounded-3xl">
                                <img src={pdSymptoms} alt="Tremor Symptoms" className="rounded-2xl w-full h-auto shadow-lg mix-blend-multiply" />
                            </div>
                        </div>
                        <div className="md:col-start-1">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Core Symptoms</h2>
                            <ul className="space-y-6">
                                {[
                                    { title: "Tremor", desc: "Shaking, usually starting on one side of the body, often in the hand or fingers." },
                                    { title: "Bradykinesia", desc: "Slowness of movement, making simple tasks difficult and time-consuming." },
                                    { title: "Rigidity", desc: "Stiffness of the limbs and trunk, which can be painful." },
                                    { title: "Postural Instability", desc: "Impaired balance and coordination, often leading to falls." }
                                ].map((symptom, i) => (
                                    <li key={i} className="glass-panel p-4 rounded-xl hover:bg-white/80 transition-colors">
                                        <h3 className="font-bold text-slate-900 mb-1">{symptom.title}</h3>
                                        <p className="text-sm text-slate-600">{symptom.desc}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="glass-panel p-10 rounded-3xl text-center max-w-4xl mx-auto bg-gradient-to-r from-neuro-50 to-tech-50">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Early Screening Matters</h2>
                        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                            While there is no cure, current treatments are highly effective at managing symptoms, especially when started early. NeuroDraw helps track these subtle motor changes.
                        </p>
                        <Link to="/signup" className="inline-flex items-center rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800">
                            Get Screened Today
                        </Link>
                    </section>
                </div>

            </main>

            <Chatbot />
        </div>
    )
}
