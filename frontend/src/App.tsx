import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CheckoutPage from './pages/CheckoutPage'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import RefundPolicy from './pages/RefundPolicy'
import ContactPage from './pages/ContactPage'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/utils/ScrollToTop'
import DevelopersPage from './pages/DevelopersPage'
import DocsPage from './pages/DocsPage'
import ApiPage from './pages/ApiPage'
import SupportPage from './pages/SupportPage'
import StatusPage from './pages/StatusPage'
import KybPage from './pages/KybPage'

// Build: LinkPayPro v1.0.2 - Fixed Navigation
function App() {
  // Automatically detect if we are in a subdirectory (like XAMPP) or root (like cPanel)
  const basename = window.location.pathname.startsWith('/upgrader-pay-hub') 
    ? '/upgrader-pay-hub' 
    : '';

  return (
    <Router basename={basename}>
      <ScrollToTop />
      <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-500/10 transition-colors duration-500">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/refund" element={<RefundPolicy />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/developers" element={<DevelopersPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/api" element={<ApiPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/kyb" element={<KybPage />} />
          <Route path="/checkout/:invoiceId" element={<CheckoutPage />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center p-20 text-center font-black uppercase tracking-[0.3em] text-slate-400">
              404 - Missing Protocol
            </div>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
