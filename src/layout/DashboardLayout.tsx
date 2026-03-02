import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#F4F7FB] overflow-hidden">

      {/* ================= SIDEBAR ================= */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* ================= MAIN WRAPPER ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* NAVBAR */}
        <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

        {/* ================= CONTENT AREA ================= */}
        <main className="flex-1 overflow-y-auto">

          <div className="max-w-7xl mx-auto px-8 py-10">

            {/* Elevated Content Surface */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[calc(100vh-160px)] p-10">

              <Outlet />

            </div>

          </div>

        </main>

      </div>
    </div>
  );
};