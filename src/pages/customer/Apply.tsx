import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import apiClient from '../../config/apiClient';

const ApplyService: React.FC = () => {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState('');
  const [pincode, setPincode] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!serviceType || !pincode) return;

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('serviceType', serviceType);
      formData.append('pincode', pincode);

      files.forEach((file) => {
        formData.append('documents', file);
      });

      await apiClient.post('/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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

      <div className="flex justify-between mb-8 px-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 w-full mx-1 rounded-full ${
              step >= s ? 'bg-blue-600' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      <Card
        title={
          step === 1
            ? 'Select Service'
            : step === 2
            ? 'Basic Details'
            : 'Upload Documents'
        }
      >
        {/* STEP 1 */}
        {step === 1 && (
          <div className="grid gap-3">
            {['Aadhaar Update', 'PAN Card', 'Voter ID'].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setServiceType(s);
                  setStep(2);
                }}
                className="p-4 border rounded-xl hover:border-blue-500"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <Input
              label="Service Area Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <Button fullWidth onClick={() => setStep(3)}>
              Next
            </Button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <input
              type="file"
              multiple
              onChange={(e) => {
                if (!e.target.files) return;
                setFiles(Array.from(e.target.files));
              }}
            />

            <div className="flex gap-4">
              <Button variant="outline" fullWidth onClick={() => setStep(2)}>
                Back
              </Button>

              <Button fullWidth isLoading={loading} onClick={handleSubmit}>
                Submit Application
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ApplyService;