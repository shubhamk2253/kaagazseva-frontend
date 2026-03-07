import apiClient from '../../config/apiClient';

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  applicationId: string;
}

export interface VerifyPaymentDTO {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export const paymentService = {

  //////////////////////////////////////////////////////
  // CREATE RAZORPAY ORDER
  //////////////////////////////////////////////////////

  async createOrder(applicationId: string): Promise<CreateOrderResponse> {

    const response = await apiClient.post(
      '/payments/create-order',
      { applicationId }
    );

    if (!response.data?.success) {
      throw new Error(
        response.data?.message || 'Payment order creation failed'
      );
    }

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // VERIFY PAYMENT
  //////////////////////////////////////////////////////

  async verifyPayment(data: VerifyPaymentDTO) {

    const response = await apiClient.post(
      '/payments/verify',
      data
    );

    if (!response.data?.success) {
      throw new Error(
        response.data?.message || 'Payment verification failed'
      );
    }

    return response.data.data;

  },

};