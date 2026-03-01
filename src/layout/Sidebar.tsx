import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const { role } = useAuth();
  const location = useLocation();

  const menuItems = {
    admin: [
      { label: 'Dashboard', path: '/admin', icon: '📊' },
      { label: 'Manage Agents', path: '/admin/agents', icon: '👥' },
      { label: 'Revenue', path: '/admin/revenue', icon: '💰' },
    ],
    agent: [
      { label: 'My Workload', path: '/agent', icon: '📋' },
      { label: 'Wallet', path: '/agent/wallet', icon: '👛' },
    ],
    customer: [
      { label: 'My Requests', path: '/customer', icon: '📄' },
      { label: 'New Application', path: '/customer/apply', icon: '➕' },
    ],
  };

  const currentMenu = role ? menuItems[role] : [];

  if (!isOpen) return null;

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col transition-all duration-300">
      <div className="p-6 text-2xl font-bold border-b border-slate-800">
        Kaagaz<span className="text-blue-400">Seva</span>
      </div>
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {currentMenu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === item.path ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};