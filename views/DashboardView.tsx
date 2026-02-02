
import React, { useState, useEffect } from 'react';
import { View, ReviewRequest } from '../types';
import Layout from '../components/Layout';
import { Icons } from '../constants';

// Mock data removed in favor of API calls

import { useNavigate } from 'react-router-dom';

const DashboardView: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    messages_sent: 0,
    page_visits: 0,
    five_star_redirects: 0,
    feedback_count: 0
  });
  const [requests, setRequests] = useState<ReviewRequest[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch Analytics
    fetch('http://localhost:5000/api/analytics/overview', {
      headers: {
        'x-access-token': token || '',
        'user-id': localStorage.getItem('user_id') || ''
      }
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Error fetching analytics:', err));

    // Fetch Recent Requests
    fetch('http://localhost:5000/api/review/requests', {
      headers: { 'x-access-token': token || '' }
    })
      .then(res => res.json())
      .then(data => {
        // Transform backend data to frontend model if needed, or use directly
        // Backend returns { requests: [] }
        const mapped = data.requests.map((r: any) => ({
          id: r.id,
          customerName: 'Customer ' + r.customer_id.substr(-4), // Mock name since request only has ID link usually, or fetch customer details
          phoneNumber: '...', // Hidden for privacy in overview
          status: r.status,
          date: new Date(r.sent_at).toLocaleDateString(),
          rating: null // derived from ratings logic later
        }));
        setRequests(mapped);
      })
      .catch(err => console.error('Error fetching requests:', err));
  }, []);

  return (
    <Layout title="Overview">
      <div className="max-w-7xl mx-auto space-y-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Messages Sent', value: stats.messages_sent, change: '+0%', icon: Icons.Zap },
            { label: 'Page Visits', value: stats.page_visits, change: '+0%', icon: Icons.Users },
            { label: '5★ Redirects', value: stats.five_star_redirects, change: '+0%', icon: Icons.Star },
            { label: 'Private Feedback', value: stats.feedback_count, change: '+0%', icon: Icons.Shield },
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
                {requests.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-slate-500">No recent activity found. Start a campaign!</td></tr>
                ) : requests.map(req => (
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