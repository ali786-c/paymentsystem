import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CheckoutPage from './pages/CheckoutPage'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  // Automatically detect if we are in a subdirectory (like XAMPP) or root (like cPanel)
  const basename = window.location.pathname.startsWith('/upgrader-pay-hub') 
    ? '/upgrader-pay-hub' 
    : '';

  return (
    <Router basename={basename}>
      <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-500/10 transition-colors duration-500">
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/login" element={<LoginPage />} />
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
