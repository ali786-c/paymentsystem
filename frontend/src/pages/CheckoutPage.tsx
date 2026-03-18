import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    ShieldCheck, CreditCard, Wallet, ArrowRight, Loader2, 
    Lock, HelpCircle, Check, Zap
} from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export default function CheckoutPage() {
    const { invoiceId } = useParams();
    const [invoice, setInvoice] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedGateway, setSelectedGateway] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (invoiceId) {
            fetchInvoice();
        }
    }, [invoiceId]);

    const fetchInvoice = async () => {
        try {
            // Using a relative path to avoid CORS issues in local environments
            const base = API_BASE_URL.startsWith('http') ? API_BASE_URL : window.location.origin + API_BASE_URL;
            const response = await axios.get(`${base}/payment/status/${invoiceId}/data`);
            setInvoice(response.data.invoice);
        } catch (error) {
            console.error("Failed to fetch invoice", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePay = async () => {
        if (!selectedGateway) return;
        setProcessing(true);
        try {
            const base = API_BASE_URL.startsWith('http') ? API_BASE_URL : window.location.origin + API_BASE_URL;
            const response = await axios.post(`${base}/payment/process`, {
                invoice_id: invoiceId,
                gateway: selectedGateway
            });
            
            if (response.data.redirect_url) {
                window.location.href = response.data.redirect_url;
            }
        } catch (error) {
            console.error("Payment failed", error);
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc] space-y-6">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin shadow-sm" />
                    <Lock className="w-8 h-8 text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="text-center">
                    <p className="text-slate-900 font-black text-xl tracking-tight">Securing Connection...</p>
                    <p className="text-slate-400 text-sm mt-1 font-medium">Establishing encrypted payment tunnel</p>
                </div>
            </div>
        );
    }

    // Success Screen for Paid Invoices
    if (invoice && invoice.status === 'paid') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc] text-center p-6">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border border-emerald-100 shadow-sm animate-pulse">
                    <Check className="w-12 h-12 text-emerald-500" />
                </div>
                <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">Payment Successful</h1>
                <p className="text-slate-500 max-w-sm font-medium">Thank you! Your order <b>#{invoice.external_order_id}</b> has been processed successfully.</p>
                <div className="mt-8 px-6 py-3 bg-white rounded-2xl border border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
                    TRANSACTION ID: {invoice.id}-{Date.now()}
                </div>
            </div>
        );
    }

    if (!invoice || invoice.status === 'expired' || invoice.status === 'failed') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc] text-center p-6">
                <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6 border border-rose-100">
                    <HelpCircle className="w-12 h-12 text-rose-500" />
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Session Expired</h1>
                <p className="text-slate-500 max-w-sm font-medium">This secure payment link is no longer valid or the order has been cancelled.</p>
                <button 
                   onClick={() => window.location.reload()}
                   className="mt-8 px-8 py-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-widest text-slate-600 shadow-sm"
                >
                    Try Again
                </button>
            </div>
        );
    }

    const gateways = [
        { id: 'stripe', name: 'Credit / Debit Card', desc: 'Secure checkout via Stripe', icon: <CreditCard />, color: 'from-blue-600 to-indigo-600' },
        { id: 'cryptomus', name: 'Cryptocurrency', desc: 'BTC, ETH, USDT & More', icon: <Wallet />, color: 'from-slate-700 to-slate-900' },
        { id: 'cardlink', name: 'Cardlink Global', desc: 'International priority card processing', icon: <Zap />, color: 'from-blue-400 to-blue-600' },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-blue-500/10 overflow-x-hidden relative">
            {/* Background Effects */}
            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] -z-10 rounded-full animate-pulse" />
            <div className="fixed bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/5 blur-[150px] -z-10 rounded-full" />

            <div className="max-w-6xl mx-auto px-6 py-12 lg:py-24">
                {/* Brand Header */}
                <div className="flex items-center justify-between mb-16">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center shadow-sm">
                           <ShieldCheck className="text-blue-600 w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 leading-none">UpgraderCX</p>
                            <h2 className="text-lg font-black tracking-tight mt-0.5 text-slate-900">PAYHUB SECURE</h2>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center space-x-2 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full shadow-sm">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">PCI-DSS Compliant</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-start">
                    
                    {/* Left Side: Order Detail */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95]">
                                Secure Checkout<br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Finalize Order
                                </span>
                            </h1>
                            <p className="text-slate-500 text-lg max-w-md leading-relaxed font-medium">
                                Please review your order details and select your preferred payment gateway to complete the transaction.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">Order Reference</span>
                                        <span className="text-slate-900 font-mono font-bold">#{invoice.external_order_id}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">Merchant Portal</span>
                                        <span className="text-slate-900 font-black">{invoice.merchant.name}</span>
                                    </div>
                                    <div className="h-px bg-slate-100" />
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Total Outstanding</span>
                                            <p className="text-5xl font-black text-slate-900 mt-1 leading-none tracking-tighter">
                                                {invoice.currency} {invoice.amount}
                                            </p>
                                        </div>
                                        <div className="bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                                            <span className="text-[10px] font-black text-blue-600 uppercase">Guaranteed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6 px-4">
                               <Feature icon={<Check size={14}/>} label="Instant confirmation" />
                               <Feature icon={<Check size={14}/>} label="End-to-end encryption" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Payment Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white border border-slate-200 p-10 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] relative overflow-hidden"
                    >
                         {/* Decorative inside */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-xl font-black tracking-tight text-slate-900">PAYMENT METHOD</h3>
                                <Lock className="w-4 h-4 text-slate-200" />
                            </div>

                            <div className="space-y-4 mb-10">
                                {gateways.map((gw) => (
                                    <label
                                        key={gw.id}
                                        className={`group relative block cursor-pointer transition-all duration-500 ${selectedGateway === gw.id ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
                                    >
                                        <input 
                                            type="radio" 
                                            name="gateway" 
                                            className="sr-only" 
                                            onClick={() => setSelectedGateway(gw.id)}
                                        />
                                        <div className={`flex items-center justify-between p-6 rounded-3xl border transition-all duration-500 ${
                                            selectedGateway === gw.id 
                                            ? 'bg-blue-50 border-blue-500 shadow-[0_10px_30px_rgba(59,130,246,0.08)]' 
                                            : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                                        }`}>
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                                    selectedGateway === gw.id 
                                                    ? `bg-slate-900 text-white shadow-xl` 
                                                    : 'bg-white border border-slate-200 text-slate-400 group-hover:text-slate-900 group-hover:border-slate-300 shadow-sm'
                                                }`}>
                                                    {gw.icon}
                                                </div>
                                                <div className="text-left">
                                                    <p className={`font-black tracking-tight ${selectedGateway === gw.id ? 'text-slate-900' : 'text-slate-600'}`}>
                                                        {gw.name}
                                                    </p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                                        {gw.desc}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                                                selectedGateway === gw.id ? 'border-blue-500 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'border-slate-200 group-hover:border-slate-300'
                                            }`}>
                                                {selectedGateway === gw.id && <Check className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <button
                                disabled={!selectedGateway || processing}
                                onClick={handlePay}
                                className={`w-full py-6 rounded-[2rem] font-black text-xl tracking-tight transition-all relative overflow-hidden group/btn flex items-center justify-center space-x-3 shadow-2xl shadow-slate-900/10 active:scale-95 ${
                                    !selectedGateway || processing
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                                    : 'bg-slate-900 text-white hover:bg-slate-800'
                                }`}
                            >
                                {processing ? (
                                    <Loader2 className="w-7 h-7 animate-spin" />
                                ) : (
                                    <>
                                        <span className="relative z-10 uppercase tracking-widest text-sm">COMPLETE PAYMENT</span>
                                        <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                        {selectedGateway && (
                                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] pointer-events-none" />
                                        )}
                                    </>
                                )}
                            </button>
                            
                            <p className="text-center mt-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] flex items-center justify-center space-x-2">
                                <Lock className="w-3 h-3" />
                                <span>256-bit AES Encrypted Session</span>
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Security Icons */}
                <div className="mt-24 border-t border-slate-200 pt-12 flex flex-wrap justify-center items-center gap-12 opacity-30 hover:opacity-100 transition-all duration-1000">
                     <span className="text-sm font-black tracking-widest uppercase text-slate-400">Verified by VISA</span>
                     <span className="text-sm font-black tracking-widest uppercase text-slate-400">Mastercard ID Check</span>
                     <span className="text-sm font-black tracking-widest uppercase text-slate-400">STRIKE SECURE</span>
                     <span className="text-sm font-black tracking-widest uppercase text-slate-400">CRYPTOMUS ARMORED</span>
                </div>
            </div>
        </div>
    );
}

function Feature({ icon, label }: any) {
    return (
        <div className="flex items-center space-x-2 text-gray-500">
            <div className="bg-blue-600/20 p-1 rounded-md text-blue-500">
                {icon}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">{label}</span>
        </div>
    );
}
