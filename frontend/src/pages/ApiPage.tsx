import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { motion } from 'framer-motion';
import { Terminal, Send, Lock, Zap, Box, Key } from 'lucide-react';

const ApiPage: React.FC = () => {
    const endpoints = [
        { method: 'POST', path: '/v1/sessions', desc: 'Create a new payment session' },
        { method: 'GET', path: '/v1/sessions/:id', desc: 'Retrieve session details' },
        { method: 'POST', path: '/v1/refunds', desc: 'Initiate a full or partial refund' },
        { method: 'GET', path: '/v1/merchants', desc: 'List all connected merchants' }
    ];

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-500/10">
            <Navbar />
            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="mb-20">
                        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-6">
                            API Reference
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl font-medium">
                            Interact with the LinkPayPro platform via our RESTful JSON API. All requests are authenticated with secret keys.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
                        {/* Sidebar Endpoints */}
                        <div className="space-y-4 sticky top-32 h-fit">
                            <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-6">Core Endpoints</h5>
                            {endpoints.map((ep) => (
                                <button key={ep.path} className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-left hover:border-blue-500 transition-all group shadow-sm hover:shadow-md">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className={`text-[10px] font-black px-2 py-1 rounded-md ${ep.method === 'POST' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                            {ep.method}
                                        </span>
                                        <span className="text-sm font-mono text-slate-600 font-bold">{ep.path}</span>
                                    </div>
                                    <p className="text-xs text-slate-400 font-medium group-hover:text-slate-600 transition-colors">{ep.desc}</p>
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="space-y-12">
                            {/* Authentication Card */}
                            <section className="bg-white rounded-[3rem] p-12 border border-slate-200 shadow-sm">
                                <div className="flex items-center space-x-4 mb-8">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                                        <Key className="text-indigo-600 w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Authentication</h2>
                                </div>
                                <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                                    LinkPayPro uses API keys to authenticate requests. You can view and manage your keys in the Dashboard. All requests must be made over HTTPS.
                                </p>
                                <div className="bg-slate-900 rounded-3xl p-6 font-mono text-sm text-blue-300">
                                    <span className="text-slate-500"># Use Bearer Authentication</span><br />
                                    <span className="text-pink-400">Authorization:</span> Bearer lpp_test_51...
                                </div>
                            </section>

                            {/* Response Schema */}
                            <section className="bg-white rounded-[3rem] p-12 border border-slate-200 shadow-sm overflow-hidden">
                                <div className="flex items-center space-x-4 mb-8">
                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                                        <Box className="text-blue-600 w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Standard Response</h2>
                                </div>
                                <pre className="bg-slate-50 p-8 rounded-3xl text-sm md:text-base font-mono leading-relaxed text-slate-600">
                                    {`{
  "status": "success",
  "data": {
    "id": "ses_928104",
    "object": "session",
    "amount": 2999,
    "currency": "USD",
    "created": 1711289400
  }
}`}
                                </pre>
                            </section>

                            {/* Features Grid */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] flex items-start space-x-6">
                                    <div className="p-4 bg-rose-50 rounded-2xl">
                                        <Lock className="text-rose-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Encryption</h4>
                                        <p className="text-slate-500 font-medium leading-relaxed">AES-256 field-level encryption for sensitive payloads.</p>
                                    </div>
                                </div>
                                <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] flex items-start space-x-6">
                                    <div className="p-4 bg-emerald-50 rounded-2xl">
                                        <Zap className="text-emerald-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Low Latency</h4>
                                        <p className="text-slate-500 font-medium leading-relaxed">Globally distributed edge nodes for < 100ms API response.</p>
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

export default ApiPage;
