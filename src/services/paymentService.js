import axios from 'axios';

const paymentService = {
  // Initialize payment
  initializePayment: async (bookingId) => {
    try {
      const { data } = await axios.post(
        '/api/bookings/paystack-payment',
        { bookingId },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Verify payment
  verifyPayment: async (reference) => {
    try {
      const { data } = await axios.post(
        '/api/bookings/verify-payment',
        { reference },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get payment status
  getPaymentStatus: async (bookingId) => {
    try {
      const { data } = await axios.get(
        `/api/bookings/payment-status/${bookingId}`,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
};

export default paymentService;
