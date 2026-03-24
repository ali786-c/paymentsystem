import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-blue-600">Unified Payment Core</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.9] mb-6">
              The Unified <br />
              <span className="text-blue-600">Infrastructure</span> <br />
              for Global Trade
            </h1>
            
            <p className="text-xl text-slate-600 font-medium leading-relaxed mb-10 max-w-lg">
              LinkPayPro provides a single API to connect, route, and optimize payments across 50+ gateways. Built for B2B platforms, SaaS, and modern marketplaces.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <button className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 group hover:shadow-2xl hover:shadow-slate-500/20 transition-all transform hover:-translate-y-1">
                <span>Talk to Sales</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-colors">
                View Documentation
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-wider">Enterprise Grade</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold uppercase tracking-wider">Instant Setup</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold uppercase tracking-wider">B2B Focused</span>
              </div>
            </div>
          </motion.div>

          {/* Abstract Hero Visual (The Brain/Node) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-[500px] aspect-square">
                {/* Visual implementation will continue in NodeConnection component or simplified here for now */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-indigo-600/5 rounded-full blur-3xl opacity-50"></div>
                <div className="relative z-10 w-full h-full border border-slate-200/50 bg-white/50 backdrop-blur-2xl rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.05)] p-12 flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="w-12 h-12 bg-white shadow-xl rounded-2xl flex items-center justify-center">
                            <Layers className="text-blue-600 w-6 h-6" />
                        </div>
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        <div className="h-6 w-32 bg-slate-100 rounded-lg"></div>
                        <div className="h-2 w-full bg-slate-50 rounded-lg"></div>
                        <div className="h-2 w-3/4 bg-slate-50 rounded-lg"></div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="h-20 bg-blue-50/50 border border-blue-100 rounded-2xl p-4">
                             <div className="h-2 w-12 bg-blue-200 rounded-full mb-2"></div>
                             <div className="h-4 w-16 bg-blue-300/50 rounded-lg"></div>
                        </div>
                        <div className="h-20 bg-slate-50/50 border border-slate-100 rounded-2xl p-4">
                             <div className="h-2 w-12 bg-slate-200 rounded-full mb-2"></div>
                             <div className="h-4 w-16 bg-slate-300/50 rounded-lg"></div>
                        </div>
                    </div>

                    <div className="mt-auto pt-8 border-t border-slate-100 flex items-center justify-between">
                         <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"></div>
                            ))}
                         </div>
                         <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Live Routing</div>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
