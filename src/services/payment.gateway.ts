import apiClient from "@/config/apiClient";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const PaymentGateway = {

  //////////////////////////////////////////////////////
  // OPEN CHECKOUT
  //////////////////////////////////////////////////////

  async openCheckout(
    order: any,
    user: { name?: string; phoneNumber?: string },
    onSuccess: (response: any) => Promise<void>,
    onCancel: () => void
  ) {

    if (!window.Razorpay) {
      throw new Error("Razorpay SDK not loaded");
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,

      amount: order.amount,
      currency: order.currency,

      name: "KaagazSeva",
      description: "Government Service Processing",

      order_id: order.orderId,

      handler: async (response: any) => {

        await apiClient.post("/payments/verify", {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          transactionId: order.transactionId   // IMPORTANT
        });

        await onSuccess(response);
      },

      modal: {
        ondismiss: onCancel,
      },

      prefill: {
        name: user.name || "",
        contact: user.phoneNumber || "",
      },

      theme: {
        color: "#1e40af",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  },
};