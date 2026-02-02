
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: Icons.LayoutDashboard },
    { path: '/dashboard/send', label: 'Send Requests', icon: Icons.Zap },
    { path: '/dashboard/inbox', label: 'Feedback Inbox', icon: Icons.MessageCircle },
    { path: '/dashboard/billing', label: 'Billing', icon: Icons.CreditCard },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-8">
          <div className="flex items-center gap-3 font-bold text-xl text-orange-600">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Icons.Star className="w-6 h-6 fill-white" />
            </div>
            <span className="nyc-display text-2xl tracking-tighter text-slate-900">TrustPulse</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-6">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Core Platform</p>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${currentPath === item.path
                  ? 'bg-orange-50 text-orange-700 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              <item.icon className={`w-5 h-5 ${currentPath === item.path ? 'text-orange-600' : 'text-slate-400'}`} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-red-600 rounded-xl transition-all"
          >
            <Icons.LogOut className="w-5 h-5" />
            Log Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 shrink-0">
          <h1 className="text-xl font-black text-slate-900 tracking-tight">{title}</h1>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-2xl bg-slate-950 flex items-center justify-center text-white font-black text-xs">
              JD
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 bg-slate-50/50">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
