import { useState } from 'react'
import { MarketingNavbar } from '../components/MarketingNavbar'
import { Chatbot } from '../components/Chatbot'

export function FAQ() {
  const faqs = [
    {
      category: "General",
      questions: [
        { q: "What is NeuroDraw?", a: "NeuroDraw is an AI-powered platform that analyzes spiral drawings to detect early signs of Parkinson's disease, such as tremors and asymmetry." },
        { q: "Is this a medical diagnosis?", a: "No. NeuroDraw is a screening tool. While highly accurate, definitive diagnosis must be made by a qualified neurologist." }
      ]
    },
    {
      category: "Technical",
      questions: [
        { q: "Do I need special hardware?", a: "No. You can use any tablet, smartphone, or computer with a mouse/trackpad. For best results, a tablet with a stylus is recommended." },
        { q: "Is my data secure?", a: "Yes. We use end-to-end encryption and are fully HIPAA compliant. Your medical data is never shared without your explicit consent." }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-white text-slate-800 scroll-smooth">
      <MarketingNavbar />

      <main className="mx-auto max-w-4xl px-4 pb-16 pt-10 md:px-6 md:pt-14">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600">
            Everything you need to know about the product and billing.
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-bold text-neuro-700 mb-4 px-2">{section.category}</h3>
              <div className="space-y-4">
                {section.questions.map((item, i) => (
                  <FAQItem key={i} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Chatbot />
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="glass-panel overflow-hidden rounded-2xl transition-all hover:bg-white/80">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left font-semibold text-slate-800 focus:outline-none"
      >
        <span>{question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-neuro-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="p-6 pt-0 text-slate-600 text-sm leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  )
}
