import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-24 pb-24 bg-white">

      {/* ================= HERO ================= */}
      <section className="relative text-center pt-20 px-6 max-w-6xl mx-auto">

        {/* Subtle Accent Line */}
        <div className="inline-block px-4 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold tracking-widest uppercase mb-6">
          National Digital Infrastructure
        </div>

        <h1 className="text-[56px] md:text-[64px] font-extrabold text-slate-900 leading-tight tracking-tight">
          India’s Trusted <span className="text-blue-700">Digital Service Network</span>
        </h1>

        <p className="max-w-3xl mx-auto mt-6 text-lg text-slate-600 leading-relaxed">
          Verified Agents. Secure Payments. Real Completion.
          <br />
          Apply for Aadhaar, PAN, and 100+ government services with
          end-to-end professional assistance.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-6 mt-10 flex-wrap">
          <Link to="/login">
            <Button className="px-10 py-4 text-lg bg-blue-700 hover:bg-blue-800 text-white shadow-lg shadow-blue-200 rounded-2xl">
              Apply Now
            </Button>
          </Link>

          <Link to="/login">
            <Button
              variant="outline"
              className="px-10 py-4 text-lg border-2 border-blue-700 text-blue-700 hover:bg-blue-50 rounded-2xl"
            >
              Become an Agent
            </Button>
          </Link>
        </div>
      </section>

      {/* ================= TRUST SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            🔐 Secure Payment Engine
          </h3>
          <p className="text-sm text-slate-600">
            Escrow-based controlled payout system ensures fair delivery and secure transactions.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            🛡 Verified Agent Network
          </h3>
          <p className="text-sm text-slate-600">
            State & district-based intelligent assignment system with strict performance tracking.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            ⚙ Structured Service Model
          </h3>
          <p className="text-sm text-slate-600">
            Digital, Doorstep & Full Completion modes for complete service flexibility.
          </p>
        </div>

      </section>

      {/* ================= STATS ================= */}
      <section className="bg-blue-700 text-white py-16 mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center px-6">

          <div>
            <h3 className="text-4xl font-extrabold mb-2">100+</h3>
            <p className="text-sm uppercase tracking-widest text-blue-100">
              Government Services
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-extrabold mb-2">10k+</h3>
            <p className="text-sm uppercase tracking-widest text-blue-100">
              Verified Agents
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-extrabold mb-2">Nationwide</h3>
            <p className="text-sm uppercase tracking-widest text-blue-100">
              Structured Operations
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;