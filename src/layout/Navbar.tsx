import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const Navbar: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
      <button
        onClick={toggleSidebar}
        className="text-gray-500 hover:text-gray-700"
      >
        ☰
      </button>

      <div className="flex items-center gap-4">
        <div className="text-right">
          {/* ✅ Backend-aligned field */}
          <p className="text-sm font-bold text-gray-800">
            {user?.name || 'User'}
          </p>

          <p className="text-xs text-gray-500 capitalize">
            {user?.role}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-gray-100 p-2 rounded-full hover:bg-red-50 hover:text-red-600 transition-all"
          title="Logout"
        >
          🚪
        </button>
      </div>
    </header>
  );
};