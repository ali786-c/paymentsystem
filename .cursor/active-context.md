> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `frontend\src\components\landing\Footer.tsx` (Domain: **Frontend (React/UI)**)

### 📐 Frontend (React/UI) Conventions & Fixes
- **[decision] decision in Footer.tsx**: -               <li><Link to="/contact" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">Documentation</Link></li>
+               <li><Link to="/docs" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">Documentation</Link></li>
-               <li><Link to="/contact" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">API Reference</Link></li>
+               <li><Link to="/api" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">API Reference</Link></li>
-               <li><Link to="/contact" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">Support Center</Link></li>
+               <li><Link to="/support" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">Support Center</Link></li>
-               <li><Link to="/contact" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">System Status</Link></li>
+               <li><Link to="/status" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">System Status</Link></li>
-               <li><Link to="/contact" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">Merchant KYB</Link></li>
+               <li><Link to="/kyb" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">Merchant KYB</Link></li>

📌 IDE AST Context: Modified symbols likely include [Footer, default]
- **[what-changed] what-changed in Footer.tsx**: File updated (external): frontend/src/components/landing/Footer.tsx

Content summary (77 lines):
import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-8">
       
- **[what-changed] what-changed in Navbar.tsx**: File updated (external): frontend/src/components/landing/Navbar.tsx

Content summary (68 lines):
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('sc
- **[what-changed] Replaced lucide-react with react**: - import { Mail, MessageSquare } from 'lucide-react';
+ import React from 'react';

📌 IDE AST Context: Modified symbols likely include [PolicyLayoutProps, PolicyLayout, default]
- **[what-changed] what-changed in PolicyLayout.tsx**: File updated (external): frontend/src/components/landing/PolicyLayout.tsx

Content summary (38 lines):
import { Mail, MessageSquare } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const PolicyLayout: React.FC<PolicyLayoutProps> = ({ title, lastUpdated, children }) => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px
- **[how-it-works] how-it-works in Hero.tsx**: File updated (external): frontend/src/components/landing/Hero.tsx

Content summary (121 lines):
import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e2e8f
- **[what-changed] what-changed in Features.tsx**: File updated (external): frontend/src/components/landing/Features.tsx

Content summary (74 lines):
import React from 'react';
import { Shield, Zap, BarChart3, Globe, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Features: React.FC = () => {
  const features = [
    {
      title: "Gateway Orchestra",
      description: "Connect to 50+ payment gateways through a single integration. Swap providers with zero code changes.",
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      span: "col-span-2"
    },
    {
      title: "Smart Routing",
      description:
- **[what-changed] what-changed in Pricing.tsx**: File updated (external): frontend/src/components/landing/Pricing.tsx

Content summary (91 lines):
import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Starter",
      description: "For small businesses & startups.",
      price: "$49",
      features: ["Up to $10k/mo volume", "3 Payment Gateways", "Unified Dashboard", "Email Support"]
    },
    {
      name: "Pro",
      description: "For scaling platforms & SaaS.",
      price: "$199",
      recommended: t
- **[what-changed] what-changed in Placeholders.tsx**: File updated (external): frontend/src/components/landing/Placeholders.tsx

Content summary (9 lines):
// Temporary placeholder components for development structure
import React from 'react';

export const Features = () => (<section className="py-20 bg-white"><div className="max-w-7xl mx-auto px-6 font-black uppercase text-slate-200 tracking-widest text-4xl">Features Content Coming...</div></section>);
export const Pricing = () => (<section className="py-20 bg-slate-50"><div className="max-w-7xl mx-auto px-6 font-black uppercase text-slate-200 tracking-widest text-4xl">Pricing Content Coming...</
- **[what-changed] Replaced auth DevelopersPage — hardens HTTP security headers**: - 
+ import DevelopersPage from './pages/DevelopersPage'
- // Build: LinkPayPro v1.0.1
+ import DocsPage from './pages/DocsPage'
- function App() {
+ import ApiPage from './pages/ApiPage'
-   // Automatically detect if we are in a subdirectory (like XAMPP) or root (like cPanel)
+ import SupportPage from './pages/SupportPage'
-   const basename = window.location.pathname.startsWith('/upgrader-pay-hub') 
+ import StatusPage from './pages/StatusPage'
-     ? '/upgrader-pay-hub' 
+ import KybPage from './pages/KybPage'
-     : '';
+ 
- 
+ // Build: LinkPayPro v1.0.1
-   return (
+ function App() {
-     <Router basename={basename}>
+   // Automatically detect if we are in a subdirectory (like XAMPP) or root (like cPanel)
-       <ScrollToTop />
+   const basename = window.location.pathname.startsWith('/upgrader-pay-hub') 
-       <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-500/10 transition-colors duration-500">
+     ? '/upgrader-pay-hub' 
-         <Routes>
+     : '';
-           <Route path="/" element={<LandingPage />} />
+ 
-           <Route path="/login" element={<LoginPage />} />
+   return (
-           <Route path="/privacy" element={<PrivacyPolicy />} />
+     <Router basename={basename}>
-           <Route path="/terms" element={<TermsConditions />} />
+       <ScrollToTop />
-           <Route path="/refund" element={<RefundPolicy />} />
+       <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-500/10 transition-colors duration-500">
-           <Route path="/contact" element={<ContactPage />} />
+         <Routes>
-           <Route path="/checkout/:invoiceId" element={<CheckoutPage />} />
+           <Route path="/" element={<LandingPage />} />
-           <Route 
+           <Route path="/login" element={<LoginPage />} />
-             path="/admin/*" 
+           <Route path="/privacy" element={<PrivacyPolicy />} />
-             element={
+           <Route path="/terms" element={<TermsConditions />} />
-               <ProtectedRoute>
+           <Route path="/refund" element={<RefundPolicy />} />
-                 <DashboardPage />
+           <Route path="/contact" element={<ContactPage />} />
-               </ProtectedRoute>
+           <Route path="/developers" element={<DevelopersPage />} />
-             } 
+           <Route path="/docs" element={<DocsPage />} />
-           />
+           <Route path="/api" element={<ApiPage />} />
-           <Route path="*" element={
+           <Route path="/support" element={<SupportPage />} />
-             <div className="min-h-screen flex items-center justify-center p-20 text-center font-black uppercase tracking-[0.3em] text-slate-400">
+           <Route path="/status" element={<StatusPage />} />
-               404 - Missing Protocol
+           <Route path="/kyb" element={<KybPage />} />
-             </div>
+           <Route path="/checkout/:invoiceId" element={<CheckoutPage />} />
-           } />
+           <Route 
-         </Routes>
+             path="/admin/*" 
-       </div>
+             element={
-     </Router>
+               <ProtectedRoute>
-   )
+                 <DashboardPage />
- }
+               </ProtectedRoute>
- 
+             } 
- export default App
+           />
- 
+           <Route path="*" element={
+             <div className="min-h-screen flex items-center justify-center p-20 text-center font-black uppercase tracking-[0.3em] text-slate-400">
+               404 - Missing Protocol
+             </div>
+           } />
+         </Routes>
+       </div>
+     </Router>
+   )
+ }
+ 
+ export default App
+ 

📌 IDE AST Context: Modified symbols likely include [App, default]
- **[what-changed] what-changed in KybPage.tsx**: File updated (external): frontend/src/pages/KybPage.tsx

Content summary (142 lines):
import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { motion } from 'framer-motion';
import { FileText, Building2, UserCheck, ShieldSecurity, ArrowRight, CheckCircle } from 'lucide-react';

const KybPage: React.FC = () => {
    const steps = [
        {
            title: 'Business Information',
            desc: 'Company name, registration number, and taxID.',
            icon: <Building2 className="text-blue-60
- **[what-changed] what-changed in StatusPage.tsx**: File updated (external): frontend/src/pages/StatusPage.tsx

Content summary (124 lines):
import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Clock, Server, Monitor, ShieldCheck } from 'lucide-react';

const StatusPage: React.FC = () => {
    const services = [
        { name: 'API Gateway', status: 'operational', uptime: '99.99%' },
        { name: 'Dashboard UI', status: 'operational', uptime: '100%' },
        { name: 'Payment P
- **[what-changed] Replaced auth ScrollToTop — improves module reusability**: - 
+ import ScrollToTop from './components/utils/ScrollToTop'
- // Build: LinkPayPro v1.0.1
+ 
- function App() {
+ // Build: LinkPayPro v1.0.1
-   // Automatically detect if we are in a subdirectory (like XAMPP) or root (like cPanel)
+ function App() {
-   const basename = window.location.pathname.startsWith('/upgrader-pay-hub') 
+   // Automatically detect if we are in a subdirectory (like XAMPP) or root (like cPanel)
-     ? '/upgrader-pay-hub' 
+   const basename = window.location.pathname.startsWith('/upgrader-pay-hub') 
-     : '';
+     ? '/upgrader-pay-hub' 
- 
+     : '';
-   return (
+ 
-     <Router basename={basename}>
+   return (
-       <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-500/10 transition-colors duration-500">
+     <Router basename={basename}>
-         <Routes>
+       <ScrollToTop />
-           <Route path="/" element={<LandingPage />} />
+       <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-500/10 transition-colors duration-500">
-           <Route path="/login" element={<LoginPage />} />
+         <Routes>
-           <Route path="/privacy" element={<PrivacyPolicy />} />
+           <Route path="/" element={<LandingPage />} />
-           <Route path="/terms" element={<TermsConditions />} />
+           <Route path="/login" element={<LoginPage />} />
-           <Route path="/refund" element={<RefundPolicy />} />
+           <Route path="/privacy" element={<PrivacyPolicy />} />
-           <Route path="/contact" element={<ContactPage />} />
+           <Route path="/terms" element={<TermsConditions />} />
-           <Route path="/checkout/:invoiceId" element={<CheckoutPage />} />
+           <Route path="/refund" element={<RefundPolicy />} />
-           <Route 
+           <Route path="/contact" element={<ContactPage />} />
-             path="/admin/*" 
+           <Route path="/checkout/:invoiceId" element={<CheckoutPage />} />
-             element={
+           <Route 
-               <ProtectedRoute>
+             path="/admin/*" 
-                 <DashboardPage />
+             element={
-               </ProtectedRoute>
+               <ProtectedRoute>
-             } 
+                 <DashboardPage />
-           />
+               </ProtectedRoute>
-           <Route path="*" element={
+             } 
-             <div className="min-h-screen flex items-center justify-center p-20 text-center font-black uppercase tracking-[0.3em] text-slate-400">
+           />
-               404 - Missing Protocol
+           <Route path="*" element={
-             </div>
+             <div className="min-h-screen flex items-center justify-center p-20 text-center font-black uppercase tracking-[0.3em] text-slate-400">
-           } />
+               404 - Missing Protocol
-         </Routes>
+             </div>
-       </div>
+           } />
-     </Router>
+         </Routes>
-   )
+       </div>
- }
+     </Router>
- 
+   )
- export default App
+ }
+ export default App
+ 

📌 IDE AST Context: Modified symbols likely include [App, default]
- **[what-changed] Replaced auth Build — improves module reusability**: - function App() {
+ // Build: LinkPayPro v1.0.1
-   // Automatically detect if we are in a subdirectory (like XAMPP) or root (like cPanel)
+ function App() {
-   const basename = window.location.pathname.startsWith('/upgrader-pay-hub') 
+   // Automatically detect if we are in a subdirectory (like XAMPP) or root (like cPanel)
-     ? '/upgrader-pay-hub' 
+   const basename = window.location.pathname.startsWith('/upgrader-pay-hub') 
-     : '';
+     ? '/upgrader-pay-hub' 
- 
+     : '';
-   return (
+ 
-     <Router basename={basename}>
+   return (
-       <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-500/10 transition-colors duration-500">
+     <Router basename={basename}>
-         <Routes>
+       <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-500/10 transition-colors duration-500">
-           <Route path="/" element={<LandingPage />} />
+         <Routes>
-           <Route path="/login" element={<LoginPage />} />
+           <Route path="/" element={<LandingPage />} />
-           <Route path="/privacy" element={<PrivacyPolicy />} />
+           <Route path="/login" element={<LoginPage />} />
-           <Route path="/terms" element={<TermsConditions />} />
+           <Route path="/privacy" element={<PrivacyPolicy />} />
-           <Route path="/refund" element={<RefundPolicy />} />
+           <Route path="/terms" element={<TermsConditions />} />
-           <Route path="/contact" element={<ContactPage />} />
+           <Route path="/refund" element={<RefundPolicy />} />
-           <Route path="/checkout/:invoiceId" element={<CheckoutPage />} />
+           <Route path="/contact" element={<ContactPage />} />
-           <Route 
+           <Route path="/checkout/:invoiceId" element={<CheckoutPage />} />
-             path="/admin/*" 
+           <Route 
-             element={
+             path="/admin/*" 
-               <ProtectedRoute>
+             element={
-                 <DashboardPage />
+               <ProtectedRoute>
-               </ProtectedRoute>
+                 <DashboardPage />
-             } 
+               </ProtectedRoute>
-           />
+             } 
-           <Route path="*" element={
+           />
-             <div className="min-h-screen flex items-center justify-center p-20 text-center font-black uppercase tracking-[0.3em] text-slate-400">
+           <Route path="*" element={
-               404 - Missing Protocol
+             <div className="min-h-screen flex items-center justify-center p-20 text-center font-black uppercase tracking-[0.3em] text-slate-400">
-             </div>
+               404 - Missing Protocol
-           } />
+             </div>
-         </Routes>
+           } />
-       </div>
+         </Routes>
-     </Router>
+       </div>
-   )
+     </Router>
- }
+   )
- 
+ }
- export default App
+ 
- 
+ export default App
+ 

📌 IDE AST Context: Modified symbols likely include [App, default]
- **[what-changed] Replaced lucide-react with lucide-react**: - import { Mail, MessageSquare, Globe } from 'lucide-react';
+ import { Mail, MessageSquare } from 'lucide-react';

📌 IDE AST Context: Modified symbols likely include [ContactPage, default]
