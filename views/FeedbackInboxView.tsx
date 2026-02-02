
import React from 'react';
import { View, Feedback } from '../types';
import Layout from '../components/Layout';
import { Icons } from '../constants';

const mockFeedback: Feedback[] = [
  { id: '1', customerName: 'Mike Ross', rating: 2, comment: "Wait time was too long at the counter. Front desk was distracted.", date: '2024-05-11', status: 'new' },
  { id: '2', customerName: 'Sarah Jenkins', rating: 3, comment: "Product quality didn't meet expectations based on price point.", date: '2024-05-10', status: 'responded' },
  { id: '3', customerName: 'Peter Quill', rating: 1, comment: "I received the wrong item twice in a row. Very frustrating.", date: '2024-05-09', status: 'new' },
];

const FeedbackInboxView: React.FC = () => {
  return (
    <Layout title="Feedback Terminal">
      <div className="max-w-5xl mx-auto space-y-10 text-left">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <p className="text-sm font-bold text-orange-600 uppercase tracking-widest">Privacy Protection</p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Gated Feedback</h2>
          </div>
          <div className="flex gap-2">
            <button className="bg-white border border-slate-200 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-notion">Sort By Date</button>
            <button className="bg-white border border-slate-200 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-notion">Unresolved Only</button>
          </div>
        </header>

        <div className="space-y-6">
          {mockFeedback.map((fb) => (
            <div key={fb.id} className="bg-white p-10 rounded-[2.5rem] border border-slate-200/50 shadow-premium flex flex-col md:flex-row md:items-start justify-between gap-8 group hover:border-orange-500/50 transition-all">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-slate-400 text-xs">
                    {fb.customerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 tracking-tight text-lg">{fb.customerName}</h4>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>{fb.date}</span>
                      {fb.status === 'new' && (
                        <span className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                          Critical Action
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(s => (
                    <span key={s}>
                      <Icons.Star className={`w-5 h-5 ${s <= fb.rating ? 'text-amber-400' : 'text-slate-100'}`} />
                    </span>
                  ))}
                </div>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">"{fb.comment}"</p>
              </div>
              <div className="flex md:flex-col gap-3 shrink-0">
                <button className="bg-orange-600 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-premium">Reply Directly</button>
                <button className="bg-white border border-slate-200 text-slate-500 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-notion">Mark Resolved</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackInboxView;
