import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { applicationService } from '../../modules/application/applicationService';

const ApplyService: React.FC = () => {

  const navigate = useNavigate();

  const [serviceType, setServiceType] = useState('');
  const [stateName, setStateName] = useState('');
  const [district, setDistrict] = useState('');
  const [govtFee, setGovtFee] = useState('');
  const [mode, setMode] = useState<'DIGITAL' | 'DOORSTEP'>('DIGITAL');

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerLat, setCustomerLat] = useState<number | null>(null);
  const [customerLng, setCustomerLng] = useState<number | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  //////////////////////////////////////////////////////
  // GET GPS LOCATION
  //////////////////////////////////////////////////////

  const captureLocation = () => {

    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCustomerLat(pos.coords.latitude);
        setCustomerLng(pos.coords.longitude);
      },
      () => {
        alert('Unable to capture location');
      }
    );

  };

  //////////////////////////////////////////////////////
  // SUBMIT APPLICATION
  //////////////////////////////////////////////////////

  const handleSubmit = async () => {

    if (
      !serviceType ||
      !stateName ||
      !district ||
      !govtFee ||
      files.length === 0
    ) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {

      const application = await applicationService.create({
        serviceType,
        state: stateName,
        district,
        govtFee: Number(govtFee),
        mode,
        customerLat,
        customerLng,
        deliveryAddress,
        documents: files,
      });

      //////////////////////////////////////////////////////
      // REDIRECT TO PAYMENT
      //////////////////////////////////////////////////////

      navigate(`/customer/payment/${application.id}`);

    } catch (err) {

      console.error(err);
      alert('Application submission failed');

    } finally {

      setLoading(false);

    }

  };

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

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
            onChange={(e) =>
              setMode(e.target.value as 'DIGITAL' | 'DOORSTEP')
            }
          >
            <option value="DIGITAL">Digital</option>
            <option value="DOORSTEP">Doorstep</option>
          </select>

          {mode === 'DOORSTEP' && (
            <>
              <Input
                label="Delivery Address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />

              <Button onClick={captureLocation}>
                Capture Location
              </Button>
            </>
          )}

          <input
            type="file"
            multiple
            onChange={(e) => {
              if (!e.target.files) return;
              setFiles(Array.from(e.target.files));
            }}
          />

          <Button
            fullWidth
            isLoading={loading}
            onClick={handleSubmit}
          >
            Submit Application
          </Button>

        </div>

      </Card>

    </div>

  );

};

export default ApplyService;