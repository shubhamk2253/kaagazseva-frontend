import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Globe, HelpCircle } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFBFF] selection:bg-blue-100 selection:text-blue-900">

      {/* ================= PREMIUM FLOATING HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 z-[100] transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">

          {/* LEFT: Brand with Micro-interactions */}
          <Link to="/" className="group flex flex-col items-start">
            <p className="text-2xl font-[950] text-slate-900 tracking-tighter leading-none group-hover:text-blue-700 transition-colors">
              KAAGAZ<span className="text-blue-700 group-hover:text-slate-900">SEVA</span>
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">
                National Digital Infrastructure
              </p>
            </div>
          </Link>

          {/* MIDDLE: Hidden Nav Links (Standard for Premium SaaS) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-500">
            <Link to="#" className="hover:text-blue-700 transition-colors">Infrastructure</Link>
            <Link to="#" className="hover:text-blue-700 transition-colors">Network</Link>
            <Link to="#" className="hover:text-blue-700 transition-colors">Pricing</Link>
          </nav>

          {/* RIGHT: High-End CTAs */}
          <div className="flex items-center gap-6">
            <Link to="/login" className="hidden sm:block text-sm font-bold text-slate-600 hover:text-blue-700 transition-all">
              Sign In
            </Link>

            <Link to="/login">
              <Button
                className="group h-12 px-8 rounded-full bg-slate-950 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center gap-2"
              >
                Launch App
                <ShieldCheck className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= PAGE CONTENT ================= */}
      {/* Added pt-20 to account for the fixed header */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* ================= ELITE MULTI-COLUMN FOOTER ================= */}
      <footer className="bg-white border-t border-slate-200 pt-24 pb-12 overflow-hidden relative">
        {/* Decorative Grid Pattern for Footer */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            
            {/* Col 1: Brand Pitch */}
            <div className="md:col-span-1">
              <p className="text-xl font-black text-slate-900 mb-4">KAAGAZSEVA</p>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                The world-class stack for government service delivery. Built for speed, security, and citizenship.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer">
                  <Globe className="w-4 h-4 text-slate-600" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer">
                  <HelpCircle className="w-4 h-4 text-slate-600" />
                </div>
              </div>
            </div>

            {/* Col 2 & 3: Fast Links */}
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Platform</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li className="hover:text-blue-700 transition-colors cursor-pointer">Agent Network</li>
                <li className="hover:text-blue-700 transition-colors cursor-pointer">Service Catalog</li>
                <li className="hover:text-blue-700 transition-colors cursor-pointer">Developer API</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li className="hover:text-blue-700 transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-blue-700 transition-colors cursor-pointer">Terms of Service</li>
                <li className="hover:text-blue-700 transition-colors cursor-pointer">Escrow Policy</li>
              </ul>
            </div>

            {/* Col 4: Newsletter/Status */}
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">System Status</h4>
              <div className="p-4 rounded-2xl bg-green-50 border border-green-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-bold text-green-700">All Systems Operational</span>
                </div>
                <p className="text-[10px] text-green-600 font-medium italic">Verified: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-bold text-slate-400">
              © {new Date().getFullYear()} KAAGAZSEVA TECHNOLOGIES PVT LTD.
            </p>
            <div className="flex gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>Made in India</span>
              <span>ISO 27001 Certified</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};