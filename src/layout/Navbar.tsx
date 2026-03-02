import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Navbar: React.FC<{ toggleSidebar: () => void }> = ({
  toggleSidebar,
}) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-6">
        <button
          onClick={toggleSidebar}
          className="text-slate-500 hover:text-blue-700 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="leading-tight">
          <p className="text-lg font-black text-slate-900 tracking-tight">
            KAAGAZ<span className="text-blue-700">SEVA</span>
          </p>
          <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
            National Digital Infrastructure
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-900">
            {user?.name || 'User'}
          </p>
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            {user?.role}
          </p>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-all duration-300"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </header>
  );
};