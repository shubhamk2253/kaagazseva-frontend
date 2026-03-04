import apiClient from '@/config/apiClient';

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name?: string;
    contact?: string;
  };
  theme: {
    color: string;
  };
  handler: (response: any) => void;
  modal: {
    ondismiss: () => void;
  };
}

export class PaymentGateway {

  private static SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

  //////////////////////////////////////////////////////
  // LOAD RAZORPAY SCRIPT
  //////////////////////////////////////////////////////

  private static loadScript(): Promise<boolean> {
    return new Promise((resolve) => {

      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = this.SCRIPT_URL;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);

    });
  }

  //////////////////////////////////////////////////////
  // OPEN CHECKOUT
  //////////////////////////////////////////////////////

  static async openCheckout(
    orderData: {
      orderId: string;
      amount: number;
      currency: string;
      transactionId: string;
    },
    user: { name?: string; phoneNumber?: string },
    onSuccess: (response: any) => void,
    onCancel: () => void
  ) {

    const loaded = await this.loadScript();

    if (!loaded) {
      throw new Error('Failed to load Razorpay SDK');
    }

    const options: RazorpayOptions = {

      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: orderData.amount,
      currency: orderData.currency,
      order_id: orderData.orderId,

      name: 'KaagazSeva',
      description: 'Application Payment',

      prefill: {
        name: user.name,
        contact: user.phoneNumber,
      },

      theme: {
        color: '#2563EB',
      },

      handler: (response: any) => {

        onSuccess({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          transactionId: orderData.transactionId,
        });

      },

      modal: {
        ondismiss: () => {
          onCancel();
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);

    rzp.on('payment.failed', (response: any) => {
      console.error('Payment Failed:', response.error);
    });

    rzp.open();
  }

  //////////////////////////////////////////////////////
  // VERIFY PAYMENT
  //////////////////////////////////////////////////////

  static async verifyPayment(payload: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    transactionId: string;
  }) {

    const response = await apiClient.post(
      '/payments/verify',
      payload
    );

    return response.data.data;

  }

}