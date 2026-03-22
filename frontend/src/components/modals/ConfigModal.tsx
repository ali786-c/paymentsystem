import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, Save, Loader2, ShieldCheck, 
    CreditCard, Bitcoin, Globe
} from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface ConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
    merchant: any;
}

export default function ConfigModal({ isOpen, onClose, merchant }: ConfigModalProps) {
    const [activeTab, setActiveTab] = useState('stripe');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Form states
    const [stripeData, setStripeData] = useState({
        publishable_key: '',
        secret_key: '',
        webhook_secret: '',
        is_active: true
    });

    const [nowpaymentsData, setNowpaymentsData] = useState({
        api_key: '',
        ipn_secret: '',
        is_active: true
    });

    const [cardlinkData, setCardlinkData] = useState({
        mid: '',
        shared_secret: '',
        is_active: true
    });

    useEffect(() => {
        if (isOpen && merchant) {
            fetchConfigs();
        }
    }, [isOpen, merchant]);

    const fetchConfigs = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('hub_token');
            const res = await axios.get(`${API_BASE_URL}/admin/merchants/${merchant.id}/configs`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            const data = res.data;
            const stripe = data.find((c: any) => c.gateway_name === 'stripe');
            if (stripe) {
                setStripeData({ ...stripe.config_data, is_active: stripe.is_active });
            }
            
            const nowpayments = data.find((c: any) => c.gateway_name === 'nowpayments');
            if (nowpayments) {
                setNowpaymentsData({ ...nowpayments.config_data, is_active: nowpayments.is_active });
            }

            const cardlink = data.find((c: any) => c.gateway_name === 'cardlink');
            if (cardlink) {
                setCardlinkData({ ...cardlink.config_data, is_active: cardlink.is_active });
            }
        } catch (err) {
            console.error("Config fetch error", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const token = localStorage.getItem('hub_token');
            await axios.post(`${API_BASE_URL}/admin/merchants/${merchant.id}/configs`, {
                configs: [
                    {
                        gateway_name: 'stripe',
                        config_data: {
                            publishable_key: stripeData.publishable_key,
                            secret_key: stripeData.secret_key,
                            webhook_secret: stripeData.webhook_secret
                        },
                        is_active: stripeData.is_active
                    },
                    {
                        gateway_name: 'nowpayments',
                        config_data: {
                            api_key: nowpaymentsData.api_key,
                            ipn_secret: nowpaymentsData.ipn_secret
                        },
                        is_active: nowpaymentsData.is_active
                    },
                    {
                        gateway_name: 'cardlink',
                        config_data: {
                            mid: cardlinkData.mid,
                            shared_secret: cardlinkData.shared_secret
                        },
                        is_active: cardlinkData.is_active
                    }
                ]
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setMessage({ type: 'success', text: 'Settings saved successfully!' });
            setTimeout(onClose, 1500);
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to save settings.' });
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-xl bg-white rounded-[2.5rem] border border-slate-200 shadow-[0_50px_100px_rgba(0,0,0,0.1)] overflow-hidden z-50 flex flex-col max-h-[90vh]"
            >
                {/* Modal Header */}
                <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <div className="flex items-center space-x-2 text-blue-600 mb-1">
                            <ShieldCheck size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                                {merchant?.id === 'global' ? 'System-Wide Configuration' : 'Merchant Configuration'}
                            </span>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                            {merchant?.id === 'global' ? 'Configure Hub Defaults' : `Manage ${merchant?.name}`}
                        </h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-10">
                    {/* Tab Navigation */}
                    <div className="flex space-x-2 mb-10 bg-slate-100 p-1.5 rounded-2xl">
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab('stripe')}
                            className={`flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-xl font-black text-xs tracking-widest transition-all ${
                                activeTab === 'stripe' 
                                ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            <CreditCard size={16} />
                            <span>STRIPE</span>
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab('nowpayments')}
                            className={`flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-xl font-black text-xs tracking-widest transition-all ${
                                activeTab === 'nowpayments' 
                                ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            <Bitcoin size={16} />
                            <span>NOWPAYMENTS</span>
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab('cardlink')}
                            className={`flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-xl font-black text-xs tracking-widest transition-all ${
                                activeTab === 'cardlink' 
                                ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            <Globe size={16} />
                            <span>CARDLINK</span>
                        </motion.button>
                    </div>

                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-20 space-y-4"
                            >
                                <div className="w-12 h-12 border-4 border-slate-100 border-t-blue-500 rounded-full animate-spin" />
                                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Retrieving Secure Config...</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="space-y-8"
                            >
                                {activeTab === 'stripe' ? (
                                    <div className="space-y-6">
                                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-[2rem] space-y-6">
                                            <Toggle 
                                                label="Enable Stripe Integration" 
                                                active={stripeData.is_active} 
                                                onChange={(val: boolean) => setStripeData({...stripeData, is_active: val})} 
                                            />
                                            <div className="grid grid-cols-1 gap-6">
                                                <Input 
                                                    label="Publishable Key" 
                                                    value={stripeData.publishable_key} 
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStripeData({...stripeData, publishable_key: e.target.value})}
                                                    placeholder="pk_test_..."
                                                />
                                                <Input 
                                                    label="Secret Key" 
                                                    type="password"
                                                    value={stripeData.secret_key} 
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStripeData({...stripeData, secret_key: e.target.value})}
                                                    placeholder="sk_test_..."
                                                />
                                                <Input 
                                                    label="Webhook Signing Secret" 
                                                    type="password"
                                                    value={stripeData.webhook_secret} 
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStripeData({...stripeData, webhook_secret: e.target.value})}
                                                    placeholder="whsec_..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : activeTab === 'nowpayments' ? (
                                    <div className="space-y-6">
                                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-[2rem] space-y-6">
                                            <Toggle 
                                                label="Enable NOWPayments Flow" 
                                                active={nowpaymentsData.is_active} 
                                                onChange={(val: boolean) => setNowpaymentsData({...nowpaymentsData, is_active: val})} 
                                            />
                                            <div className="grid grid-cols-1 gap-6">
                                                <Input 
                                                    label="API Key" 
                                                    value={nowpaymentsData.api_key} 
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNowpaymentsData({...nowpaymentsData, api_key: e.target.value})}
                                                    placeholder="••••••••"
                                                />
                                                <Input 
                                                    label="IPN Secret Key" 
                                                    type="password"
                                                    value={nowpaymentsData.ipn_secret} 
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNowpaymentsData({...nowpaymentsData, ipn_secret: e.target.value})}
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-[2rem] space-y-6">
                                            <Toggle 
                                                label="Enable Cardlink Integration" 
                                                active={cardlinkData.is_active} 
                                                onChange={(val: boolean) => setCardlinkData({...cardlinkData, is_active: val})} 
                                            />
                                            <div className="grid grid-cols-1 gap-6">
                                                <Input 
                                                    label="Merchant ID (MID)" 
                                                    value={cardlinkData.mid} 
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardlinkData({...cardlinkData, mid: e.target.value})}
                                                    placeholder="12345678"
                                                />
                                                <Input 
                                                    label="Shared Secret" 
                                                    type="password"
                                                    value={cardlinkData.shared_secret} 
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardlinkData({...cardlinkData, shared_secret: e.target.value})}
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Actions */}
                <div className="px-8 py-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <button 
                        onClick={onClose}
                        className="px-6 py-3.5 text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] transition-all"
                    >
                        Discard Changes
                    </button>
                    
                    <div className="flex items-center space-x-3">
                        {message && message.text && (
                            <span className={`text-[10px] font-black uppercase tracking-widest ${message.type === 'success' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {message.text}
                            </span>
                        )}
                        <button 
                            onClick={handleSave}
                            disabled={saving || loading}
                            className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-2xl font-black text-xs tracking-widest transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:scale-95 disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            <span>SAVE SETTINGS</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}


function Input({ label, type = "text", value, onChange, placeholder }: any) {
    return (
        <label className="block">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block">{label}</span>
            <input 
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete="new-password"
                data-lpignore="true"
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-mono text-sm"
            />
        </label>
    );
}

function Toggle({ label, active, onChange }: any) {
    return (
        <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-black text-slate-900 uppercase tracking-widest">{label}</span>
            <button 
                onClick={() => onChange(!active)}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${active ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
                <motion.div 
                    animate={{ x: active ? 26 : 4 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                />
            </button>
        </div>
    );
}
