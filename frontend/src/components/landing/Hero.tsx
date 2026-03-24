import React from 'react';
import { ArrowRight, Zap, Layers, Globe, Cpu, BarChart3, ShieldCheck, Terminal, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] 
      } as any
    }
  };

  const stats = [
    { label: 'Gateways', value: '50+', icon: <Globe size={18} className="text-blue-500" /> },
    { label: 'Uptime', value: '99.99%', icon: <Zap size={18} className="text-amber-500" /> },
    { label: 'Latency', value: '< 200ms', icon: <Cpu size={18} className="text-emerald-500" /> }
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-52 md:pb-40 overflow-hidden bg-[#fdfdfd]">
      {/* 🔮 High-End Background Layering */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Circuitry Pattern (Mocked with SVGs) */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 0 20 L 20 20 L 30 30 L 70 30 L 80 40 L 100 40" fill="none" stroke="currentColor" strokeWidth="0.1" />
            <path d="M 0 80 L 40 80 L 50 70 L 90 70 L 100 60" fill="none" stroke="currentColor" strokeWidth="0.1" />
        </svg>

        {/* Dynamic Glows */}
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-400/10 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-indigo-400/5 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-blue-300/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* 🚀 Left Column: High-Texture Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Top Label */}
            <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-8">
               <div className="h-px w-8 bg-blue-600"></div>
               <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600">Established 2024 • Enterprise Infrastructure</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.88] mb-10">
              Transform <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500 animate-gradient-x">Infrastructure</span> <br />
              into <span className="relative inline-block">
                Capital.
                <motion.svg 
                    viewBox="0 0 200 20" 
                    className="absolute -bottom-4 left-0 w-full h-4 text-blue-200/60"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <path d="M 0 10 Q 50 20 100 10 T 200 10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </motion.svg>
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-slate-500 font-medium leading-relaxed mb-12 max-w-lg border-l-4 border-slate-100 pl-8">
              LinkPayPro is the <span className="text-slate-900 font-bold">single protocol layer</span> for global commerce. Connect 50+ gateways with one API call and optimized routing logic.
            </motion.p>
            
            {/* 🖥️ Technical Mockup: API Snippet (The "Pro" Touch) */}
            <motion.div variants={itemVariants} className="mb-14 hidden sm:block">
                <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-800 group hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center space-x-2 mb-4 border-b border-slate-800 pb-4">
                        <Terminal size={14} className="text-blue-500" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">LinkPayPro SDK v2.0</span>
                    </div>
                    <div className="font-mono text-[13px] leading-relaxed">
                        <div className="text-blue-400">const <span className="text-white">payment</span> = <span className="text-indigo-400">await</span> linkpay.init(&#123;</div>
                        <div className="pl-6 text-slate-400">amount: <span className="text-emerald-400">125000</span>,</div>
                        <div className="pl-6 text-slate-400">currency: <span className="text-emerald-400">'USD'</span>,</div>
                        <div className="pl-6 text-slate-400">routing: <span className="text-amber-400">'smart-optimize'</span></div>
                        <div className="text-blue-400">&#125;);</div>
                    </div>
                </div>
            </motion.div>

            {/* 📊 Glassmorphic Stats Section */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 mb-16 px-4 py-8 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-xl shadow-slate-200/40">
                {stats.map((s, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-slate-100 mb-3 text-blue-600 border border-slate-50">
                            {s.icon}
                        </div>
                        <div className="text-lg font-black text-slate-900 leading-none mb-1">{s.value}</div>
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
                    </div>
                ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact" className="w-full sm:w-auto px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-3 group hover:bg-blue-700 hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all transform hover:-translate-y-1">
                <span>Kickstart Integration</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/docs" className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-slate-300 hover:bg-slate-50 transition-all text-center">
                Review Documentation
              </Link>
            </motion.div>
          </motion.div>

          {/* 🎨 Right Column: The Core Visual (Slightly Refined) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            {/* Absolute Abstract Floating Blobs */}
            <motion.div 
                animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-12 -right-12 w-24 h-24 bg-blue-600/10 rounded-[2rem] blur-xl"
            />
            <motion.div 
                animate={{ x: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -bottom-12 -left-12 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl"
            />

            <div className="relative w-full max-w-[560px] aspect-square">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/15 to-indigo-600/5 rounded-full blur-[120px] opacity-40"></div>
                
                {/* Main Card Container */}
                <div className="relative z-10 w-full h-full bg-white border border-white/60 backdrop-blur-3xl rounded-[4rem] shadow-[0_60px_120px_rgba(30,41,59,0.1)] p-14 flex flex-col justify-between overflow-hidden">
                    {/* Interior Glows */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full -mr-48 -mt-48 blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100/30 rounded-full -ml-32 -mb-32 blur-[80px]"></div>

                    <div className="relative flex items-center justify-between">
                        <div className="w-16 h-16 bg-white shadow-2xl shadow-blue-500/15 rounded-[1.5rem] flex items-center justify-center border border-slate-50 transform hover:rotate-12 transition-transform duration-500">
                            <Layers className="text-blue-600 w-8 h-8" />
                        </div>
                        <div className="flex space-x-3">
                            <div className="flex items-center space-x-2 px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Active</span>
                            </div>
                            <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                        </div>
                    </div>

                    <div className="mt-14 space-y-8">
                        <div className="flex items-center space-x-4">
                            <div className="h-4 w-4 bg-blue-100 rounded-full"></div>
                            <div className="h-3 w-48 bg-slate-900/10 rounded-full"></div>
                        </div>
                        <div className="space-y-4 pl-8 border-l-2 border-slate-50">
                            <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                            <div className="h-2 w-4/5 bg-slate-50 rounded-full"></div>
                        </div>
                    </div>

                    {/* Interactive Data Blocks */}
                    <div className="mt-14 grid grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-100 rounded-[2.5rem] p-8 group hover:scale-[1.02] transition-all cursor-default">
                             <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-md mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                                <Fingerprint size={20} />
                             </div>
                             <div className="h-3 w-16 bg-blue-600/20 rounded-full mb-3"></div>
                             <div className="h-2 w-12 bg-blue-400/10 rounded-full"></div>
                        </div>
                        <div className="bg-slate-50/80 border border-slate-100 rounded-[2.5rem] p-8 group hover:scale-[1.02] transition-all cursor-default text-slate-400">
                            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-md mb-6 border border-slate-100 opacity-50">
                                <ShieldCheck size={20} />
                             </div>
                             <div className="h-3 w-16 bg-slate-200 rounded-full mb-3"></div>
                             <div className="h-2 w-12 bg-slate-100 rounded-full"></div>
                        </div>
                    </div>

                    <div className="mt-auto pt-10 border-t border-slate-100/50 flex items-center justify-between opacity-80">
                         <div className="flex -space-x-3 items-center">
                            {[1,2,3,4].map(i => (
                                <div key={i} className={`w-10 h-10 rounded-full border-4 border-white bg-slate-100 shadow-sm flex items-center justify-center text-[10px] font-black text-slate-400 scale-${100 - (i*5)}`}>
                                    {i}
                                </div>
                            ))}
                            <span className="ml-6 text-[10px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">Total Reach</span>
                         </div>
                         <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                            <BarChart3 size={12} className="text-blue-500" />
                            <div className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Routing Optimized</div>
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
