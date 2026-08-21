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
      description: "Automatically route every transaction to the most reliable and cost-effective gateway.",
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      span: "col-span-1"
    },
    {
      title: "Unified Reporting",
      description: "One dashboard for all your providers. Get real-time insights into your global cash flow.",
      icon: <BarChart3 className="w-6 h-6 text-emerald-500" />,
      span: "col-span-1"
    },
    {
      title: "Developer First",
      description: "Clean REST APIs, extensive documentation, and multi-language SDKs for rapid deployment.",
      icon: <Code2 className="w-6 h-6 text-indigo-500" />,
      span: "col-span-1"
    },
    {
      title: "Global Compliance",
      description: "Built-in PCI DSS compliance, GDPR readiness, and regional tax handling.",
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      span: "col-span-1"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 text-center">Infrastructure</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Built for the next generation of commerce.</h3>
          <p className="text-lg text-slate-600 font-medium">LinkPayPro removes the complexity of managing multiple payment providers so you can focus on scaling your business.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className={`p-8 bg-slate-50 border border-slate-100 rounded-[32px] hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all group ${feature.span}`}
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                {feature.icon || <Shield className="w-6 h-6 text-blue-600" />}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h4>
              <p className="text-slate-600 font-medium leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Internal Layers icon to avoid import issues if not explicitly exported from lucide
const Layers = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
);

export default Features;
