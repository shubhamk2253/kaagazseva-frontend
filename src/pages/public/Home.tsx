import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="text-center pt-12">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
          Your Documents, <span className="text-blue-600">Simplified.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10 leading-relaxed">
          The National Digital Infrastructure for government services. Connect with verified agents to handle your Aadhaar, PAN, and 100+ other services securely.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/login">
            <Button className="px-8 py-4 text-lg">Get Started Now</Button>
          </Link>
          <Link to="/services">
            <Button variant="outline" className="px-8 py-4 text-lg">View All Services</Button>
          </Link>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-blue-600 rounded-3xl p-12 text-white">
        <div className="text-center">
          <h3 className="text-4xl font-bold mb-2">500k+</h3>
          <p className="text-blue-100 uppercase text-xs tracking-widest">Applications Processed</p>
        </div>
        <div className="text-center border-y md:border-y-0 md:border-x border-blue-500 py-6 md:py-0">
          <h3 className="text-4xl font-bold mb-2">10k+</h3>
          <p className="text-blue-100 uppercase text-xs tracking-widest">Verified Agents</p>
        </div>
        <div className="text-center">
          <h3 className="text-4xl font-bold mb-2">99.9%</h3>
          <p className="text-blue-100 uppercase text-xs tracking-widest">Security Uptime</p>
        </div>
      </section>
    </div>
  );
};