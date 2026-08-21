import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { Search, BookOpen, Shield, Globe, CreditCard, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const DocsPage: React.FC = () => {
    const categories = [
        {
            title: 'Getting Started',
            icon: <BookOpen className="text-blue-500" />,
            links: ['Introduction', 'Quickstart Guide', 'Architecture Overview', 'Environment Setup']
        },
        {
            title: 'Payments',
            icon: <CreditCard className="text-emerald-500" />,
            links: ['Creating Sessions', 'Payment Links', 'One-click Checkout', 'Global Routing']
        },
        {
            title: 'Security',
            icon: <Shield className="text-indigo-500" />,
            links: ['API Authentication', 'Webhooks & Signing', 'PCI Compliance', 'Risk Management']
        },
        {
            title: 'Operations',
            icon: <Globe className="text-amber-500" />,
            links: ['Dashboard Guide', 'Settlements', 'Refunds & Disputes', 'Inventory Sync']
        }
    ];

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-500/10">
            <Navbar />
            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header with Search */}
                    <div className="max-w-3xl mx-auto text-center mb-20">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-8"
                        >
                            Documentation
                        </motion.h1>
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search the knowledge base..." 
                                className="w-full bg-white border border-slate-200 rounded-[2rem] py-6 pl-14 pr-8 text-slate-900 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-medium"
                            />
                        </div>
                    </div>

                    {/* Grid Categories */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((cat, idx) => (
                            <motion.div 
                                key={cat.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                                    {cat.icon}
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight uppercase text-xs tracking-[0.2em]">{cat.title}</h3>
                                <ul className="space-y-4">
                                    {cat.links.map(link => (
                                        <li key={link}>
                                            <a href="#" className="text-slate-500 font-medium hover:text-blue-600 transition-colors flex items-center justify-between group">
                                                <span>{link}</span>
                                                <Activity size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Help Section */}
                    <div className="mt-24 bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full -mr-64 -mt-64"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Can't find what you're looking for?</h2>
                            <p className="text-blue-100 text-lg font-medium mb-10 max-w-xl mx-auto">
                                Our support team is available 24/7 to help you with any technical implementation or account questions.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <button className="w-full sm:w-auto px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-colors">
                                    Contact Support
                                </button>
                                <button className="w-full sm:w-auto px-10 py-4 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-400 transition-colors border border-blue-400">
                                    Join Community
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DocsPage;
