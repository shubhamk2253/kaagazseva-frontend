import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { applicationService } from '../../modules/application/applicationService';
import { paymentService } from '../../modules/payment/paymentService';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentPage: React.FC = () => {

  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();

  const [application, setApplication] = useState<any>(null);
  const [processing, setProcessing] = useState(false);

  //////////////////////////////////////////////////////
  // LOAD APPLICATION
  //////////////////////////////////////////////////////

  useEffect(() => {

    const loadApplication = async () => {

      if (!applicationId) return;

      try {

        const app = await applicationService.getById(applicationId);
        setApplication(app);

      } catch (err) {

        console.error('Failed to load application', err);

      }

    };

    loadApplication();

  }, [applicationId]);

  //////////////////////////////////////////////////////
  // HANDLE PAYMENT
  //////////////////////////////////////////////////////

  const handlePayment = async () => {

    if (!applicationId || !application) return;

    try {

      setProcessing(true);

      //////////////////////////////////////////////////////
      // CREATE ORDER
      //////////////////////////////////////////////////////

      const order = await paymentService.createOrder(applicationId);

      //////////////////////////////////////////////////////
      // RAZORPAY OPTIONS
      //////////////////////////////////////////////////////

      const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY,

        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,

        name: 'KaagazSeva',
        description: 'Government Service Payment',

        prefill: {
          name: application.customer?.name,
          contact: application.customer?.phoneNumber
        },

        theme: {
          color: '#2563eb'
        },

        handler: () => {

          // Payment verified via webhook
          navigate(`/customer/application/${applicationId}`);

        }

      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {

      console.error('Payment failed', err);
      setProcessing(false);

    }

  };

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (!application) {
    return <LoadingSpinner />;
  }

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (

    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Complete Payment
      </h1>

      <div className="bg-white shadow rounded-xl p-6 mb-6">

        <h2 className="text-lg font-semibold border-b pb-2">
          {application.serviceType}
        </h2>

        <div className="mt-4 space-y-2">

          <div className="flex justify-between">
            <span>Government Fee</span>
            <span>₹{application.govtFee}</span>
          </div>

          <div className="flex justify-between">
            <span>Service Fee</span>
            <span>₹{application.serviceFee}</span>
          </div>

          {application.deliveryFee > 0 && (
            <div className="flex justify-between">
              <span>Doorstep Delivery</span>
              <span>₹{application.deliveryFee}</span>
            </div>
          )}

          <div className="flex justify-between font-bold text-xl border-t pt-3 mt-3">
            <span>Total Payable</span>
            <span>₹{application.totalAmount}</span>
          </div>

        </div>

      </div>

      <button
        disabled={processing || application.status !== 'DRAFT'}
        onClick={handlePayment}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:bg-gray-400"
      >

        {processing
          ? 'Securing Transaction...'
          : `Pay ₹${application.totalAmount}`}

      </button>

      <p className="text-center text-xs text-gray-500 mt-4">
        🔒 Secured by Razorpay. Funds remain protected in escrow until service completion.
      </p>

    </div>

  );

};

export default PaymentPage;