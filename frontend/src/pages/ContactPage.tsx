import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { Mail, ShieldCheck } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-8">Get in touch with our experts.</h1>
              <p className="text-xl text-slate-600 font-medium leading-relaxed mb-12">
                Have questions about LinkPayPro or interested in a custom enterprise plan? We're here to help you optimize your payments.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6 p-6 bg-slate-50 border border-slate-100 rounded-3xl">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <Mail className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Email Support</h4>
                    <p className="text-slate-500 font-medium">support@linkpaypro.online</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 p-6 bg-slate-50 border border-slate-100 rounded-3xl">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <ShieldCheck className="text-emerald-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Global Compliance</h4>
                    <p className="text-slate-500 font-medium">PCI DSS Level 1 Certified</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[40px] p-10 shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">First Name</label>
                    <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Last Name</label>
                    <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Work Email</label>
                  <input type="email" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Inquiry</label>
                  <textarea rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500"></textarea>
                </div>
                <button className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
