import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Users, MapPin, FileCheck } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-[#FAFBFF] text-slate-900">

      {/* ================= HERO ================= */}
      <section className="pt-32 pb-28 px-6 max-w-6xl mx-auto text-center">

        <div className="inline-block mb-10 px-5 py-2 rounded-full bg-orange-50 text-orange-600 text-xs font-bold tracking-[0.2em] uppercase">
          National Digital Infrastructure
        </div>

        <h1 className="text-[56px] md:text-[64px] font-extrabold leading-[1.1] tracking-tight mb-10">
          India’s Digital Backbone <br />
          for Citizen Services
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed mb-14">
          Structured digital assistance for Aadhaar, PAN and 100+ essential government services —
          powered by verified agents, escrow-protected payments and monitored execution workflows.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/login">
            <Button className="h-14 px-12 text-lg bg-blue-700 hover:bg-blue-800 text-white rounded-2xl shadow-xl shadow-blue-200 transition-all duration-300">
              Apply for a Service
            </Button>
          </Link>

          <Link to="/login">
            <Button
              variant="outline"
              className="h-14 px-12 text-lg border-2 border-blue-700 text-blue-700 hover:bg-blue-50 rounded-2xl font-semibold transition-all duration-300"
            >
              Join as Verified Agent
            </Button>
          </Link>
        </div>

      </section>

      {/* ================= TRUST SECTION ================= */}
      <section className="py-28 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">

          {[
            {
              icon: ShieldCheck,
              title: "Secure Payment Engine",
              desc: "Escrow-controlled payout system ensuring release only after service validation."
            },
            {
              icon: Users,
              title: "Verified Agent Network",
              desc: "State and district-level onboarding with structured performance monitoring."
            },
            {
              icon: MapPin,
              title: "Nationwide Allocation",
              desc: "Intelligent matching based on geography, rating and workload balancing."
            },
            {
              icon: FileCheck,
              title: "Structured Completion",
              desc: "Digital, Doorstep and Full-Completion service modes."
            }
          ].map((item, i) => (
            <div key={i} className="text-center md:text-left">
              <item.icon className="w-9 h-9 text-blue-700 mb-6 mx-auto md:mx-0" />
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
      <section className="py-32 bg-[#FAFBFF]">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center md:text-left">

            {[
              { value: "100+", label: "Services Supported" },
              { value: "10K+", label: "Verified Agents" },
              { value: "99%+", label: "Completion Reliability" },
              { value: "Nationwide", label: "Operational Coverage" }
            ].map((stat, i) => (
              <div key={i}>
                <h3 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-3">
                  {stat.value}
                </h3>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-28 bg-blue-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 leading-tight">
            Simplifying Citizen Services Across India
          </h2>

          <p className="text-blue-100 mb-12 text-lg max-w-2xl mx-auto">
            A structured national marketplace connecting citizens with trusted execution partners.
          </p>

          <Link to="/login">
            <Button className="h-14 px-12 text-lg bg-white text-blue-700 hover:bg-blue-50 rounded-2xl font-semibold shadow-lg transition-all duration-300">
              Start Your Application
            </Button>
          </Link>

        </div>
      </section>

    </div>
  );
};

export default Home;