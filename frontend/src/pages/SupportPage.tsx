import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { motion } from 'framer-motion';
import { Search, Mail, Phone, ExternalLink, LifeBuoy } from 'lucide-react';

const SupportPage: React.FC = () => {
    const contactOptions = [
        {
            title: 'Help Center',
            desc: 'Search our knowledge base',
            icon: <LifeBuoy className="text-blue-600" />,
            action: 'Browse Docs',
            color: 'bg-blue-50'
        },
        {
            title: 'Email Support',
            desc: 'Get help within 24 hours',
            icon: <Mail className="text-emerald-600" />,
            action: 'Send Email',
            color: 'bg-emerald-50'
        },
        {
            title: 'Priority Phone',
            desc: 'For Enterprise customers',
            icon: <Phone className="text-amber-600" />,
            action: 'Call Now',
            color: 'bg-amber-50'
        }
    ];

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-500/10">
            <Navbar />
            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Hero Support */}
                    <div className="text-center mb-20">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/20"
                        >
                            <LifeBuoy className="text-white w-10 h-10" />
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-none mb-6">
                            How can we <span className="text-blue-600">help?</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium mb-12">
                            Our support experts are on standby to help you resolve any issues or answer your questions.
                        </p>
                        
                        <div className="max-w-2xl mx-auto relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search our help articles..." 
                                className="w-full bg-white border border-slate-200 rounded-3xl py-6 pl-14 pr-8 text-slate-900 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-medium"
                            />
                        </div>
                    </div>

                    {/* Contact Methods */}
                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {contactOptions.map((opt, idx) => (
                            <motion.div 
                                key={opt.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group text-center"
                            >
                                <div className={`w-16 h-16 ${opt.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                                    {opt.icon}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{opt.title}</h3>
                                <p className="text-slate-500 font-medium mb-8 uppercase text-[10px] tracking-widest">{opt.desc}</p>
                                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-colors flex items-center justify-center space-x-2">
                                    <span>{opt.action}</span>
                                    <ExternalLink size={14} className="text-slate-400" />
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* FAQ Quick Links */}
                    <div className="bg-white border border-slate-200 rounded-[3rem] p-12 md:p-20">
                        <h2 className="text-3xl font-black text-slate-900 mb-12 tracking-tight">Popular Support Topics</h2>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="flex items-start space-x-4 group cursor-pointer">
                                    <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center shrink-0 mt-1">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">How do I reset my secret API keys?</h4>
                                        <p className="text-slate-500 text-sm font-medium mt-1">Learn how to securely roll your production and test keys...</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SupportPage;
