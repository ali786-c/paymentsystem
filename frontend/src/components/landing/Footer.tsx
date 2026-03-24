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
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Layers className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 uppercase">LinkPayPro</span>
            </Link>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              Unified payment infrastructure for modern global trade. Connect everything, route smarter.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-8">Platform</h5>
            <ul className="space-y-4">
              <li><Link to="/#features" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">Features</Link></li>
              <li><Link to="/#solutions" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">Solutions</Link></li>
              <li><Link to="/#pricing" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">Talk to Sales</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-8">Resources</h5>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">Documentation</Link></li>
              <li><Link to="/contact" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">API Reference</Link></li>
              <li><Link to="/contact" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">Support Center</Link></li>
              <li><Link to="/contact" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">System Status</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-8">Legal & Policies</h5>
            <ul className="space-y-4">
              <li><Link to="/privacy" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="/refund" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">Refund Policy</Link></li>
              <li><Link to="/contact" className="text-slate-500 font-medium hover:text-blue-600 transition-colors">Merchant KYB</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm font-medium text-slate-400">
          <p>© 2026 LinkPayPro. All rights reserved.</p>
          <div className="flex space-x-6">
            <span>Industry: FinTech SaaS</span>
            <span>PCI DSS Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
