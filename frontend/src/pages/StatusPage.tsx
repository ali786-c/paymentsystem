import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Server, Monitor, ShieldCheck } from 'lucide-react';

const StatusPage: React.FC = () => {
    const services = [
        { name: 'API Gateway', status: 'operational', uptime: '99.99%' },
        { name: 'Dashboard UI', status: 'operational', uptime: '100%' },
        { name: 'Payment Processing', status: 'operational', uptime: '99.95%' },
        { name: 'Merchant Webhooks', status: 'operational', uptime: '99.98%' },
        { name: 'Checkout Sessions', status: 'operational', uptime: '99.99%' },
        { name: 'Admin Portal', status: 'operational', uptime: '99.90%' }
    ];

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-500/10">
            <Navbar />
            <main className="pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Overall Status Header */}
                    <div className="bg-white border border-slate-200 rounded-[3rem] p-8 md:p-12 mb-12 shadow-sm flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-6 md:space-y-0 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 blur-[100px] -mr-32 -mt-32"></div>
                        <div className="relative z-10 flex items-center space-x-6">
                            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <CheckCircle2 className="text-white w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">All Systems Operational</h1>
                                <p className="text-slate-500 font-medium mt-1">Refreshed: March 24, 2026 - 16:45 UTC</p>
                            </div>
                        </div>
                        <div className="relative z-10 px-6 py-3 bg-slate-900 rounded-2xl font-black text-white text-xs uppercase tracking-widest">
                            Global Coverage Active
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid gap-4 mb-12">
                        {services.map((service, idx) => (
                            <motion.div 
                                key={service.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between hover:border-blue-500 transition-all group"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                        <Server className="text-slate-400 w-5 h-5 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 tracking-tight">{service.name}</h3>
                                        <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 tracking-widest uppercase">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                            <span>Operational</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-slate-900">{service.uptime}</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">30 Day Uptime</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Uptime Blocks (Visual) */}
                    <div className="bg-white border border-slate-200 rounded-[3rem] p-12 mb-12 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Uptime History</h2>
                            <div className="flex items-center space-x-4">
                                <span className="text-xs font-bold text-slate-400">90 Days Ago</span>
                                <div className="h-px w-24 bg-slate-100"></div>
                                <span className="text-xs font-bold text-slate-400">Today</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-30 md:grid-cols-60 gap-1 h-12">
                            {Array.from({ length: 60 }).map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`w-full h-full rounded-sm hover:scale-125 transition-transform cursor-help ${i === 42 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                                    title={i === 42 ? 'Minor Latency Impact' : '100% Uptime'}
                                ></div>
                            ))}
                        </div>
                        <div className="mt-8 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            <div className="flex items-center space-x-2">
                                <Clock size={12} />
                                <span>No major incidents reported</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1.5"><div className="w-2 h-2 rounded-full bg-emerald-400"></div><span>Stable</span></div>
                                <div className="flex items-center space-x-1.5"><div className="w-2 h-2 rounded-full bg-amber-400"></div><span>Issue</span></div>
                                <div className="flex items-center space-x-1.5"><div className="w-2 h-2 rounded-full bg-rose-400"></div><span>Down</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Infrastructure Details */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                            <ShieldCheck className="absolute top-0 right-0 w-48 h-48 text-white/10 -mr-12 -mt-12" />
                            <h3 className="text-2xl font-black mb-4 tracking-tight">PCI DSS L1 Compliant</h3>
                            <p className="text-indigo-100 font-medium leading-relaxed mb-6">Our entire payment processing pipeline is certified to the highest security standards available.</p>
                            <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-xs font-bold uppercase tracking-widest border border-white/20">View Compliance</button>
                        </div>
                        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                            <Monitor className="absolute top-0 right-0 w-48 h-48 text-white/10 -mr-12 -mt-12" />
                            <h3 className="text-2xl font-black mb-4 tracking-tight">Global Edge Network</h3>
                            <p className="text-slate-400 font-medium leading-relaxed mb-6">Traffic is automatically routed through one of our 24 regional data centers for minimum latency.</p>
                            <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-xs font-bold uppercase tracking-widest border border-white/20">Network Stats</button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default StatusPage;
