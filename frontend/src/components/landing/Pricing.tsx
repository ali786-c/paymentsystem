import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Starter",
      description: "For small businesses & startups.",
      price: "$49",
      features: ["Up to $10k/mo volume", "3 Payment Gateways", "Unified Dashboard", "Email Support"]
    },
    {
      name: "Pro",
      description: "For scaling platforms & SaaS.",
      price: "$199",
      recommended: true,
      features: ["Up to $100k/mo volume", "Unlimited Gateways", "Smart Routing Engine", "Priority Support", "Advanced Analytics"]
    },
    {
      name: "Enterprise",
      description: "Custom solutions for high volume.",
      price: "Custom",
      features: ["Unlimited Volume", "Custom Integrations", "Dedicated Account Manager", "SLAs & 24/7 Support", "White-label Options"]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 text-center">Pricing</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Simple, scalable pricing for every stage.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-10 rounded-[40px] flex flex-col transition-all ${
                plan.recommended 
                  ? 'bg-white shadow-[0_40px_100px_rgba(0,0,0,0.08)] border-2 border-blue-600 scale-105 z-10' 
                  : 'bg-white/50 border border-slate-200 hover:bg-white hover:shadow-xl'
              }`}
            >
              {plan.recommended && (
                <div className="self-start px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                  Most Popular
                </div>
              )}
              <h4 className="text-2xl font-black text-slate-900 mb-2">{plan.name}</h4>
              <p className="text-slate-500 font-medium mb-8">{plan.description}</p>
              
              <div className="flex items-baseline mb-10">
                <span className="text-5xl font-black text-slate-900">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-slate-400 font-bold ml-2">/mo</span>}
              </div>

              <div className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-slate-600 font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center space-x-2 ${
                plan.recommended 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700' 
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}>
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
