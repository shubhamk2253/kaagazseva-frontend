import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Footer } from './Footer'; // Path fixed to stay in the current layout folder

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Simple Public Header */}
      <header className="h-20 bg-white border-b border-gray-100 flex items-center px-6 md:px-12 justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Kaagaz<span className="text-blue-600">Seva</span>
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-gray-600 items-center">
          <Link to="/help" className="hover:text-blue-600">Support</Link>
          <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            Login
          </Link>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
};