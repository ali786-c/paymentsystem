import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { Shield, Lock, FileCheck } from 'lucide-react';

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const PolicyLayout: React.FC<PolicyLayoutProps> = ({ title, lastUpdated, children }) => {
  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-500/10">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Policy Hero */}
          <div className="relative mb-16 overflow-hidden bg-white rounded-[3rem] p-12 md:p-20 border border-slate-200 shadow-sm">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 blur-[100px] -mr-48 -mt-48 opacity-50"></div>
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-8">
                <FileCheck size={14} className="text-blue-600" />
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-blue-600">Legal Framework 2026</span>
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-none mb-8"
              >
                {title}
              </motion.h1>
              <div className="flex flex-wrap items-center gap-6">
                <p className="text-slate-500 font-bold border-r border-slate-200 pr-6 uppercase tracking-widest text-[10px]">
                  Last Updated: <span className="text-slate-900 font-black">{lastUpdated}</span>
                </p>
                <div className="flex items-center space-x-2 text-emerald-600 font-bold uppercase tracking-widest text-[10px]">
                  <Shield size={14} />
                  <span>Verified Compliance</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_3fr] gap-16">
            {/* Trust Sidebar */}
            <div className="hidden lg:block space-y-8">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">Safe & Secure</h4>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                        <Lock size={16} className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Data Integrity</p>
                        <p className="text-[11px] text-slate-500 font-medium mt-1">End-to-end encryption for all session telemetry.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                        <Shield size={16} className="text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">PCI Standards</p>
                        <p className="text-[11px] text-slate-500 font-medium mt-1">Level 1 Service Provider compliance certified.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                <h4 className="text-xs font-black uppercase tracking-widest mb-4 text-slate-400">Merchant Help</h4>
                <p className="text-sm font-medium leading-relaxed mb-6">Need clarification on our legal terms or data processing?</p>
                <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-colors">Contact Legal</button>
              </div>
            </div>

            {/* Document Content */}
            <div className="bg-white rounded-[3rem] p-12 md:p-20 border border-slate-200 shadow-sm">
              <div className="prose prose-slate prose-lg max-w-none 
                prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight 
                prose-p:text-slate-600 prose-p:font-medium prose-p:leading-relaxed
                prose-li:text-slate-600 prose-li:font-medium
                prose-strong:text-slate-900 prose-strong:font-black
                prose-h2:text-3xl prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-6 prose-h2:mb-8
                prose-h3:text-xl
              ">
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolicyLayout;
