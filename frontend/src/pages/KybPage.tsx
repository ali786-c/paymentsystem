import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { motion } from 'framer-motion';
import { FileText, Building2, UserCheck, ArrowRight, CheckCircle } from 'lucide-react';

const KybPage: React.FC = () => {
    const steps = [
        {
            title: 'Business Information',
            desc: 'Company name, registration number, and taxID.',
            icon: <Building2 className="text-blue-600" />
        },
        {
            title: 'Ownership Details',
            desc: 'Verification for Ultimate Beneficial Owners (UBO).',
            icon: <UserCheck className="text-emerald-600" />
        },
        {
            title: 'License & Docs',
            desc: 'Articles of association and operating licenses.',
            icon: <FileText className="text-amber-600" />
        }
    ];

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-500/10">
            <Navbar />
            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* KYB Hero */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full mb-6">
                                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-600">Enterprise Verified</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-none mb-8">
                                Secure <span className="text-blue-600">KYB</span> Onboarding
                            </h1>
                            <p className="text-xl text-slate-500 font-medium mb-12 leading-relaxed">
                                Our automated verification engine ensures your business is onboarded safely and compliantly within minutes, not days.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <button className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center space-x-3 group">
                                    <span>Start Verification</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 rounded-[2rem] font-black border border-slate-200 hover:bg-slate-50 transition-all">
                                    Talk to Sales
                                </button>
                            </div>
                        </motion.div>
                        
                        <div className="relative">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-200 shadow-2xl relative z-10"
                            >
                                <h3 className="text-2xl font-black mb-8 text-slate-900 tracking-tight">Onboarding Timeline</h3>
                                <div className="space-y-12 relative before:absolute before:left-6 before:top-2 before:bottom-0 before:w-px before:bg-slate-100">
                                    {steps.map((step, idx) => (
                                        <div key={idx} className="relative z-10 flex items-start space-x-6">
                                            <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                                                {step.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-black text-slate-900 tracking-tight">{step.title}</h4>
                                                <p className="text-slate-500 font-medium text-sm mt-1">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                            <div className="absolute -bottom-6 -right-6 w-full h-full bg-blue-600/5 rounded-[3rem] -z-10 blur-2xl"></div>
                        </div>
                    </div>

                    {/* Requirements Section */}
                    <div className="bg-slate-900 text-white rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 blur-[150px] -mr-96 -mt-96"></div>
                        <div className="relative z-10">
                            <div className="grid lg:grid-cols-[1fr_2fr] gap-20">
                                <div>
                                    <h2 className="text-4xl font-black mb-6 tracking-tight">Compliance at Scale</h2>
                                    <p className="text-slate-400 font-medium leading-relaxed mb-8">
                                        We support 150+ jurisdictions with localized KYC/KYB flow that adapts to your target market's specific regulations.
                                    </p>
                                    <ul className="space-y-4">
                                        {['ISO 27001 Certified', 'SOC Type II Compliant', 'GDPR Data Processing'].map(item => (
                                            <li key={item} className="flex items-center space-x-3 text-sm font-black uppercase tracking-widest text-emerald-400">
                                                <CheckCircle size={16} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-colors group">
                                        <h4 className="text-xl font-bold mb-4 flex items-center space-x-3">
                                            <span className="w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center text-xs">01</span>
                                            <span>Document OCR</span>
                                        </h4>
                                        <p className="text-slate-400 font-medium text-sm leading-relaxed">Automated text extraction from government IDs and commercial registers with 99.8% accuracy.</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-colors group">
                                        <h4 className="text-xl font-bold mb-4 flex items-center space-x-3">
                                            <span className="w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center text-xs">02</span>
                                            <span>UBO Discovery</span>
                                        </h4>
                                        <p className="text-slate-400 font-medium text-sm leading-relaxed">Real-time connection to business registries across Europe, Asia, and the Americas.</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-colors group">
                                        <h4 className="text-xl font-bold mb-4 flex items-center space-x-3">
                                            <span className="w-8 h-8 bg-amber-500/20 text-amber-400 rounded-lg flex items-center justify-center text-xs">03</span>
                                            <span>AML Screening</span>
                                        </h4>
                                        <p className="text-slate-400 font-medium text-sm leading-relaxed">Continuous screening against 1,000+ global sanction and PEP lists updated hourly.</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-colors group">
                                        <h4 className="text-xl font-bold mb-4 flex items-center space-x-3">
                                            <span className="w-8 h-8 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center text-xs">04</span>
                                            <span>Audit Trail</span>
                                        </h4>
                                        <p className="text-slate-400 font-medium text-sm leading-relaxed">Comprehensive immutable logs for each verification step, ready for regulatory review.</p>
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

export default KybPage;
