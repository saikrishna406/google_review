
import React, { useState } from 'react';
import { View } from '../types';
import Layout from '../components/Layout';
import { Icons } from '../constants';

const SendRequestsView: React.FC = () => {
  const [tab, setTab] = useState<'single' | 'bulk'>('single');
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSend = async () => {
    if (!name || !phone) return;

    try {
      const res = await fetch('http://localhost:5000/api/review/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token') || ''
        },
        body: JSON.stringify({
          business_id: localStorage.getItem('user_id'), // Use real user ID from login
          customer_name: name,
          customer_phone: phone
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setName('');
        setPhone('');
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to send request', err);
    }
  };

  return (
    <Layout title="Campaign Manager">
      <div className="max-w-4xl mx-auto space-y-10 text-left">
        <header>
          <p className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-1">Growth Engine</p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Send Requests</h2>
        </header>

        <div className="bg-slate-100/50 p-1.5 rounded-2xl flex w-fit gap-1 mb-4">
          <button
            onClick={() => setTab('single')}
            className={`px-8 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${tab === 'single' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Manual Mode
          </button>
          <button
            onClick={() => setTab('bulk')}
            className={`px-8 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${tab === 'bulk' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Bulk Import
          </button>
        </div>

        {success && (
          <div className="bg-orange-50 border border-orange-100 text-orange-700 px-6 py-4 rounded-2xl flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3 font-bold text-sm">
              <Icons.Check className="w-5 h-5" />
              Broadcast initiated successfully.
            </div>
          </div>
        )}

        {tab === 'single' ? (
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200/50 shadow-premium">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Customer Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white outline-none focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">WhatsApp Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 555 123 4567"
                  className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white outline-none focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
                />
              </div>
            </div>
            <div className="mb-10">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Custom Hook (Optional)</label>
              <textarea
                rows={4}
                className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white outline-none focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
                placeholder="Hi John, thanks for visiting! Could you take a moment to rate us?"
              ></textarea>
            </div>
            <button onClick={handleSend} className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-700 transition-all shadow-premium shadow-orange-500/20">
              Launch Request
            </button>
          </div>
        ) : (
          <div className="bg-white p-20 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center group hover:border-orange-500 transition-colors cursor-pointer">
            <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
              <Icons.MessageCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Bulk Customer Deployment</h3>
            <p className="text-slate-500 font-medium mb-10">Drop your CSV or Excel customer list here to automate hundreds of requests.</p>
            <input type="file" id="csv-upload" className="hidden" />
            <label htmlFor="csv-upload" className="cursor-pointer bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all inline-block shadow-premium">
              Choose Data Source
            </label>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SendRequestsView;
