import React, { useEffect, useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { publicService, State, Service } from '../../modules/public/publicService';

export const Services: React.FC = () => {

  const [states, setStates] = useState<State[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  //////////////////////////////////////////////////////
  // LOAD STATES
  //////////////////////////////////////////////////////

  useEffect(() => {

    const loadStates = async () => {
      try {

        const data = await publicService.getStates();
        setStates(data);

      } catch (error) {
        console.error('Failed to load states', error);
      }
    };

    loadStates();

  }, []);

  //////////////////////////////////////////////////////
  // LOAD SERVICES WHEN STATE CHANGES
  //////////////////////////////////////////////////////

  useEffect(() => {

    if (!selectedState) return;

    const loadServices = async () => {

      try {

        const data = await publicService.getServices(selectedState);
        setServices(data);

      } catch (error) {
        console.error('Failed to load services', error);
      }

    };

    loadServices();

  }, [selectedState]);

  //////////////////////////////////////////////////////
  // SEARCH FILTER
  //////////////////////////////////////////////////////

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (
    <div className="space-y-12">

      {/* HEADER */}

      <div className="text-center max-w-xl mx-auto space-y-4">

        <h2 className="text-3xl font-bold text-gray-900">
          Government Services
        </h2>

        <Input
          placeholder="Search for a service (e.g. Aadhaar, GST)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-lg py-6"
        />

      </div>

      {/* STATE SELECTOR */}

      <div className="max-w-md mx-auto">

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 text-gray-700"
        >

          <option value="">Select your state</option>

          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}

        </select>

      </div>

      {/* SERVICES GRID */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {filteredServices.map((service) => (

          <Card
            key={service.id}
            className="hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
          >

            <div className="flex justify-between items-center">

              <span className="font-medium text-gray-800">
                {service.name}
              </span>

              <span className="text-gray-300">→</span>

            </div>

          </Card>

        ))}

      </div>

    </div>
  );
};