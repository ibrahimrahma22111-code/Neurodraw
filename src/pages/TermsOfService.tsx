import { Link } from 'react-router-dom'
import { MarketingNavbar } from '../components/MarketingNavbar'
import { Logo } from '../components/Logo'
import { Chatbot } from '../components/Chatbot'

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800">
      <MarketingNavbar />

      <main className="mx-auto max-w-4xl px-4 pb-16 pt-8 md:px-6 md:pt-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-base text-slate-600 md:text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8 text-base leading-relaxed text-slate-700">
          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using NeuroDraw ("the Service"), you agree to be bound by these Terms of Service 
              ("Terms"). If you disagree with any part of these terms, you may not access the Service.
            </p>
            <p>
              These Terms apply to all users of the Service, including patients, healthcare providers, and visitors 
              to our website.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Medical Disclaimer</h2>
            <div className="rounded-xl border-2 border-amber-300 bg-amber-50/80 p-4 mb-4">
              <p className="font-semibold text-amber-900 mb-2">IMPORTANT MEDICAL DISCLAIMER</p>
              <p className="text-amber-800">
                NeuroDraw is a <strong>screening tool</strong> designed to assist in the early detection of potential 
                signs of Parkinson's disease. It is NOT a diagnostic tool and does NOT replace professional medical 
                evaluation, diagnosis, or treatment.
              </p>
            </div>
            <ul className="ml-6 list-disc space-y-2 text-slate-600">
              <li>NeuroDraw results are for informational purposes only and should not be used as a substitute for professional medical advice</li>
              <li>Always consult with a qualified neurologist or healthcare provider for proper diagnosis and treatment</li>
              <li>Do not disregard professional medical advice or delay seeking it because of information obtained from NeuroDraw</li>
              <li>In case of a medical emergency, contact your local emergency services immediately</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Use of the Service</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-slate-900">Eligibility</h3>
                <p className="text-slate-600">
                  You must be at least 18 years old to use NeuroDraw. By using the Service, you represent and warrant 
                  that you are of legal age and have the capacity to enter into these Terms.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-slate-900">Account Registration</h3>
                <p className="text-slate-600">
                  To access certain features, you must create an account. You agree to provide accurate, current, and 
                  complete information during registration and to update such information to keep it accurate and current.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-slate-900">Account Security</h3>
                <p className="text-slate-600">
                  You are responsible for maintaining the confidentiality of your account credentials and for all 
                  activities that occur under your account. You agree to notify us immediately of any unauthorized 
                  use of your account.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Acceptable Use</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="ml-6 list-disc space-y-2 text-slate-600">
              <li>Use the Service for any illegal purpose or in violation of any laws</li>
              <li>Attempt to gain unauthorized access to the Service or its related systems</li>
              <li>Interfere with or disrupt the Service or servers connected to the Service</li>
              <li>Use automated systems (bots, scrapers) to access the Service without permission</li>
              <li>Impersonate any person or entity or falsely state your affiliation with any person or entity</li>
              <li>Upload or transmit any viruses, malware, or other harmful code</li>
              <li>Use the Service to provide medical advice or diagnosis to others if you are not a licensed healthcare provider</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Intellectual Property</h2>
            <p className="mb-4">
              The Service and its original content, features, and functionality are owned by NeuroDraw and are protected 
              by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p>
              You may not copy, modify, distribute, sell, or lease any part of the Service without our prior written consent. 
              You may not reverse engineer or attempt to extract the source code of the Service.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">User Content</h2>
            <p className="mb-4">
              You retain ownership of any content you submit to the Service, including spiral drawings and test results. 
              By submitting content, you grant us a license to use, store, and process that content to provide and improve 
              the Service.
            </p>
            <p>
              You are solely responsible for the content you submit and represent that you have all necessary rights to 
              submit such content.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Limitation of Liability</h2>
            <p className="mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEURODRAW SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY 
              OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
            <p>
              Our total liability for any claims arising from or related to the Service shall not exceed the amount you 
              paid us in the 12 months preceding the claim, or $100, whichever is greater.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless NeuroDraw, its officers, directors, employees, and agents from 
              any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of or related to 
              your use of the Service, violation of these Terms, or infringement of any rights of another.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your account and access to the Service immediately, without prior notice, 
              for any reason, including if you breach these Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will cease immediately. You may terminate your account 
              at any time by contacting us or through your account settings.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of material changes by 
              posting the updated Terms on this page and updating the "Last updated" date. Your continued use of 
              the Service after changes become effective constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which 
              NeuroDraw operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Contact Information</h2>
            <p className="mb-2">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="ml-6 list-disc space-y-1 text-slate-600">
              <li>Email: legal@neurodraw.com</li>
              <li>Support: support@neurodraw.com</li>
            </ul>
          </section>

          <div className="flex justify-center pt-4">
            <Link
              to="/"
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Logo size="sm" showText={true} />
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} NeuroDraw. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <Chatbot />
    </div>
  )
}

