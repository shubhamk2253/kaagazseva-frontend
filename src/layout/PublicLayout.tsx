import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFBFF] flex flex-col">

      {/* ================= HEADER ================= */}
      <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">

          {/* LEFT: Brand Identity */}
          <Link to="/" className="leading-tight group">
            <p className="text-xl font-black text-slate-900 tracking-tight">
              KAAGAZ<span className="text-blue-700">SEVA</span>
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold group-hover:text-blue-600 transition-colors">
              National Digital Infrastructure
            </p>
          </Link>

          {/* CENTER: Minimal Nav (Institutional Feel) */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-600">
            <a href="#services" className="hover:text-blue-700 transition-colors">
              Services
            </a>
            <a href="#how-it-works" className="hover:text-blue-700 transition-colors">
              How It Works
            </a>
            <a href="#agents" className="hover:text-blue-700 transition-colors">
              For Agents
            </a>
          </nav>

          {/* RIGHT: CTAs */}
          <div className="flex items-center gap-4">

            <Link to="/login">
              <Button
                variant="outline"
                className="h-12 px-6 rounded-2xl border-slate-300 text-slate-700 font-semibold hover:border-blue-700 hover:text-blue-700 transition-all duration-300"
              >
                Become an Agent
              </Button>
            </Link>

            <Link to="/login">
              <Button
                className="h-12 px-8 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-lg shadow-blue-200 transition-all duration-300"
              >
                Apply Now
              </Button>
            </Link>

          </div>
        </div>
      </header>

      {/* ================= PAGE CONTENT ================= */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 py-16 bg-white mt-24">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-12 text-sm text-slate-600">

          {/* Brand Column */}
          <div>
            <p className="text-lg font-black text-slate-900 tracking-tight mb-3">
              KAAGAZ<span className="text-blue-700">SEVA</span>
            </p>
            <p className="text-slate-500 leading-relaxed">
              India’s structured digital backbone for assisted government services.
              Secure. Transparent. Accountable.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-2">
            <p className="font-bold text-slate-900 mb-2">Platform</p>
            <p className="hover:text-blue-700 cursor-pointer transition-colors">Apply for Service</p>
            <p className="hover:text-blue-700 cursor-pointer transition-colors">Agent Registration</p>
            <p className="hover:text-blue-700 cursor-pointer transition-colors">Support</p>
          </div>

          {/* Legal */}
          <div className="space-y-2">
            <p className="font-bold text-slate-900 mb-2">Legal</p>
            <p className="hover:text-blue-700 cursor-pointer transition-colors">Privacy Policy</p>
            <p className="hover:text-blue-700 cursor-pointer transition-colors">Terms of Service</p>
          </div>

        </div>

        <div className="text-center text-xs text-slate-400 mt-12 border-t border-slate-100 pt-6">
          © {new Date().getFullYear()} KaagazSeva. Structured National Platform for Assisted Government Services.
        </div>
      </footer>

    </div>
  );
};

export default PublicLayout;