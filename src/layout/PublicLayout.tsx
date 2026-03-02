import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFBFF]">

      {/* ================= HEADER ================= */}
      <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">

          {/* LEFT: Brand */}
          <Link to="/" className="leading-tight">
            <p className="text-xl font-black text-slate-900 tracking-tight">
              KAAGAZ<span className="text-blue-700">SEVA</span>
            </p>
            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
              National Digital Service Network
            </p>
          </Link>

          {/* RIGHT: CTAs */}
          <div className="flex items-center gap-4">

            <Link to="/login">
              <Button
                variant="outline"
                className="h-12 px-6 rounded-2xl border-slate-300 text-slate-700 font-semibold hover:border-blue-600 hover:text-blue-700 transition-all"
              >
                Become an Agent
              </Button>
            </Link>

            <Link to="/login">
              <Button
                className="h-12 px-8 rounded-2xl bg-slate-900 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-200 transition-all"
              >
                Apply Now
              </Button>
            </Link>

          </div>
        </div>
      </header>

      {/* ================= PAGE CONTENT ================= */}
      <main>
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 py-12 mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} KaagazSeva. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Structured National Platform for Assisted Government Services
          </p>
        </div>
      </footer>

    </div>
  );
};