
import React, { useState } from 'react';
import { Icons } from '../constants';

import { useNavigate } from 'react-router-dom';

const LoginView: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || (isRegistering && !name)) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = isRegistering ? '/auth/register' : '/auth/login';
      const payload = isRegistering ? { name, email, password } : { email, password };

      const res = await fetch(`http://localhost:5000/api${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (data.success) {
        // Save to LocalStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user.id);
        localStorage.setItem('user_name', data.user.name || data.user.email);

        if (isRegistering) {
          setSubmitted(true);
          setTimeout(() => navigate('/setup'), 1000); // Redirect to Setup for new users
        } else {
          // Check if business exists, if not -> setup (Mocking this check or handling in setup view)
          // For now, simple logic: Login -> Dashboard for MVP simplicity, or Login -> Setup if we want to force check
          // Better: User always goes to dashboard, but dashboard redirects if no business?
          // Let's stick to Dashboard for login, Setup for Register.
          setSubmitted(true);
          setTimeout(() => navigate('/dashboard'), 1000);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 mesh-gradient">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-600 rounded-2xl text-white mb-6 shadow-premium shadow-orange-500/30">
            <Icons.Star className="w-7 h-7 fill-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tighter">TrustPulse</h1>
          <p className="text-slate-500 mt-2 font-medium">The Operating System for Reputation</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] shadow-stripe border border-slate-200/50">
            {isRegistering && (
              <div className="mb-6 text-left">
                <label htmlFor="name" className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  placeholder="John Doe"
                  className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none font-medium"
                />
              </div>
            )}
            <div className="mb-6 text-left">
              <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Work Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                placeholder="name@company.com"
                className={`w-full px-6 py-4 rounded-2xl border transition-all outline-none font-medium ${error
                  ? 'border-red-500 ring-4 ring-red-50'
                  : 'border-slate-100 bg-slate-50/50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10'
                  }`}
              />
            </div>
            <div className="mb-8 text-left">
              <label htmlFor="password" className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                placeholder="••••••••"
                className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none font-medium"
              />
              {error && <p className="mt-3 text-red-500 text-xs font-bold">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-premium flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-slate-800 hover:-translate-y-0.5 active:scale-[0.98]'
                }`}
            >
              {isSubmitting ? 'Processing...' : (isRegistering ? 'Create Account' : 'Sign In')}
            </button>
            <div className="mt-6 text-center">
              <button type="button" onClick={() => { setIsRegistering(!isRegistering); setError(null); }} className="text-slate-500 text-xs font-bold hover:text-orange-600 transition-colors">
                {isRegistering ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white p-12 rounded-[2.5rem] shadow-stripe border border-slate-200/50 text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Icons.Check className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight mb-3">Authentication Successful</h2>
            <p className="text-slate-500 font-medium">Entering secure portal...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginView;
