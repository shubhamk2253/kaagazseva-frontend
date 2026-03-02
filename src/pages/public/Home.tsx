import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Users, MapPin, FileCheck, ArrowRight, Zap } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#FAFBFF] text-slate-900 overflow-hidden">
      
      {/* 🌌 Background "Aura" - Premium Gradient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-orange-50/50 rounded-full blur-[100px] pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto text-center">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-10 animate-fade-in hover:border-blue-300 transition-colors cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            National Digital Infrastructure v2.0
          </span>
        </div>

        <h1 className="text-6xl md:text-[84px] font-[950] text-slate-950 leading-[1.05] tracking-[-0.04em] mb-10">
          The Operating System for <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500">
            Citizen Services
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-14">
          Verified Agents. Secure Escrow. Real Execution. <br className="hidden md:block" />
          The professional gateway for Aadhaar, PAN, and 400+ government services.
        </p>

        {/* Premium CTA Group */}
        <div className="flex flex-col sm:flex-row justify-center gap-5 items-center">
          <Link to="/login">
            <Button size="xl" className="group h-16 px-12 bg-slate-950 hover:bg-blue-700 text-white shadow-2xl shadow-blue-200 flex gap-3">
              Apply for a Service
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="outline" size="xl" className="h-16 px-12 border-slate-200 text-slate-950 hover:bg-white hover:border-blue-600 font-bold">
              Join as Agent
            </Button>
          </Link>
        </div>
      </section>

      {/* ================= BENTO TRUST GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Escrow (Large) */}
          <div className="md:col-span-8 group relative bg-white border border-slate-200 rounded-[32px] p-10 overflow-hidden hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
                <ShieldCheck className="text-blue-700 w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-slate-950 mb-4">Financial Integrity Engine</h3>
              <p className="text-slate-500 text-lg max-w-md leading-relaxed">
                Our proprietary escrow logic holds funds until document verification, 
                eliminating fraud and ensuring 100% trust between citizens and agents.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent opacity-50 rounded-full translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-700" />
          </div>

          {/* Card 2: Speed (Small) */}
          <div className="md:col-span-4 bg-slate-950 rounded-[32px] p-10 text-white flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-500">
            <Zap className="text-orange-400 w-10 h-10 mb-8 animate-pulse" />
            <div>
              <h3 className="text-2xl font-bold mb-3">Instant Allocation</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Smart matching system connects you to the highest-rated local agents in minutes.
              </p>
            </div>
          </div>

          {/* Card 3: Metrics (Small) */}
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-[32px] p-10 flex flex-col justify-between hover:border-blue-300 transition-all">
            <Users className="text-blue-700 w-10 h-10 mb-8" />
            <h3 className="text-2xl font-bold text-slate-950">10,000+ Verified Partners</h3>
          </div>

          {/* Card 4: Service Modes (Large) */}
          <div className="md:col-span-8 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[32px] p-10 text-white flex items-center justify-between group">
            <div className="max-w-xs">
              <h3 className="text-3xl font-bold mb-4">Hybrid Execution</h3>
              <p className="text-blue-100/80 mb-6">Digital uploads or doorstep document pickup. You choose the mode of comfort.</p>
              <FileCheck className="w-12 h-12 text-white/40 group-hover:text-white transition-colors" />
            </div>
            <div className="hidden lg:block text-[120px] font-black opacity-10 select-none tracking-tighter">MODES</div>
          </div>

        </div>
      </section>

      {/* ================= MINIMALIST SCALE METRICS ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center gap-12 py-16 border-y border-slate-200/60">
            {[
              { label: 'Services Live', val: '400+' },
              { label: 'Uptime', val: '99.9%' },
              { label: 'Security', val: 'AES-256' },
              { label: 'Network', val: 'Pan-India' },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <p className="text-5xl font-[950] text-slate-950 mb-2">{stat.val}</p>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ELITE FOOTER CTA ================= */}
      <section className="relative mx-6 mb-12 py-24 bg-slate-950 rounded-[48px] text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
            Ready to experience the future of <br /> government services?
          </h2>
          <Link to="/login">
            <Button size="xl" className="h-16 px-12 bg-white text-slate-950 hover:bg-blue-50 rounded-2xl font-bold shadow-xl">
              Launch Application Portal
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;