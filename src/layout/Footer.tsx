import React from 'react';
import { CONFIG } from '../config/env';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-gray-200 pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold text-slate-900 mb-4">KaagazSeva</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Empowering citizens through a decentralized network of verified agents for seamless documentation.
            </p>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/terms" className="hover:text-blue-600 transition-colors">Terms & Conditions</a></li>
              <li><a href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="/refunds" className="hover:text-blue-600 transition-colors">Refund & Cancellation</a></li>
              <li><a href="/data-usage" className="hover:text-blue-600 transition-colors">Data Usage Policy</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/help" className="hover:text-blue-600 transition-colors">Help Center</a></li>
              <li><a href="/tickets" className="hover:text-blue-600 transition-colors">Raise a Ticket</a></li>
              <li><a href="/faq" className="hover:text-blue-600 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Compliance Column */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Compliance</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-400">SSL SECURE</span>
              <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-400">ISO 27001</span>
              <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-400">DPDP COMPLIANT</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} KaagazSeva Digital Private Limited. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-mono">Build: v{CONFIG.VERSION}-stable</p>
        </div>
      </div>
    </footer>
  );
};