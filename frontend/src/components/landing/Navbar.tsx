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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
            <Layers className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 uppercase">LinkPayPro</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="#features" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Features</Link>
          <Link to="#solutions" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Solutions</Link>
          <Link to="#pricing" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Pricing</Link>
          <Link to="/developers" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Developers</Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-sm font-bold text-slate-600 px-6 py-2.5 hover:bg-slate-100 rounded-2xl transition-colors">Login</Link>
          <Link to="/get-started" className="text-sm font-bold text-white bg-blue-600 px-8 py-2.5 rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all transform hover:-translate-y-0.5">Get Started</Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4">
            <Link to="#features" className="text-lg font-bold text-slate-900 py-2 border-b border-slate-50">Features</Link>
            <Link to="#solutions" className="text-lg font-bold text-slate-900 py-2 border-b border-slate-50">Solutions</Link>
            <Link to="#pricing" className="text-lg font-bold text-slate-900 py-2 border-b border-slate-50">Pricing</Link>
            <Link to="/developers" className="text-lg font-bold text-slate-900 py-2">Developers</Link>
            <div className="pt-4 flex flex-col space-y-3">
              <Link to="/login" className="text-center font-bold text-slate-900 border border-slate-200 py-3 rounded-2xl">Login</Link>
              <Link to="/get-started" className="text-center font-bold text-white bg-blue-600 py-3 rounded-2xl">Get Started</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
