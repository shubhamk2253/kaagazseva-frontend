import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PaymentGateway } from '@/services/payment.gateway';
import { usePaymentStore } from '@/store/paymentStore';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const PaymentPage: React.FC = () => {

const { applicationId } = useParams<{ applicationId: string }>();
const navigate = useNavigate();

const [isProcessing, setIsProcessing] = useState(false);

const { fetchApplication, currentApp, initiateOrder } = usePaymentStore();

//////////////////////////////////////////////////////
// LOAD APPLICATION
//////////////////////////////////////////////////////

useEffect(() => {

if (applicationId) {
fetchApplication(applicationId);
}

}, [applicationId]);

//////////////////////////////////////////////////////
// PAYMENT HANDLER
//////////////////////////////////////////////////////

const handlePayment = async () => {

if (!applicationId || !currentApp) return;

try {

setIsProcessing(true);

//////////////////////////////////////////////////////
// STEP 1 — CREATE ORDER
//////////////////////////////////////////////////////

const order = await initiateOrder(applicationId);

//////////////////////////////////////////////////////
// STEP 2 — OPEN RAZORPAY
//////////////////////////////////////////////////////

await PaymentGateway.openCheckout(

order,

{
name: currentApp.customer?.name,
phoneNumber: currentApp.customer?.phoneNumber
},

//////////////////////////////////////////////////////
// SUCCESS
//////////////////////////////////////////////////////

async (response: any) => {

await PaymentGateway.verifyPayment(response);

navigate('/customer');

},

//////////////////////////////////////////////////////
// CANCEL
//////////////////////////////////////////////////////

() => {

setIsProcessing(false);

}

);

} catch (err) {

console.error('Payment failed', err);
setIsProcessing(false);

}

};

//////////////////////////////////////////////////////
// LOADING
//////////////////////////////////////////////////////

if (!currentApp) {
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
{currentApp.serviceType}
</h2>

<div className="mt-4 space-y-2">

<div className="flex justify-between">
<span>Government Fee</span>
<span>₹{currentApp.govtFee}</span>
</div>

<div className="flex justify-between">
<span>Service Fee</span>
<span>₹{currentApp.serviceFee}</span>
</div>

{currentApp.deliveryFee > 0 && (
<div className="flex justify-between">
<span>Doorstep Delivery</span>
<span>₹{currentApp.deliveryFee}</span>
</div>
)}

<div className="flex justify-between font-bold text-xl border-t pt-3 mt-3">
<span>Total Payable</span>
<span>₹{currentApp.totalAmount}</span>
</div>

</div>

</div>

<button

disabled={isProcessing || currentApp.status !== 'DRAFT'}

onClick={handlePayment}

className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:bg-gray-400"

>

{isProcessing
? 'Securing Transaction...'
: `Pay ₹${currentApp.totalAmount}`}

</button>

<p className="text-center text-xs text-gray-500 mt-4">
🔒 Secured by Razorpay. Funds remain protected in escrow until service completion.
</p>

</div>

);

};