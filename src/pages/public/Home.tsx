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

// ── Constants ──────────────────────────────────────────────────────────────
// Extracted so metrics and trust cards can be updated in one place
// without touching JSX.

const TRUST_CARDS = [
  {
    id: 'escrow',
    icon: ShieldCheck,
    title: 'Secure Escrow Engine',
    desc: 'Funds are held securely until verified service completion.',
  },
  {
    id: 'agents',
    icon: Users,
    title: 'Verified Agent Network',
    desc: 'District-level onboarding with structured monitoring.',
  },
  {
    id: 'coverage',
    icon: MapPin,
    title: 'Nationwide Coverage',
    desc: 'Intelligent assignment across geography and performance.',
  },
  {
    id: 'completion',
    icon: FileCheck,
    title: 'Structured Completion',
    desc: 'Digital, doorstep and full-completion service modes.',
  },
] as const;

const METRICS = [
  { id: 'services',    label: 'Services Supported',   val: '400+' },
  { id: 'agents',      label: 'Verified Agents',       val: '10K+' },
  { id: 'completion',  label: 'Completion Rate',        val: '99%+' },
  { id: 'coverage',    label: 'Operational Coverage',  val: 'Pan-India' },
] as const;

// ── Component ──────────────────────────────────────────────────────────────

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F6F8FB] text-slate-900">

      {/* ================= HERO ================= */}
      <section className="pt-36 pb-32 px-6 max-w-7xl mx-auto text-center">

        {/* Institutional Tag — bumped to text-xs (12px min for readability) */}
        <div className="inline-block mb-12 px-6 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
            National Digital Service Infrastructure
          </span>
        </div>

        {/*
          FIX: Removed hard <br /> which broke layout at mid-range widths.
          Using [text-wrap:balance] so the browser wraps naturally and evenly.
        */}
        <h1 className="[text-wrap:balance] text-[clamp(2.5rem,6vw,4.625rem)] font-black leading-[1.08] tracking-tight mb-8">
          India's Trusted Infrastructure for Citizen Services
        </h1>

        {/*
          FIX: Removed the hidden-md <br /> — paragraph reflows naturally.
        */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed mb-16">
          Verified agents. Escrow-secured payments. Structured execution workflows.
          Apply for Aadhaar, PAN, and 400+ essential government services with confidence.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">

          {/*
            FIX: "Apply Now" routes to /login with role=citizen so the
            login/signup page can pre-select the correct flow.
          */}
          <Link to="/login?role=citizen">
            <Button
              size="lg"
              className="h-16 px-14 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl shadow-xl shadow-blue-200 flex items-center gap-3"
            >
              Apply Now
              {/* FIX: decorative icon — hidden from assistive tech */}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Button>
          </Link>

          {/*
            FIX: "Become an Agent" routes to /login with role=agent.
            Previously both buttons went to /login with no context.
          */}
          <Link to="/login?role=agent">
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
      <section className="py-28 bg-white border-y border-slate-200" aria-label="Platform trust features">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-14">

          {TRUST_CARDS.map(({ id, icon: Icon, title, desc }) => (
            <div
              key={id}          /* FIX: stable string key, not array index */
              className={[
                'bg-slate-50 border border-slate-200 rounded-2xl p-8',
                /*
                  FIX: transition-shadow instead of transition-all — only the
                  shadow changes on hover so this is more performant.
                  Added focus-visible ring for future interactivity readiness.
                */
                'hover:shadow-lg transition-shadow duration-300',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2',
              ].join(' ')}
            >
              {/*
                FIX: Icon wrapper carries an aria-hidden so the icon's visual
                meaning is conveyed by the heading text beside it, not announced
                redundantly by screen readers.
              */}
              <div className="mb-6" aria-hidden="true">
                <Icon className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-lg font-bold mb-3">{title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= SCALE METRICS ================= */}
      <section className="py-32 bg-[#F6F8FB]" aria-label="Platform scale">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">

            {METRICS.map(({ id, label, val }) => (
              <div key={id}>   {/* FIX: stable string key */}
                {/*
                  Using aria-label on the stat block so screen readers announce
                  "400+ Services Supported" as a unit rather than two
                  disconnected strings.
                */}
                <p
                  className="text-5xl font-black text-blue-700 mb-3"
                  aria-label={`${val} ${label}`}
                >
                  {val}
                </p>
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400"
                  aria-hidden="true"   /* label already read above */
                >
                  {label}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-28 bg-gradient-to-r from-blue-700 to-indigo-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
            Simplifying Citizen Services Across India
          </h2>

          {/*
            FIX: Added a subtext line so the CTA section feels less sparse
            and gives users a reason to click before they hit the button.
          */}
          <p className="text-blue-100 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join millions of citizens who've completed government applications
            securely, faster, and without queues.
          </p>

          <Link to="/login?role=citizen">
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
