import React from 'react';
import { ArrowRight, Zap, Layers, Globe, Cpu, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      } as any
    }
  };

  const stats = [
    { label: 'Gateways', value: '50+', icon: <Globe size={14} className="text-blue-500" /> },
    { label: 'Uptime', value: '99.9%', icon: <Zap size={14} className="text-amber-500" /> },
    { label: 'Latency', value: '< 200ms', icon: <Cpu size={14} className="text-emerald-500" /> }
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
      {/* 🔮 Advanced Background Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute top-1/2 -right-24 w-[400px] h-[400px] bg-indigo-100/20 rounded-full blur-[100px] opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* 🚀 Left Column (Enhanced) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Interactive Status Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-3 bg-white border border-slate-200 px-5 py-2 rounded-2xl mb-10 shadow-sm hover:border-blue-200 transition-colors cursor-default group">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 group-hover:text-blue-600 transition-colors">Network Status: Operational</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-8">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">Unified</span> <br />
              Infrastructure <br />
              <span className="inline-block relative">
                for Global Trade
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute -bottom-2 left-0 h-2 bg-blue-100 -z-10 rounded-full"
                />
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-slate-500 font-medium leading-relaxed mb-12 max-w-lg">
              LinkPayPro provides a <span className="text-slate-900 font-black italic">single protocol</span> to connect, route, and optimize payments across every gateway. Engineered for high-scale B2B systems.
            </motion.p>
            
            {/* 📈 Social Proof Stats */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-8 mb-16">
                {stats.map((s, idx) => (
                    <div key={idx} className="flex flex-col">
                        <div className="flex items-center space-x-2 mb-1">
                            {s.icon}
                            <span className="text-sm font-black text-slate-900 tracking-tight">{s.value}</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{s.label}</span>
                    </div>
                ))}
                <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                <div className="flex items-center space-x-3">
                    <div className="flex -space-x-3">
                        {[1,2,3].map(i => (
                            <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black scale-${100 - (i*5)}`}>
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Trusted by 500+ <br/>Businesses</span>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact" className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-3 group hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1">
                <span>Start Integrating</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/docs" className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-slate-300 hover:bg-slate-50 transition-all text-center">
                Documentation
              </Link>
            </motion.div>

            {/* Subtle Floating Icon */}
            <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-12 bottom-0 hidden xl:block opacity-20"
            >
                <BarChart3 size={48} className="text-blue-900" />
            </motion.div>
          </motion.div>

          {/* 🎨 Right Column (Existing High-End Canvas) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[540px] aspect-square">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-600/10 rounded-full blur-[100px] opacity-50 animate-pulse"></div>
                <div className="relative z-10 w-full h-full border border-slate-200 bg-white/60 backdrop-blur-3xl rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.08)] p-12 flex flex-col justify-between overflow-hidden border-white/50">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full -mr-40 -mt-40 blur-[80px]"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="w-14 h-14 bg-white shadow-2xl shadow-blue-500/10 rounded-[1.25rem] flex items-center justify-center border border-slate-100">
                            <Layers className="text-blue-600 w-7 h-7" />
                        </div>
                        <div className="flex space-x-2">
                            <div className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-[9px] font-black text-emerald-600 uppercase tracking-widest">Live</div>
                            <div className="w-2.5 h-2.5 bg-blue-400 rounded-full"></div>
                        </div>
                    </div>

                    <div className="mt-12 space-y-6">
                        <div className="h-3 w-40 bg-slate-900 rounded-full opacity-10"></div>
                        <div className="space-y-3">
                            <div className="h-2 w-full bg-slate-900/5 rounded-full"></div>
                            <div className="h-2 w-5/6 bg-slate-900/5 rounded-full"></div>
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-6">
                        <div className="bg-blue-50/50 border border-blue-200/50 rounded-[2rem] p-6 backdrop-blur-sm group hover:border-blue-300 transition-colors">
                             <div className="w-8 h-1.5 bg-blue-200 rounded-full mb-4"></div>
                             <div className="h-6 w-20 bg-blue-600/10 rounded-xl"></div>
                        </div>
                        <div className="bg-slate-50/50 border border-slate-200/50 rounded-[2rem] p-6 backdrop-blur-sm group hover:border-slate-300 transition-colors">
                             <div className="w-8 h-1.5 bg-slate-200 rounded-full mb-4"></div>
                             <div className="h-6 w-20 bg-slate-900/10 rounded-xl"></div>
                        </div>
                    </div>

                    <div className="mt-auto pt-10 border-t border-slate-100/50 flex items-center justify-between">
                         <div className="flex -space-x-3">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="w-9 h-9 rounded-full border-4 border-white bg-slate-200 shadow-sm"></div>
                            ))}
                         </div>
                         <div className="flex items-center space-x-2">
                            <BarChart3 size={12} className="text-blue-500" />
                            <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Latency Optimizing</div>
                         </div>
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
