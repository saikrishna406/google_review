
import React from 'react';
import { View } from '../types';
import Layout from '../components/Layout';
import { Icons } from '../constants';

const BillingView: React.FC = () => {
  return (
    <Layout title="Financial Control">
      <div className="max-w-4xl mx-auto space-y-12 text-left pb-20">
        <header>
          <p className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-1">Subscription</p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Billing & Usage</h2>
        </header>

        <div className="bg-white rounded-[2.5rem] border border-slate-200/50 shadow-premium overflow-hidden">
          <div className="bg-slate-950 p-12 text-white flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] -z-0"></div>
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 mb-2 block">Premium Tier</span>
              <h2 className="text-5xl font-black tracking-tighter">Growth Pro</h2>
            </div>
            <div className="text-right relative z-10">
              <span className="text-6xl font-black">$99</span>
              <span className="text-slate-500 font-bold uppercase tracking-widest text-xs ml-2">/month</span>
            </div>
          </div>
          <div className="p-12">
            <div className="mb-12">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <span className="text-sm font-black text-slate-900">WhatsApp Broadcast Usage</span>
                  <p className="text-xs text-slate-400 font-medium mt-1">142 of 200 high-priority requests used</p>
                </div>
                <span className="text-sm font-black text-orange-600">71%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                <div className="h-full bg-orange-500 rounded-full shadow-lg" style={{ width: '71%' }}></div>
              </div>
              <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-300">Resets in 12 days • Next bill June 1st</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-orange-600 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-premium">Upgrade Plan</button>
              <button className="bg-white border border-slate-200 px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-notion">Manage Invoices</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-200/50 shadow-premium">
          <div className="px-10 py-6 border-b border-slate-100">
            <h3 className="font-black text-lg text-slate-900">Billing History</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { id: 'INV-001', date: 'May 01, 2024', amount: '$99.00', status: 'Paid' },
              { id: 'INV-002', date: 'Apr 01, 2024', amount: '$99.00', status: 'Paid' },
              { id: 'INV-003', date: 'Mar 01, 2024', amount: '$99.00', status: 'Paid' }
            ].map((inv) => (
              <div key={inv.id} className="px-10 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors group text-sm">
                <div className="flex items-center gap-6">
                  <Icons.Check className="text-orange-500 w-5 h-5" />
                  <div>
                    <div className="font-black text-slate-900 tracking-tight">{inv.id}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{inv.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-12">
                  <span className="font-black text-slate-900">{inv.amount}</span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">{inv.status}</span>
                  <button className="text-slate-300 hover:text-slate-600 transition-colors"><Icons.Settings className="w-5 h-5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-12 border-t border-slate-200 text-left">
          <button className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em] hover:text-red-600 transition-colors">Terminate Subscription</button>
          <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed">Closing your account will immediately freeze your WhatsApp loops and purge generated AI assets.</p>
        </div>
      </div>
    </Layout>
  );
};

export default BillingView;
