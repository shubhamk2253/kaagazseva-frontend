import React from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const Contact: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-gray-900">Get in touch.</h2>
        <p className="text-gray-500 text-lg">
          Have questions about the platform? Our team is here to help you scale your agent network or secure your documents.
        </p>
        
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-4 text-gray-700">
            <span className="p-3 bg-blue-50 text-blue-600 rounded-full">📍</span>
            <span>Digital India Tower, New Delhi</span>
          </div>
          <div className="flex items-center gap-4 text-gray-700">
            <span className="p-3 bg-blue-50 text-blue-600 rounded-full">📧</span>
            <span>support@kaagazseva.com</span>
          </div>
        </div>
      </div>

      <Card title="Send us a message">
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Full Name" placeholder="John Doe" />
            <Input label="Email" placeholder="john@example.com" />
          </div>
          <Input label="Subject" placeholder="Inquiry about Agent Registration" />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Message</label>
            <textarea 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none"
              placeholder="How can we help?"
            />
          </div>
          <Button fullWidth>Submit Inquiry</Button>
        </form>
      </Card>
    </div>
  );
};