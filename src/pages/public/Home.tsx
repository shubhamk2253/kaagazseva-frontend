import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Users, MapPin, FileCheck } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-white text-slate-900">

      {/* ================= HERO ================= */}
      <section className="pt-24 pb-20 px-6 max-w-6xl mx-auto text-center">

        {/* Institutional Tag */}
        <div className="inline-block mb-8 px-4 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold tracking-widest uppercase">
          National Digital Service Infrastructure
        </div>

        <h1 className="text-[56px] md:text-[64px] font-extrabold leading-tight tracking-tight mb-8">
          India’s Digital Backbone <br />
          for Citizen Services
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed mb-12">
          Structured digital assistance for Aadhaar, PAN, and 100+ essential
          government services — powered by verified agents, secure payment
          controls, and monitored execution workflows.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <Link to="/login">
            <Button className="h-14 px-10 text-lg bg-blue-700 hover:bg-blue-800 text-white rounded-2xl shadow-lg shadow-blue-200">
              Apply for a Service
            </Button>
          </Link>

          <Link to="/login">
            <Button
              variant="outline"
              className="h-14 px-10 text-lg border-2 border-blue-700 text-blue-700 hover:bg-blue-50 rounded-2xl"
            >
              Join as Verified Agent
            </Button>
          </Link>
        </div>

      </section>

      {/* ================= TRUST PILLARS ================= */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

          <div className="text-center md:text-left">
            <ShieldCheck className="w-8 h-8 text-blue-700 mb-4 mx-auto md:mx-0" />
            <h3 className="text-lg font-semibold mb-2">
              Secure Payment Engine
            </h3>
            <p className="text-sm text-slate-600">
              Escrow-based transaction system ensuring fair payout only after service validation.
            </p>
          </div>

          <div className="text-center md:text-left">
            <Users className="w-8 h-8 text-blue-700 mb-4 mx-auto md:mx-0" />
            <h3 className="text-lg font-semibold mb-2">
              Verified Agent Network
            </h3>
            <p className="text-sm text-slate-600">
              State and district-level onboarding with structured performance monitoring.
            </p>
          </div>

          <div className="text-center md:text-left">
            <MapPin className="w-8 h-8 text-blue-700 mb-4 mx-auto md:mx-0" />
            <h3 className="text-lg font-semibold mb-2">
              Nationwide Allocation
            </h3>
            <p className="text-sm text-slate-600">
              Intelligent assignment engine based on geography, rating, and workload.
            </p>
          </div>

          <div className="text-center md:text-left">
            <FileCheck className="w-8 h-8 text-blue-700 mb-4 mx-auto md:mx-0" />
            <h3 className="text-lg font-semibold mb-2">
              Structured Completion
            </h3>
            <p className="text-sm text-slate-600">
              Digital, Doorstep and Full-Completion modes for standardized delivery.
            </p>
          </div>

        </div>
      </section>

      {/* ================= SCALE METRICS ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">

            <div>
              <h3 className="text-4xl font-extrabold text-blue-700 mb-2">
                100+
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Services Supported
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-blue-700 mb-2">
                10K+
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Verified Agents
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-blue-700 mb-2">
                99%+
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Completion Reliability
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-blue-700 mb-2">
                Nationwide
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Operational Coverage
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 bg-blue-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Simplifying Citizen Services Across India
          </h2>

          <p className="text-blue-100 mb-10 text-lg">
            A structured marketplace connecting citizens with trusted execution partners.
          </p>

          <Link to="/login">
            <Button className="h-14 px-10 text-lg bg-white text-blue-700 hover:bg-blue-50 rounded-2xl font-semibold">
              Start Your Application
            </Button>
          </Link>

        </div>
      </section>

    </div>
  );
};

export default Home;