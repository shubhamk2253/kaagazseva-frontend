import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { applicationService } from '../../modules/application/applicationService';

const ApplyService: React.FC = () => {

  const navigate = useNavigate();

  const [serviceId, setServiceId] = useState('');
  const [stateId, setStateId] = useState('');
  const [pincode, setPincode] = useState('');

  const [mode, setMode] = useState<'DIGITAL' | 'DOORSTEP'>('DIGITAL');

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerLat, setCustomerLat] = useState<number | undefined>();
  const [customerLng, setCustomerLng] = useState<number | undefined>();

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  //////////////////////////////////////////////////////
  // CAPTURE GPS
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

    if (!serviceId || !stateId || !pincode) {
      alert('Please fill required fields');
      return;
    }

    setLoading(true);

    try {

      const application = await applicationService.create({
        serviceId,
        stateId,
        pincode,
        mode,
        customerLat,
        customerLng,
        deliveryAddress,
        documents: files
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
            label="Service ID"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
          />

          <Input
            label="State ID"
            value={stateId}
            onChange={(e) => setStateId(e.target.value)}
          />

          <Input
            label="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
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