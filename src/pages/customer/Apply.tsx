import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import apiClient from '../../config/apiClient';

const ApplyService: React.FC = () => {
  const [step, setStep] = useState(1);

  const [serviceType, setServiceType] = useState('');
  const [stateName, setStateName] = useState('');
  const [district, setDistrict] = useState('');
  const [govtFee, setGovtFee] = useState('');
  const [mode, setMode] = useState<'DIGITAL' | 'DOORSTEP'>('DIGITAL');

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!serviceType || !stateName || !district || !govtFee || files.length === 0) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('serviceType', serviceType);
      formData.append('state', stateName);
      formData.append('district', district);
      formData.append('govtFee', govtFee);
      formData.append('mode', mode);

      files.forEach((file) => {
        formData.append('documents', file);
      });

      await apiClient.post('/applications', formData);

      navigate('/customer');

    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card title="Apply for Service">

        <div className="space-y-4">

          <Input
            label="Service Type"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          />

          <Input
            label="State"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
          />

          <Input
            label="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />

          <Input
            label="Government Fee"
            type="number"
            value={govtFee}
            onChange={(e) => setGovtFee(e.target.value)}
          />

          <select
            className="border rounded p-2 w-full"
            value={mode}
            onChange={(e) => setMode(e.target.value as any)}
          >
            <option value="DIGITAL">Digital</option>
            <option value="DOORSTEP">Doorstep</option>
          </select>

          <input
            type="file"
            multiple
            onChange={(e) => {
              if (!e.target.files) return;
              setFiles(Array.from(e.target.files));
            }}
          />

          <Button fullWidth isLoading={loading} onClick={handleSubmit}>
            Submit Application
          </Button>

        </div>
      </Card>
    </div>
  );
};

export default ApplyService;