import React from 'react';
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
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 border-b border-slate-100 pb-12"
          >
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">{title}</h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Last Updated: {lastUpdated}</p>
          </motion.div>
          
          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:text-slate-600 prose-p:font-medium prose-li:text-slate-600 prose-li:font-medium">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolicyLayout;
