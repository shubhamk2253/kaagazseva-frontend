import { paymentService } from './paymentService';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const openRazorpayCheckout = async (
  applicationId: string,
  user: {
    name?: string;
    phoneNumber: string;
  }
) => {

  const order = await paymentService.createOrder(applicationId);

  const options = {

    key: import.meta.env.VITE_RAZORPAY_KEY,

    amount: order.amount,
    currency: order.currency,
    order_id: order.orderId,

    name: 'KaagazSeva',
    description: 'Government Service Application',

    prefill: {
      name: user.name,
      contact: user.phoneNumber
    },

    theme: {
      color: '#2563eb'
    },

    handler: () => {

      // Backend webhook will finalize payment
      window.location.href = `/customer/application/${applicationId}`;

    }

  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();

};