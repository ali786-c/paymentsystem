import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Users, CreditCard, Plus, Trash2, Key, Settings, LogOut, 
    TrendingUp, Activity, DollarSign, ExternalLink, 
    ChevronRight, Search, Filter, RefreshCw, Layers,
    Eye, EyeOff, Copy, Check
} from 'lucide-react';
import axios from 'axios';
import ConfigModal from '../components/modals/ConfigModal';

import { API_BASE_URL } from '../apiConfig';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('merchants');
    const [merchants, setMerchants] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Modal State
    const [selectedMerchant, setSelectedMerchant] = useState<any>(null);
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [isAddMerchantOpen, setIsAddMerchantOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const getHeaders = () => {
        const token = localStorage.getItem('hub_token');
        return {
            'Authorization': `Bearer ${token}`
        };
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${API_BASE_URL}/logout`, {}, { headers: getHeaders() });
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            localStorage.removeItem('hub_token');
            localStorage.removeItem('hub_user');
            window.location.href = '/login';
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const config = { headers: getHeaders() };
            if (activeTab === 'merchants') {
                const res = await axios.get(`${API_BASE_URL}/admin/merchants`, config);
                setMerchants(res.data);
            } else {
                const res = await axios.get(`${API_BASE_URL}/admin/transactions`, config);
                setTransactions(res.data);
            }
        } catch (error: any) {
            console.error("Dashboard Fetch Error", error);
            if (error.response?.status === 401) {
                localStorage.removeItem('hub_token');
                window.location.href = '/login';
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAddMerchant = async (data: any) => {
        try {
            const config = { headers: getHeaders() };
            await axios.post(`${API_BASE_URL}/admin/merchants`, data, config);
            fetchData();
            setIsAddMerchantOpen(false);
        } catch (error) {
            console.error("Add Merchant Error", error);
            alert("Failed to add merchant. Check console for details.");
        }
    };

    return (
        <div className="flex h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-500/10">
            {/* Left Sidebar - Premium Vertical Nav */}
            <aside className="w-72 bg-white border-r border-slate-200 flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <div className="p-8 pb-4">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                            <Layers className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-lg font-black tracking-tight leading-none text-slate-900">PAYHUB</h1>
                            <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Control Center</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1 mt-4">
                    <NavItem 
                        active={activeTab === 'merchants'} 
                        icon={<Users size={20} />} 
                        label="Merchants" 
                        onClick={() => setActiveTab('merchants')} 
                    />
                    <NavItem 
                        active={activeTab === 'transactions'} 
                        icon={<CreditCard size={20} />} 
                        label="Transactions" 
                        onClick={() => setActiveTab('transactions')} 
                    />
                    <div className="pt-6 pb-2 px-4">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Settings</span>
                    </div>
                    <NavItem 
                        icon={<Settings size={20} />} 
                        label="Global Payments" 
                        onClick={() => {
                            setSelectedMerchant({ id: 'global', name: 'Hub Defaults' });
                            setIsConfigOpen(true);
                        }}
                    />
                    <NavItem icon={<Key size={20} />} label="Security" />
                </nav>

                <div className="p-6">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all duration-300 font-bold border border-transparent hover:border-rose-100"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
                {/* Background Blobs - Softer for Light Mode */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] -z-10 rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] -z-10 rounded-full" />

                <div className="max-w-7xl mx-auto p-10 pt-12">
                    {/* Header Section */}
                    <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <div className="flex items-center space-x-2 text-blue-600 mb-2">
                                <Activity className="w-4 h-4" />
                                <span className="text-[11px] font-black uppercase tracking-widest">Platform Overview</span>
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                                {activeTab === 'merchants' ? 'Merchant Network' : 'Global Transactions'}
                            </h2>
                            <p className="text-slate-500 mt-2 text-sm max-w-md font-medium">
                                {activeTab === 'merchants' 
                                    ? 'Onboard and manage authorized merchant stores and their API configurations.' 
                                    : 'Monitor real-time payment flow across all integrated gateways and merchants.'}
                            </p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <button 
                                onClick={() => fetchData()}
                                className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-900 shadow-sm"
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                            {activeTab === 'merchants' && (
                                <button 
                                    onClick={() => setIsAddMerchantOpen(true)}
                                    className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 px-6 py-3 rounded-2xl font-black text-sm text-white transition-all shadow-xl shadow-slate-900/10 active:scale-95 group"
                                >
                                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                                    <span>NEW MERCHANT</span>
                                </button>
                            )}
                        </div>
                    </header>

                    {/* Quick Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <StatCard icon={<TrendingUp className="text-emerald-600" />} label="Avg. Order Value" value="$142.50" trend="+12.5%" />
                        <StatCard icon={<Users className="text-blue-600" />} label="Active Stores" value="24" trend="System OK" />
                        <StatCard icon={<DollarSign className="text-indigo-600" />} label="Today Volume" value="$3,120" trend="+8.2%" />
                    </div>

                    {/* Content Table Container */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.03)]"
                    >
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-sm tracking-wide text-slate-900">
                                {activeTab === 'merchants' ? 'Total Merchants' : 'Transaction History'}
                            </h3>
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Search..." 
                                        className="bg-white border border-slate-200 rounded-xl py-1.5 pl-10 pr-4 text-xs focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all w-48 font-medium text-slate-900"
                                    />
                                </div>
                                <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all">
                                    <Filter className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'merchants' ? (
                                    <MerchantList 
                                        items={merchants} 
                                        loading={loading} 
                                        onConfigure={(m) => {
                                            setSelectedMerchant(m);
                                            setIsConfigOpen(true);
                                        }}
                                    />
                                ) : (
                                    <TransactionList items={transactions} loading={loading} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </main>

            <ConfigModal 
                isOpen={isConfigOpen} 
                onClose={() => setIsConfigOpen(false)} 
                merchant={selectedMerchant} 
            />

            <AddMerchantModal 
                isOpen={isAddMerchantOpen} 
                onClose={() => setIsAddMerchantOpen(false)} 
                onAdd={handleAddMerchant} 
            />
        </div>
    );
}

function NavItem({ active = false, icon, label, onClick }: any) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group mt-1 ${
                active 
                ? 'bg-blue-600/10 text-blue-600 border border-blue-600/10 shadow-sm shadow-blue-600/5' 
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
            }`}
        >
            <div className="flex items-center space-x-4">
                <span className={`transition-transform duration-300 group-hover:scale-110 ${active ? 'text-blue-600' : 'text-slate-300'}`}>
                    {icon}
                </span>
                <span className={`font-bold text-sm tracking-tight capitalize ${active ? 'text-slate-900' : ''}`}>{label}</span>
            </div>
            {active && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]" />}
        </button>
    );
}

function StatCard({ icon, label, value, trend }: any) {
    return (
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 hover:border-blue-500/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 group">
            <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-500 border border-slate-100 group-hover:border-blue-100">
                    {icon}
                </div>
                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg ${trend.includes('+') ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'}`}>
                    {trend}
                </span>
            </div>
            <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">{label}</h4>
            <p className="text-3xl font-black text-slate-900">{value}</p>
        </div>
    );
}

function MerchantList({ items, loading, onConfigure }: { items: any[], loading: boolean, onConfigure: (m: any) => void }) {
    if (loading) return <LoadingSkeleton />;
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-50/30">
                    <tr>
                        <th className="px-10 py-5">Merchant Name</th>
                        <th className="px-10 py-5">Integration ID</th>
                        <th className="px-10 py-5">API Secret</th>
                        <th className="px-10 py-5">Webhook</th>
                        <th className="px-10 py-5">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {!Array.isArray(items) || items.length === 0 ? (
                       <tr><td colSpan={4} className="p-20 text-center text-slate-400 font-medium italic">No merchants active on hub...</td></tr>
                    ) : items.map((merchant: any) => (
                        <tr key={merchant.id} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="px-10 py-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                                    <span className="font-black text-slate-700">{merchant.name}</span>
                                </div>
                            </td>
                            <td className="px-10 py-6">
                                <div className="flex items-center space-x-2">
                                    <code className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-blue-600/80 font-mono">
                                        {merchant.client_id}
                                    </code>
                                    <CopyBtn value={merchant.client_id} />
                                </div>
                            </td>
                            <td className="px-10 py-6">
                                <SecretField value={merchant.client_secret} />
                            </td>
                            <td className="px-10 py-6">
                                <span className="flex items-center space-x-2 text-xs text-slate-400 group-hover:text-slate-600 font-medium">
                                    <span className="truncate max-w-[120px]">{merchant.webhook_url || 'N/A'}</span>
                                    {merchant.webhook_url && <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                </span>
                            </td>
                            <td className="px-10 py-6 text-right">
                                <div className="flex justify-end space-x-2">
                                    <button 
                                        onClick={() => onConfigure(merchant)}
                                        className="p-2.5 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm text-slate-400 hover:text-slate-900 transition-all"
                                    >
                                        <Settings className="w-4 h-4" />
                                    </button>
                                    <button className="p-2.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all border border-transparent hover:border-rose-100"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function TransactionList({ items, loading }: { items: any[], loading: boolean }) {
    if (loading) return <LoadingSkeleton />;
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-50/30">
                    <tr>
                        <th className="px-10 py-5">Source Portal</th>
                        <th className="px-10 py-5">Order Reference</th>
                        <th className="px-10 py-5">Net Amount</th>
                        <th className="px-10 py-5">Payment Flow</th>
                        <th className="px-10 py-5">System State</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {!Array.isArray(items) || items.length === 0 ? (
                       <tr><td colSpan={5} className="p-20 text-center text-slate-400 font-medium italic">No financial data detected...</td></tr>
                    ) : items.map((tx: any) => (
                        <tr key={tx.id} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="px-10 py-6">
                                <span className="font-black text-slate-700">{tx.merchant?.name}</span>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{new Date(tx.created_at).toLocaleDateString()}</p>
                            </td>
                            <td className="px-10 py-6">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-slate-400 font-mono">#{tx.external_order_id}</span>
                                    <ChevronRight className="w-3 h-3 text-slate-300" />
                                </div>
                            </td>
                            <td className="px-10 py-6">
                                <span className="text-lg font-black text-slate-900">{tx.currency} {tx.amount}</span>
                            </td>
                            <td className="px-10 py-6">
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center">
                                        <Activity className="w-3 h-3 text-blue-600" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
                                        {tx.payment_method || 'PENDING'}
                                    </span>
                                </div>
                            </td>
                            <td className="px-10 py-6">
                                <span className={`px-4 py-1.5 rounded-full font-black uppercase tracking-tighter text-[9px] border inline-flex items-center space-x-1.5 ${
                                    tx.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                    tx.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                    'bg-rose-50 text-rose-600 border-rose-100'
                                }`}>
                                    <div className={`w-1 h-1 rounded-full ${tx.status === 'paid' ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'bg-current'}`} />
                                    <span>{tx.status}</span>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function AddMerchantModal({ isOpen, onClose, onAdd }: any) {
    const [name, setName] = useState('');
    const [webhookUrl, setWebhookUrl] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        await onAdd({ name, webhook_url: webhookUrl });
        setLoading(false);
        setName('');
        setWebhookUrl('');
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200"
                >
                    <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-black text-slate-900">Add New Merchant</h3>
                                <p className="text-slate-500 text-xs mt-1 font-bold uppercase tracking-wider">Store Integration</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100"><TrendingUp className="w-5 h-5 rotate-45" /></button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Merchant Name</label>
                            <input 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Amazon Store"
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-bold placeholder:text-slate-300"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Webhook URL (Optional)</label>
                            <input 
                                type="url"
                                value={webhookUrl}
                                onChange={(e) => setWebhookUrl(e.target.value)}
                                placeholder="https://api.yourstore.com/webhook"
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-bold placeholder:text-slate-300"
                            />
                        </div>

                        <button 
                            disabled={loading}
                            type="submit"
                            className="w-full bg-slate-900 border border-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-black text-sm tracking-tight transition-all shadow-xl shadow-slate-900/10 active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2"
                        >
                            {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
                            <span>{loading ? 'CREATING...' : 'ADD MERCHANT'}</span>
                        </button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

function CopyBtn({ value }: { value: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button 
            onClick={handleCopy}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-all"
        >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
    );
}

function SecretField({ value }: { value: string }) {
    const [show, setShow] = useState(false);

    return (
        <div className="flex items-center space-x-2">
            <code className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-600 font-mono min-w-[100px]">
                {show ? value : '••••••••••••••••'}
            </code>
            <button 
                onClick={() => setShow(!show)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-all"
            >
                {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
            <CopyBtn value={value} />
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="p-16 space-y-6">
            <div className="h-12 bg-slate-50 rounded-2xl animate-pulse w-full border border-slate-100" />
            <div className="h-12 bg-slate-50 rounded-2xl animate-pulse w-full border border-slate-100" />
            <div className="h-12 bg-slate-50 rounded-2xl animate-pulse w-full border border-slate-100" />
        </div>
    );
}
