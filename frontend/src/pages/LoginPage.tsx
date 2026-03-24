import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Lock, Mail, Loader2, 
    ArrowRight, Zap, Globe, Layers, AlertTriangle
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { API_BASE_URL } from '../apiConfig';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                email,
                password,
                device_name: 'webapp'
            });

            if (response.data.success) {
                localStorage.setItem('hub_token', response.data.token);
                localStorage.setItem('hub_user', JSON.stringify(response.data.user));
                navigate('/admin');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background Aesthetic Blobs - Softer for Light Mode */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/10 blur-[120px] rounded-full animate-pulse" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-lg z-10"
            >
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-[0_20px_40px_rgba(37,99,235,0.25)] mb-6 transform rotate-12">
                        <Layers className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">LINKPAYPRO</h1>
                    <div className="flex items-center space-x-2">
                        <div className="h-[1px] w-4 bg-slate-300" />
                        <span className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase">Control Center</span>
                        <div className="h-[1px] w-4 bg-slate-300" />
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-white border border-slate-200/60 rounded-[3rem] p-12 shadow-[0_40px_80px_rgba(0,0,0,0.06)] backdrop-blur-sm relative mb-8">
                    <div className="mb-10 text-center">
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Admin Authorization</h2>
                        <p className="text-slate-400 text-sm font-medium">Verify your identity to access the hub.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-5">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    System Identifier
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input 
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@linkpaypro.com"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-14 pr-6 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    Security Key
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input 
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-14 pr-6 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center space-x-2 text-rose-500 text-xs font-bold uppercase tracking-widest bg-rose-50/50 p-4 rounded-2xl border border-rose-100"
                            >
                                <AlertTriangle size={14} />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full group relative flex items-center justify-center space-x-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl py-4 font-black text-sm tracking-widest transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>AUTHORIZE ACCESS</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Security Icons */}
                <div className="flex items-center justify-center space-x-8 opacity-40">
                    <div className="flex items-center space-x-2">
                        <Zap size={14} className="text-blue-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Quantum Guard</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Globe size={14} className="text-indigo-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Cloud Shield</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
