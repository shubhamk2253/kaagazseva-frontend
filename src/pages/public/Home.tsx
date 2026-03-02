import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import {
  ShieldCheck,
  Users,
  MapPin,
  FileCheck,
  ArrowRight,
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F6F8FB] text-slate-900">

      {/* ================= HERO ================= */}
      <section className="pt-36 pb-32 px-6 max-w-7xl mx-auto text-center">

        {/* Institutional Tag */}
        <div className="inline-block mb-12 px-6 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
            National Digital Service Infrastructure
          </span>
        </div>

        <h1 className="text-[58px] md:text-[74px] font-black leading-[1.08] tracking-tight mb-8">
          India’s Trusted Infrastructure <br />
          for Citizen Services
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed mb-16">
          Verified agents. Escrow-secured payments. Structured execution workflows.
          <br className="hidden md:block" />
          Apply for Aadhaar, PAN, and 400+ essential government services with confidence.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/login">
            <Button
              size="lg"
              className="h-16 px-14 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl shadow-xl shadow-blue-200 flex items-center gap-3"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>

          <Link to="/login">
            <Button
              variant="outline"
              size="lg"
              className="h-16 px-14 border-2 border-blue-700 text-blue-700 hover:bg-blue-50 rounded-2xl font-semibold"
            >
              Become an Agent
            </Button>
          </Link>
        </div>
      </section>

      {/* ================= TRUST GRID ================= */}
      <section className="py-28 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-14">

          {[
            {
              icon: <ShieldCheck className="w-8 h-8 text-blue-700" />,
              title: 'Secure Escrow Engine',
              desc: 'Funds are held securely until verified service completion.'
            },
            {
              icon: <Users className="w-8 h-8 text-blue-700" />,
              title: 'Verified Agent Network',
              desc: 'District-level onboarding with structured monitoring.'
            },
            {
              icon: <MapPin className="w-8 h-8 text-blue-700" />,
              title: 'Nationwide Coverage',
              desc: 'Intelligent assignment across geography and performance.'
            },
            {
              icon: <FileCheck className="w-8 h-8 text-blue-700" />,
              title: 'Structured Completion',
              desc: 'Digital, doorstep and full-completion service modes.'
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-lg font-bold mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= SCALE METRICS ================= */}
      <section className="py-32 bg-[#F6F8FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">

            {[
              { label: 'Services Supported', val: '400+' },
              { label: 'Verified Agents', val: '10K+' },
              { label: 'Completion Rate', val: '99%+' },
              { label: 'Operational Coverage', val: 'Pan-India' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-5xl font-black text-blue-700 mb-3">
                  {stat.val}
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-28 bg-gradient-to-r from-blue-700 to-indigo-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-10 leading-tight">
            Simplifying Citizen Services Across India
          </h2>

          <Link to="/login">
            <Button
              size="lg"
              className="h-16 px-14 bg-white text-blue-700 hover:bg-blue-50 rounded-2xl font-semibold shadow-xl"
            >
              Launch Application Portal
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;