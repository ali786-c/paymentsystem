import React from 'react';
import { ArrowRight, Zap, Layers, Globe, Cpu, ShieldCheck, Terminal, Activity } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  // 🎢 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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

  const transactions = [
    { id: 1, type: 'Stripe', amount: '+$1,250.00', time: 'Just now' },
    { id: 2, type: 'PayPal', amount: '+$540.20', time: '2m ago' },
    { id: 3, type: 'Adyen', amount: '+$3,100.00', time: '5m ago' }
  ];

  return (
    <section className="relative pt-24 pb-20 md:pt-36 md:pb-32 overflow-hidden bg-[#fdfdfd]">
      {/* 🔮 High-End Background Layering */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse:60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 0 20 L 20 20 L 30 30 L 70 30 L 80 40 L 100 40" fill="none" stroke="currentColor" strokeWidth="0.1" />
            <path d="M 0 80 L 40 80 L 50 70 L 90 70 L 100 60" fill="none" stroke="currentColor" strokeWidth="0.1" />
        </svg>
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-400/10 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-indigo-400/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 🚀 Left Column: High-Texture Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-8">
               <div className="h-px w-8 bg-blue-600"></div>
               <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600">Enterprise Infrastructure • Global Reach</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.88] mb-10">
              Infinite <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500 animate-gradient-x">Integration</span> <br />
              for Fintech.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-slate-500 font-medium leading-relaxed mb-12 max-w-lg border-l-4 border-slate-100 pl-8">
              LinkPayPro connects 50+ global gateways with a <span className="text-slate-900 font-bold italic">single handshake</span>. Optimize routing, reduce latency, and scale globally.
            </motion.p>
            
            <motion.div variants={itemVariants} className="mb-14 hidden sm:block">
                <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-800 group hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center space-x-2 mb-4 border-b border-slate-800 pb-4">
                        <Terminal size={14} className="text-blue-500" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">SDK Version 2.4.0</span>
                    </div>
                    <div className="font-mono text-[13px] leading-relaxed">
                        <div className="text-blue-400">const <span className="text-white">gateway</span> = <span className="text-indigo-400">await</span> linkpay.route(&#123;</div>
                        <div className="pl-6 text-slate-400">policy: <span className="text-emerald-400">'max-uptime'</span>,</div>
                        <div className="pl-6 text-slate-400">region: <span className="text-emerald-400">'global'</span></div>
                        <div className="text-blue-400">&#125;);</div>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 mb-16 px-4 py-8 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-xl shadow-slate-200/40">
                {stats.map((s, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-3 border border-slate-50">
                            {s.icon}
                        </div>
                        <div className="text-lg font-black text-slate-900 leading-none mb-1">{s.value}</div>
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
                    </div>
                ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact" className="w-full sm:w-auto px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-3 group hover:bg-blue-700 hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all transform hover:-translate-y-1">
                <span>Request API Key</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/docs" className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-slate-300 hover:bg-slate-50 transition-all text-center">
                Documentation
              </Link>
            </motion.div>
          </motion.div>

          {/* 🚀 Right Column: Extreme Visual Dashboard */}
          <motion.div 
            style={{ rotateX, rotateY, perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[580px] aspect-square group/hero">
                {/* 🌌 Background Atmosphere */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-600/10 rounded-full blur-[140px] opacity-40 group-hover/hero:opacity-60 transition-opacity"></div>
                
                {/* 🛡️ Main Dashboard Card */}
                <div className="relative z-10 w-full h-full bg-white/80 border border-white/60 backdrop-blur-3xl rounded-[4rem] shadow-[0_80px_160px_rgba(30,41,59,0.15)] p-14 flex flex-col justify-between overflow-hidden">
                    {/* Header: Core Status */}
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="w-16 h-16 bg-white shadow-2xl shadow-blue-500/10 rounded-[1.5rem] flex items-center justify-center border border-slate-50 transform group-hover/hero:rotate-6 transition-transform duration-500">
                                <Layers className="text-blue-600 w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-900 tracking-tight leading-none mb-1">Global Core</h3>
                                <div className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Encrypted Tunnel</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <div className="px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[9px] font-black text-blue-600 uppercase tracking-widest">v4.0 Live</div>
                        </div>
                    </div>

                    {/* 📊 Live Chart Section (The Visual Meat) */}
                    <div className="mt-10 h-32 relative">
                        <div className="absolute inset-0 flex items-center justify-between opacity-10 space-x-2">
                            {[1,2,3,4,5,6,7,8,9,10].map(i => <div key={i} className="h-full w-px bg-slate-900"></div>)}
                        </div>
                        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 400 100">
                            <motion.path 
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                d="M 0 80 Q 50 20 100 70 T 200 40 T 300 80 T 400 30" 
                                fill="none" 
                                stroke="url(#line-gradient)" 
                                strokeWidth="4" 
                                strokeLinecap="round" 
                            />
                            <defs>
                                <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#2563eb" />
                                    <stop offset="100%" stopColor="#4f46e5" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute -top-4 right-0 flex items-center space-x-2 bg-blue-600 px-3 py-1 rounded-lg shadow-lg">
                            <Activity size={10} className="text-white animate-pulse" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">948.4 TPS</span>
                        </div>
                    </div>

                    {/* 📜 Transaction Feed (The "Action" Layer) */}
                    <div className="mt-10 grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Live Traffic</div>
                            {transactions.map((t, i) => (
                                <motion.div 
                                    key={t.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100 hover:bg-white transition-colors"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.5)]"></div>
                                        <span className="text-[11px] font-black text-slate-900">{t.type}</span>
                                    </div>
                                    <span className="text-[11px] font-bold text-emerald-600 tracking-tight">{t.amount}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* 🔒 Security & Data Layer */}
                        <div className="space-y-4">
                           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Infrastructure</div>
                           <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-2xl group transition-all">
                                <div className="flex items-center justify-between mb-4">
                                    <ShieldCheck size={20} className="text-blue-200" />
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                                </div>
                                <div className="text-xl font-black mb-1">99.99%</div>
                                <div className="text-[9px] font-bold text-blue-200 uppercase tracking-widest">SLA Guaranteed</div>
                           </div>
                        </div>
                    </div>

                    {/* Footer: Reach & Optimization */}
                    <div className="mt-auto pt-10 border-t border-slate-100/50 flex items-center justify-between overflow-hidden">
                         <div className="flex -space-x-3 items-center">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 shadow-md flex items-center justify-center">
                                    <Globe size={14} className="text-slate-400" />
                                </div>
                            ))}
                            <span className="ml-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nodes Online</span>
                         </div>
                         <div className="flex items-center space-x-3 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl shadow-slate-900/10">
                            <Activity size={12} className="text-blue-400" />
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase">Scale Secured</span>
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
