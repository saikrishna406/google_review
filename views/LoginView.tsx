
import React, { useState } from 'react';
import { Icons } from '../constants';

import { useNavigate } from 'react-router-dom';

const LoginView: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
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

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (email.toLowerCase() === 'error@example.com') {
        setError('A server error occurred. Please try again.');
      } else {
        setSubmitted(true);
        setTimeout(() => navigate('/setup'), 1500); // Redirect to Setup
      }
    }, 1200);
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
            <div className="mb-8 text-left">
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
              {error && <p className="mt-3 text-red-500 text-xs font-bold">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-premium flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-slate-800 hover:-translate-y-0.5 active:scale-[0.98]'
                }`}
            >
              {isSubmitting ? 'Verifying...' : 'Sign In with Magic Link'}
            </button>
          </form>
        ) : (
          <div className="bg-white p-12 rounded-[2.5rem] shadow-stripe border border-slate-200/50 text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Icons.Check className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight mb-3">Check your inbox</h2>
            <p className="text-slate-500 font-medium">We've sent a secure login link to <br /><span className="text-slate-900 font-bold">{email}</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginView;
