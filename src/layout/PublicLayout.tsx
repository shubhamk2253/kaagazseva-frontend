import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Globe, Zap, ArrowRight } from 'lucide-react';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFBFF] flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* ================= PREMIUM GLASS HEADER ================= */}
      <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-[100] transition-all">
        <div className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">

          {/* LEFT: Brand Identity with Micro-Interactions */}
          <Link to="/" className="group flex flex-col items-start leading-none">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-[950] text-slate-900 tracking-tighter transition-colors group-hover:text-blue-700">
                KAAGAZ<span className="text-blue-700 group-hover:text-slate-900 transition-colors">SEVA</span>
              </p>
              <div className="h-5 w-[1px] bg-slate-200 rotate-[20deg] hidden sm:block" />
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-50 border border-blue-100">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[10px] font-black text-blue-700 uppercase tracking-wider">v2.0 Live</span>
              </div>
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold mt-1.5">
              National Digital Service Network
            </p>
          </Link>

          {/* CENTER: Elite Navigation */}
          <nav className="hidden lg:flex items-center gap-10 text-[13px] font-bold text-slate-500 uppercase tracking-widest">
            <a href="#infra" className="hover:text-blue-700 transition-all flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> Infrastructure
            </a>
            <a href="#services" className="hover:text-blue-700 transition-all">Network</a>
            <a href="#trust" className="hover:text-blue-700 transition-all">Transparency</a>
          </nav>

          {/* RIGHT: Action Hub */}
          <div className="flex items-center gap-6">
            <Link to="/login" className="hidden md:block text-sm font-bold text-slate-600 hover:text-blue-700 transition-colors">
              Agent Portal
            </Link>
            
            <Link to="/login">
              <Button
                className="group h-12 px-8 rounded-full bg-slate-900 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center gap-2"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= PAGE CONTENT ================= */}
      <main className="flex-1 relative">
        {/* Subtle Global Background Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
        <Outlet />
      </main>

      {/* ================= CORPORATE FOOTER ================= */}
      <footer className="bg-white border-t border-slate-200 pt-24 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
            
            {/* Mission Statement (Col 1-5) */}
            <div className="md:col-span-5">
              <p className="text-2xl font-black text-slate-900 mb-6">KAAGAZSEVA</p>
              <p className="text-base text-slate-500 leading-relaxed max-w-sm">
                Architecting the future of assisted government services. 
                We combine <span className="text-slate-900 font-semibold">financial integrity</span> with 
                <span className="text-slate-900 font-semibold"> high-speed digital delivery</span>.
              </p>
              
              <div className="mt-8 flex gap-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-slate-400 group-hover:text-blue-600" />
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-colors">
                  <Zap className="w-6 h-6 text-slate-400 group-hover:text-blue-600" />
                </div>
              </div>
            </div>

            {/* Links (Col 6-12) */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Ecosystem</h4>
                <ul className="space-y-3 text-[14px] font-bold text-slate-600">
                  <li className="hover:text-blue-700 cursor-pointer transition-colors">Agent Network</li>
                  <li className="hover:text-blue-700 cursor-pointer transition-colors">Service API</li>
                  <li className="hover:text-blue-700 cursor-pointer transition-colors">Marketplace</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Governance</h4>
                <ul className="space-y-3 text-[14px] font-bold text-slate-600">
                  <li className="hover:text-blue-700 cursor-pointer transition-colors">Escrow Policy</li>
                  <li className="hover:text-blue-700 cursor-pointer transition-colors">Privacy Stack</li>
                  <li className="hover:text-blue-700 cursor-pointer transition-colors">Audit Logs</li>
                </ul>
              </div>

              <div className="space-y-4 col-span-2 sm:col-span-1">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">System Status</h4>
                <div className="p-4 rounded-2xl bg-green-50/50 border border-green-100">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[11px] font-black text-green-700 uppercase">Operational</span>
                  </div>
                  <p className="text-[10px] text-green-600 font-medium">99.98% Network Uptime</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Pure Minimalist */}
          <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              © {new Date().getFullYear()} KaagazSeva Technologies Pvt Ltd.
            </p>
            <div className="flex gap-8">
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">India Stack Integrated</span>
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">AES-256 Encrypted</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;