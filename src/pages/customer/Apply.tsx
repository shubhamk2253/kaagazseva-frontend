import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { applicationService } from '../../modules/application/applicationService';

const ApplyService: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service_type: '',
    pincode: '',
    documents: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await applicationService.create(formData);
      navigate('/customer/applications');
    } catch (err) {
      alert('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* STEP PROGRESS BAR */}
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
          <div className="grid grid-cols-1 gap-3">
            {[
              'Aadhaar Update',
              'PAN Card',
              'Voter ID',
              'Income Certificate',
            ].map((service) => (
              <button
                key={service}
                onClick={() => {
                  setFormData({ ...formData, service_type: service });
                  setStep(2);
                }}
                className={`p-4 border rounded-xl text-left hover:border-blue-500 transition-all ${
                  formData.service_type === service
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <Input
              label="Service Area Pincode"
              placeholder="400001"
              value={formData.pincode}
              onChange={(e) =>
                setFormData({ ...formData, pincode: e.target.value })
              }
            />

            <Button fullWidth onClick={() => setStep(3)}>
              Next: Documents
            </Button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 text-center">
              <p className="text-slate-500 mb-4">
                Click to upload photos of original documents
              </p>

              <input type="file" className="hidden" id="file-up" />

              <label
                htmlFor="file-up"
                className="cursor-pointer text-blue-600 font-bold"
              >
                Select Files
              </label>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setStep(2)}
              >
                Back
              </Button>

              <Button
                fullWidth
                isLoading={loading}
                onClick={handleSubmit}
              >
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