import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { motion } from 'framer-motion';
import { Code2, Terminal, Cpu, Zap, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const DevelopersPage: React.FC = () => {
    const [copied, setCopied] = useState(false);

    const codeSnippet = `
// Initialize LinkPayPro SDK
const lpp = new LinkPayPro({
  apiKey: 'lpp_prod_5928...',
  merchantId: 'merch_721'
});

// Create a unified payment session
const session = await lpp.sessions.create({
  amount: 2500,
  currency: 'USD',
  metadata: { orderId: 'ord_992' }
});

// Redirect to secure checkout
window.location.href = session.url;`;

    const handleCopy = () => {
        navigator.clipboard.writeText(codeSnippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-500/10">
            <Navbar />
            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Hero Header */}
                    <div className="text-center mb-20">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-6"
                        >
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-blue-600">Developer First Interface</span>
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-none mb-6">
                            Built for <span className="text-blue-600">Builders</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                            Integrate global payment orchestration with a single API. Modern SDKs, comprehensive docs, and real-time testing tools.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
                        {/* Features Column */}
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Zap className="text-blue-600 w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">One Integration</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    Connect to 50+ payment gateways through a single API. No more siloed integrations or complex maintenance.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Terminal className="text-indigo-600 w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Modern SDKs</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    Native SDKs for Node.js, Python, Go, and Ruby. Type-safe, asynchronous, and battle-tested for high-performance scale.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Cpu className="text-emerald-600 w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Smart Webhooks</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    Receive real-time event notifications with automatic retries, signature verification, and granular filtering.
                                </p>
                            </div>
                        </div>

                        {/* Interactive Code Column */}
                        <div className="sticky top-32">
                            <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl relative">
                                <div className="flex items-center justify-between px-8 py-6 bg-slate-800/50 border-b border-white/5">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex space-x-1.5">
                                            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                                            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                                        </div>
                                        <div className="h-4 w-px bg-white/10 mx-2"></div>
                                        <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">index.js</span>
                                    </div>
                                    <button 
                                        onClick={handleCopy}
                                        className="text-slate-400 hover:text-white transition-colors flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"
                                    >
                                        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                        <span className="text-[10px] uppercase font-bold">{copied ? 'Copied' : 'Copy'}</span>
                                    </button>
                                </div>
                                <div className="p-8 md:p-12 overflow-x-auto">
                                    <pre className="text-sm md:text-base font-mono leading-relaxed">
                                        <code className="text-blue-300">
                                            {codeSnippet}
                                        </code>
                                    </pre>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
                                <div className="px-8 pb-8 pt-0 flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    <span>v1.2.0-stable</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                        <span>Ready for Deployment</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="bg-white border border-slate-200 p-6 rounded-3xl flex items-center space-x-4">
                                    <div className="p-3 bg-slate-50 rounded-xl">
                                        <Code2 className="text-slate-900 w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SDK Downloads</p>
                                        <p className="text-xl font-black text-slate-900">420k+</p>
                                    </div>
                                </div>
                                <div className="bg-white border border-slate-200 p-6 rounded-3xl flex items-center space-x-4">
                                    <div className="p-3 bg-slate-50 rounded-xl">
                                        <Zap className="text-amber-500 w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">API Latency</p>
                                        <p className="text-xl font-black text-slate-900">140ms</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DevelopersPage;
