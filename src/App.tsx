import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Landing } from './pages/Landing'
import { AuthLogin } from './pages/AuthLogin'
import { AuthSignup } from './pages/AuthSignup'
import { PatientDashboard } from './pages/PatientDashboard'
import { DoctorDashboard } from './pages/DoctorDashboard'
import { ChatWithDoctor } from './pages/ChatWithDoctor'
import { ChatWithAI } from './pages/ChatWithAI'
import { DoctorPatients } from './pages/DoctorPatients'
import { DoctorAIAssistant } from './pages/DoctorAIAssistant'
import { DoctorNetwork } from './pages/DoctorNetwork'
import { DashboardLayout } from './layouts/DashboardLayout'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsOfService } from './pages/TermsOfService'
import { FAQ } from './pages/FAQ'
import { AboutParkinsons } from './pages/AboutParkinsons'
import { ForPatients } from './pages/ForPatients'
import { ForClinicians } from './pages/ForClinicians'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
            <Route path="/login" element={<AuthLogin />} />
            <Route path="/signup" element={<AuthSignup />} />
            <Route path="/about" element={<About />} />
            <Route path="/parkinsons" element={<AboutParkinsons />} />
            <Route path="/patients" element={<ForPatients />} />
            <Route path="/clinicians" element={<ForClinicians />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/faq" element={<FAQ />} />

            <Route
              path="/patient/*"
              element={
                <RequireRole role="patient">
                  <DashboardLayout role="patient">
                    <Routes>
                      <Route index element={<PatientDashboard />} />
                      <Route path="chat-doctor" element={<ChatWithDoctor />} />
                      <Route path="chat-ai" element={<ChatWithAI />} />
                    </Routes>
                  </DashboardLayout>
                </RequireRole>
              }
            />

            <Route
              path="/doctor/*"
              element={
                <RequireRole role="doctor">
                  <DashboardLayout role="doctor">
                    <Routes>
                      <Route index element={<DoctorDashboard />} />
                      <Route path="patients" element={<DoctorPatients />} />
                      <Route path="chat-ai" element={<DoctorAIAssistant />} />
                      <Route path="chat-doctors" element={<DoctorNetwork />} />
                    </Routes>
                  </DashboardLayout>
                </RequireRole>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

function RequireRole({
  role,
  children,
}: {
  role: 'patient' | 'doctor'
  children: React.ReactNode
}) {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  if (user.role !== role) {
    return <Navigate to={user.role === 'patient' ? '/patient' : '/doctor'} replace />
  }
  return <>{children}</>
}

export default App
