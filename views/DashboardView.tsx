
import React from 'react';
import { View, ReviewRequest } from '../types';
import Layout from '../components/Layout';
import { Icons } from '../constants';

const mockRequests: ReviewRequest[] = [
  { id: '1', customerName: 'Alex Johnson', phoneNumber: '+1 555-0001', status: 'completed', date: '2024-05-10', rating: 5 },
  { id: '2', customerName: 'Maria Garcia', phoneNumber: '+1 555-0002', status: 'delivered', date: '2024-05-10' },
  { id: '3', customerName: 'Sam Smith', phoneNumber: '+1 555-0003', status: 'failed', date: '2024-05-09' },
  { id: '4', customerName: 'Jordan Lee', phoneNumber: '+1 555-0004', status: 'completed', date: '2024-05-09', rating: 4 },
  { id: '5', customerName: 'Taylor Reed', phoneNumber: '+1 555-0005', status: 'read', date: '2024-05-08' },
];

import { useNavigate } from 'react-router-dom';

const DashboardView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Overview">
      <div className="max-w-7xl mx-auto space-y-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Messages Sent', value: '1,284', change: '+24%', icon: Icons.Zap },
            { label: 'Page Visits', value: '842', change: '+12%', icon: Icons.Users },
            { label: '5★ Redirects', value: '248', change: '+31%', icon: Icons.Star },
            { label: 'Private Feedback', value: '14', change: '-2', icon: Icons.Shield },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-premium text-left">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-black uppercase bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                  {stat.change}
                </div>
              </div>
              <div className="text-4xl font-black text-slate-950 tracking-tighter mb-1">{stat.value}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-premium overflow-hidden text-left">
          <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-lg text-slate-900">Recent Customer Activity</h3>
            <button onClick={() => navigate('/dashboard/send')} className="text-sm font-bold text-orange-600 hover:text-orange-700">New Campaign</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-10 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Customer</th>
                  <th className="px-10 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-10 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Rating</th>
                  <th className="px-10 py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockRequests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-10 py-6">
                      <div className="text-sm font-bold text-slate-900">{req.customerName}</div>
                      <div className="text-xs text-slate-400 font-medium">{req.phoneNumber}</div>
                    </td>
                    <td className="px-10 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${req.status === 'completed' ? 'bg-orange-50 text-orange-600' :
                          req.status === 'failed' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'
                        }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex gap-0.5">
                        {/* Fixed: Wrapped Icons.Star in span to handle key prop */}
                        {[1, 2, 3, 4, 5].map(s => (
                          <span key={s}>
                            <Icons.Star className={`w-3.5 h-3.5 ${req.rating && s <= req.rating ? 'text-amber-400' : 'text-slate-100'}`} />
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">{req.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardView;