
import React, { useState } from 'react';
import { Icons } from '../constants';

import { useNavigate } from 'react-router-dom';

const OnboardingView: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 text-left">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Legal Business Name</label>
              <input type="text" placeholder="e.g. Blue Bottle Coffee" className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Industry</label>
              <select className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium appearance-none">
                <option value="">Select Industry</option>
                <option value="retail">Retail</option>
                <option value="hospitality">Hospitality</option>
                <option value="healthcare">Healthcare</option>
                <option value="services">Professional Services</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Google Maps URL</label>
              <input type="text" placeholder="https://maps.google.com/..." className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium" />
              <p className="mt-3 text-xs text-slate-400 font-medium">This is where we'll direct your happy 5-star customers.</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 text-left">
            <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100 flex gap-5">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm shrink-0">
                <Icons.MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-orange-900">WhatsApp Integration</h4>
                <p className="text-orange-800/70 text-sm font-medium">Verify your business number to enable 98% open rates.</p>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Time Delay (Before Sending)</label>
              <select className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium appearance-none">
                <option value="0">Immediate</option>
                <option value="1h">1 Hour (Recommended)</option>
                <option value="1d">1 Day</option>
                <option value="3d">3 Days</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Business Phone Number</label>
              <div className="flex gap-4">
                <input type="text" placeholder="+1" className="w-24 px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 font-medium outline-none" />
                <input type="text" placeholder="555-0123" className="flex-1 px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 font-medium outline-none" />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 text-left">
            <h3 className="font-black text-xl text-slate-950 tracking-tight">Configure Privacy Gating</h3>
            <div className="space-y-4">
              {[
                { title: '5-Star Redirect', desc: 'Direct to Google Maps', active: true },
                { title: '1-3 Star Privacy Gate', desc: 'Redirect to private form', active: true }
              ].map((item, i) => (
                <div key={i} className="p-6 border border-slate-100 rounded-3xl flex items-center justify-between bg-slate-50/50">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-400 font-medium">{item.desc}</div>
                  </div>
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                    <Icons.Check className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em]">Step {step} of {totalSteps}</span>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1 w-10 rounded-full transition-all duration-500 ${i <= step ? 'bg-orange-500' : 'bg-slate-200'}`} />
              ))}
            </div>
          </div>
          <h2 className="text-4xl font-black text-slate-950 tracking-tighter text-left">
            {step === 1 ? 'Business Identity' : step === 2 ? 'Communication Hub' : 'Security Settings'}
          </h2>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-200/50 mb-10">
          {renderStep()}
        </div>

        <div className="flex items-center justify-between px-2">
          <button
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step === 1}
            className={`text-sm font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors ${step === 1 ? 'opacity-0' : ''}`}
          >
            Back
          </button>
          <button
            onClick={() => step < 3 ? setStep(step + 1) : navigate('/dashboard')}
            className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-700 transition-all shadow-premium"
          >
            {step === 3 ? 'Finish Setup' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingView;
