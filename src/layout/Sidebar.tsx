import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  LayoutDashboard,
  Users,
  Wallet,
  FileText,
  PlusCircle,
  BarChart3,
} from 'lucide-react';

export const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const { role } = useAuth();
  const location = useLocation();

  const menuItems = {
    admin: [
      { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
      { label: 'Manage Agents', path: '/admin/agents', icon: Users },
      { label: 'Revenue', path: '/admin/revenue', icon: BarChart3 },
    ],
    agent: [
      { label: 'My Workload', path: '/agent', icon: LayoutDashboard },
      { label: 'Wallet', path: '/agent/wallet', icon: Wallet },
    ],
    customer: [
      { label: 'My Requests', path: '/customer', icon: FileText },
      { label: 'New Application', path: '/customer/apply', icon: PlusCircle },
    ],
  };

  const currentMenu = role ? menuItems[role] : [];

  if (!isOpen) return null;

  return (
    <aside className="w-72 bg-blue-900 text-white flex flex-col shadow-xl">

      {/* BRAND HEADER */}
      <div className="px-8 py-6 border-b border-blue-800">
        <p className="text-lg font-black tracking-tight">
          KAAGAZ<span className="text-orange-400">SEVA</span>
        </p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-blue-300 mt-1">
          Operations Panel
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 mt-6 px-4 space-y-2">

        {currentMenu.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? 'bg-white text-blue-900 shadow-md'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive ? 'text-blue-700' : 'text-blue-300 group-hover:text-white'
                }`}
              />
              <span className="text-sm font-semibold tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* FOOTER */}
      <div className="px-6 py-5 border-t border-blue-800 text-xs text-blue-300">
        Structured National Platform
      </div>
    </aside>
  );
};