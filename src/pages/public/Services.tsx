import React, { useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

const SERVICE_CATEGORIES = [
  { id: 'identity', title: 'Identity & Citizenship', items: ['Aadhaar Card', 'Voter ID', 'Passport'] },
  { id: 'tax', title: 'Tax & Finance', items: ['PAN Card', 'GST Registration', 'ITR Filing'] },
  { id: 'legal', title: 'Legal & Property', items: ['Affidavits', 'Rental Agreement', 'Land Records'] },
];

export const Services: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
        <Input 
          placeholder="Search for a service (e.g. Aadhaar, GST)..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-lg py-6"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICE_CATEGORIES.map((cat) => (
          <div key={cat.id} className="space-y-4">
            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest">{cat.title}</h3>
            <div className="space-y-3">
              {cat.items.map(item => (
                <Card key={item} className="hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{item}</span>
                    <span className="text-gray-300">→</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};