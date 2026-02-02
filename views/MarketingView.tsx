
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../constants';

const MarketingView: React.FC = () => {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-500">
      {/* Dynamic Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-glow">
              <Icons.Star className="w-6 h-6 fill-white" />
            </div>
            <span className="font-black text-2xl tracking-tighter nyc-display">TrustPulse</span>
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-xl border border-slate-200/50 p-1.5 rounded-full shadow-premium">
            {['Vision', 'How', 'Platform', 'Pricing'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-orange-600 transition-all rounded-full hover:bg-orange-50">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden md:block text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors px-4">Portal</Link>
            <Link to="/login" className="bg-slate-950 text-white px-6 py-3 md:px-8 md:py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero: Massive NYC Typography */}
      <header className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 md:pt-32 md:pb-20 mesh-gradient overflow-hidden">
        <div ref={addToRefs} className="reveal max-w-7xl mx-auto px-6 text-center z-10">
          <div className="inline-block px-4 py-2 bg-orange-50 border border-orange-100 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 mb-8 md:mb-12 shadow-sm">
            Reputation Management for the 1%
          </div>
          <h1 className="text-6xl md:text-[10vw] font-black text-slate-950 nyc-display mb-8 md:mb-12 text-center tracking-[-0.08em] leading-[0.9] md:leading-[0.8]">
            CONTROL <br /> <span className="text-orange-600">THE PULSE.</span>
          </h1>
          <div className="max-w-2xl mx-auto space-y-12">
            <p className="text-2xl md:text-3xl text-slate-500 font-medium leading-tight tracking-tight">
              Elite brands don't hope for 5 stars. They engineer them. WhatsApp automation with a built-in privacy wall.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link to="/login" className="group w-full sm:w-auto bg-slate-950 text-white px-12 py-7 rounded-[2.5rem] text-xl font-black hover:bg-orange-600 transition-all shadow-stripe flex items-center gap-4 justify-center">
                Launch Platform
                <Icons.ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Stat Reveal - Responsive: Stacked on mobile, absolute row on desktop */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl px-6 gap-8 md:gap-0 mt-16 md:mt-0 md:absolute md:bottom-20 md:left-1/2 md:-translate-x-1/2">
          <div className="text-center md:text-left">
            <div className="text-5xl md:text-6xl font-black nyc-display text-slate-950">98%</div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Open Rate</p>
          </div>
          <div className="text-center md:text-right">
            <div className="text-5xl md:text-6xl font-black nyc-display text-slate-950">5.0</div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rating Target</p>
          </div>
        </div>
      </header>

      {/* Marquee Branding */}
      <div className="py-20 bg-white border-y border-slate-100 overflow-hidden">
        <div className="marquee">
          <div className="marquee-content">
            {['MANHATTAN', 'LONDON', 'PARIS', 'TOKYO', 'DUBAI', 'BERLIN', 'SEOUL'].map(brand => (
              <span key={brand} className="text-2xl md:text-4xl font-black tracking-[-0.05em] text-slate-100 hover:text-slate-900 transition-colors cursor-default px-8 md:px-16 nyc-display uppercase">{brand}</span>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {['MANHATTAN', 'LONDON', 'PARIS', 'TOKYO', 'DUBAI', 'BERLIN', 'SEOUL'].map(brand => (
              <span key={brand} className="text-2xl md:text-4xl font-black tracking-[-0.05em] text-slate-100 hover:text-slate-900 transition-colors cursor-default px-8 md:px-16 nyc-display uppercase">{brand}</span>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION: VISION (#vision) */}
      <section id="vision" className="dark-section py-24 md:py-44 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <div ref={addToRefs} className="reveal space-y-8 md:space-y-12">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500">The Vision</span>
            <h2 className="text-5xl md:text-[8vw] font-black nyc-display leading-[0.9] md:leading-[0.8] tracking-[-0.06em]">EQUITY <br /> IS TRUST.</h2>
            <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-lg">
              We believe reputation is the new balance sheet. Every unmanaged review is a liability. Our vision is a world where brand sentiment is deterministic.
            </p>
          </div>
          <div ref={addToRefs} className="reveal stagger-2">
            <div className="aspect-[4/5] bg-white/5 rounded-[4rem] border border-white/10 p-1">
              <div className="w-full h-full bg-slate-900 rounded-[3.8rem] overflow-hidden flex items-center justify-center p-12">
                <div className="space-y-8 w-full">
                  {[85, 92, 78, 95].map((w, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-1 bg-white/10 rounded-full w-full">
                        <div className="h-full bg-orange-500 rounded-full transition-all duration-1000" style={{ width: `${w}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: HOW (#how) */}
      <section id="how" className="py-24 md:py-44 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={addToRefs} className="reveal text-center mb-24 md:mb-44">
            <h2 className="text-6xl md:text-[10vw] font-black nyc-display tracking-[-0.06em] leading-none mb-8 md:mb-12 text-slate-950">THE <br /> PROTOCOL.</h2>
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-400">Deterministic Reputation Growth</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-24">
            {[
              { title: 'CAPTURE', desc: 'Sync your POS or CRM and initiate the automated WhatsApp broadcast.', step: 'I' },
              { title: 'FILTER', desc: '≤4 star reviews are intercepted and gated in your private dashboard.', step: 'II' },
              { title: 'PUBLISH', desc: 'Perfect 5-star experiences are routed instantly to Google Maps.', step: 'III' }
            ].map((item, i) => (
              <div key={i} ref={addToRefs} className={`reveal stagger-${i + 1} group`}>
                <div className="text-8xl md:text-[12rem] font-black text-slate-50 nyc-display mb-[-2rem] md:mb-[-4rem] group-hover:text-orange-50 transition-colors pointer-events-none">{item.step}</div>
                <div className="relative z-10 space-y-6 pl-6">
                  <h3 className="text-4xl font-black tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 font-medium text-lg leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: PLATFORM (#platform) */}
      <section id="platform" className="py-24 md:py-44 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12 mb-12 md:mb-20">
              <h2 className="text-5xl md:text-[8vw] font-black nyc-display leading-[0.9] md:leading-[0.8] tracking-[-0.05em]">THE <br /> OPERATING <br /> SYSTEM.</h2>
            </div>

            <div ref={addToRefs} className="reveal lg:col-span-7 bg-white p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] border border-slate-200 shadow-premium flex flex-col justify-between min-h-[400px] md:h-[600px]">
              <div className="w-16 h-16 bg-slate-950 text-white rounded-2xl flex items-center justify-center mb-8 md:mb-12">
                <Icons.MessageCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 md:mb-8 leading-none">Meta Business <br /> Backbone.</h3>
                <p className="text-slate-500 text-lg md:text-xl font-medium max-w-sm">Official WhatsApp API integration ensuring 100% deliverability and verified status.</p>
              </div>
            </div>

            <div ref={addToRefs} className="reveal stagger-1 lg:col-span-5 bg-orange-600 p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] text-white flex flex-col justify-between min-h-[400px] md:h-[600px] shadow-glow">
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter mb-8 leading-tight">Privacy <br /> Intercept Gating.</h3>
              <div className="space-y-8">
                <div className="p-6 bg-white/10 rounded-3xl border border-white/10">
                  <p className="text-xs font-black uppercase tracking-widest opacity-60">Status</p>
                  <p className="text-xl font-bold">Risk Neutralized</p>
                </div>
                <p className="text-orange-100 font-medium">Protect your public equity from outlier negative sentiment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PRICING (#pricing) */}
      <section id="pricing" className="py-24 md:py-44 dark-section">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={addToRefs} className="reveal text-center mb-16 md:mb-32">
            <h2 className="text-6xl md:text-[10vw] font-black nyc-display tracking-[-0.06em] leading-none mb-8 md:mb-12">SCALE.</h2>
            <p className="text-slate-400 text-xl font-medium">Select your deployment tier.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'BOUTIQUE', price: '49', features: ['100 Leads', 'Basic Gating'] },
              { name: 'ELITE PRO', price: '99', features: ['500 Leads', 'Custom Gating', 'Sentiment AI'], popular: true },
              { name: 'ENTERPRISE', price: '950+', features: ['Unlimited Leads', 'Multi-Unit Dashboard'] }
            ].map((tier, i) => (
              <div key={i} ref={addToRefs} className={`reveal stagger-${i + 1} p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] border ${tier.popular ? 'bg-white text-slate-950 border-orange-500' : 'bg-white/5 text-white border-white/10'} min-h-[500px] md:h-[600px] flex flex-col justify-between`}>
                <div className="space-y-8 md:space-y-12">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">{tier.name}</span>
                    {tier.popular && <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-[8px] font-black">MOST ACTIVE</span>}
                  </div>
                  <div className="text-6xl md:text-7xl font-black nyc-display">${tier.price}</div>
                  <ul className="space-y-6">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-center gap-4 text-sm font-bold opacity-80 uppercase tracking-widest">
                        <Icons.Check className="w-5 h-5 text-orange-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to="/login" className={`w-full py-6 rounded-[2rem] font-black uppercase tracking-widest text-[10px] transition-all text-center block ${tier.popular ? 'bg-slate-950 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  Deploy Tier
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Typography CTA */}
      <section className="py-32 md:py-64 bg-white text-center">
        <div ref={addToRefs} className="reveal max-w-7xl mx-auto px-6">
          <h2 className="text-7xl md:text-[15vw] font-black nyc-display tracking-[-0.1em] leading-none mb-12 md:mb-24">OWN IT.</h2>
          <Link to="/login" className="bg-orange-600 text-white px-12 py-8 md:px-24 md:py-12 rounded-[3rem] md:rounded-[5rem] text-2xl md:text-4xl font-black tracking-tighter hover:bg-slate-950 transition-all shadow-stripe inline-block">
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Footer: Minimal & Premium */}
      <footer className="py-16 md:py-32 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-20">
          <div className="flex items-center gap-4">
            <Icons.Star className="w-10 h-10 text-orange-600" />
            <span className="text-4xl font-black nyc-display tracking-tighter">TrustPulse</span>
          </div>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
            <a href="#" className="hover:text-orange-600">Privacy</a>
            <a href="#" className="hover:text-orange-600">Terms</a>
            <a href="#" className="hover:text-orange-600">Contact</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-32 text-center text-[10px] font-black uppercase tracking-[0.6em] text-slate-300">
          © 2024 TRUSTPULSE INC. NYC.
        </div>
      </footer>
    </div>
  );
};

export default MarketingView;
