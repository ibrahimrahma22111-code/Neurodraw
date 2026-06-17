import { Link } from 'react-router-dom'
import { MarketingNavbar } from '../components/MarketingNavbar'
import { Logo } from '../components/Logo'
import { Chatbot } from '../components/Chatbot'

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800">
      <MarketingNavbar />

      <main className="mx-auto max-w-4xl px-4 pb-16 pt-8 md:px-6 md:pt-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-base text-slate-600 md:text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8 text-base leading-relaxed text-slate-700">
          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Introduction</h2>
            <p className="mb-4">
              NeuroDraw ("we," "our," or "us") is committed to protecting your privacy and personal health information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use 
              our platform.
            </p>
            <p>
              By using NeuroDraw, you agree to the collection and use of information in accordance with this policy. 
              We are HIPAA-compliant and follow all applicable healthcare privacy regulations.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-slate-900">Personal Information</h3>
                <ul className="ml-6 list-disc space-y-1 text-slate-600">
                  <li>Name, email address, and contact information</li>
                  <li>Account credentials and authentication data</li>
                  <li>Role (patient or healthcare provider)</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-slate-900">Health Information</h3>
                <ul className="ml-6 list-disc space-y-1 text-slate-600">
                  <li>Spiral drawing test results and analysis data</li>
                  <li>Medical history and symptoms (if provided)</li>
                  <li>Communication with healthcare providers</li>
                  <li>Test history and progress tracking data</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-slate-900">Technical Information</h3>
                <ul className="ml-6 list-disc space-y-1 text-slate-600">
                  <li>Device information and browser type</li>
                  <li>IP address and location data</li>
                  <li>Usage patterns and platform interactions</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">How We Use Your Information</h2>
            <ul className="ml-6 list-disc space-y-2 text-slate-600">
              <li>To provide and improve our Parkinson's screening services</li>
              <li>To analyze spiral drawings and generate diagnostic insights</li>
              <li>To facilitate communication between patients and healthcare providers</li>
              <li>To maintain your account and provide customer support</li>
              <li>To comply with legal obligations and healthcare regulations</li>
              <li>To improve our AI algorithms (using anonymized data)</li>
              <li>To send important updates about your account and services</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Information Sharing and Disclosure</h2>
            <p className="mb-4">
              We do not sell your personal or health information. We may share your information only in the following circumstances:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-slate-600">
              <li>
                <strong>With Healthcare Providers:</strong> Your spiral test results and health information are shared 
                with authorized healthcare providers you've connected with on the platform.
              </li>
              <li>
                <strong>Service Providers:</strong> We may share information with trusted third-party service providers 
                who assist in operating our platform (e.g., cloud hosting, data analytics), all bound by strict confidentiality agreements.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or 
                government regulation.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may share information with your explicit consent for specific purposes.
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Data Security</h2>
            <p className="mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-slate-600">
              <li>End-to-end encryption for all data transmission</li>
              <li>Secure data storage with encryption at rest</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication requirements</li>
              <li>HIPAA-compliant infrastructure and procedures</li>
            </ul>
            <p className="mt-4">
              However, no method of transmission over the internet or electronic storage is 100% secure. 
              While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Your Rights</h2>
            <p className="mb-4">You have the following rights regarding your information:</p>
            <ul className="ml-6 list-disc space-y-2 text-slate-600">
              <li><strong>Access:</strong> Request a copy of your personal and health information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
              <li><strong>Portability:</strong> Request your data in a portable format</li>
              <li><strong>Restriction:</strong> Request restrictions on how we use your information</li>
              <li><strong>Opt-out:</strong> Opt out of non-essential communications</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at privacy@neurodraw.com or through your account settings.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Cookies and Tracking</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to improve your experience, analyze platform usage, 
              and provide personalized content. You can control cookie preferences through your browser settings.
            </p>
            <p>
              We do not use cookies for advertising purposes or share tracking data with third-party advertisers.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Children's Privacy</h2>
            <p>
              NeuroDraw is not intended for individuals under the age of 18. We do not knowingly collect personal 
              information from children. If you believe we have collected information from a child, please contact 
              us immediately.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by 
              posting the new policy on this page and updating the "Last updated" date. Your continued use of 
              NeuroDraw after changes become effective constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/60 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Contact Us</h2>
            <p className="mb-2">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="ml-6 list-disc space-y-1 text-slate-600">
              <li>Email: privacy@neurodraw.com</li>
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

