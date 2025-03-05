import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useNetwork } from '../contexts/NetworkContext';
import { useAuth } from '../contexts/AuthContext';

export const usePayments = () => {
  const { network } = useNetwork();
  const { user } = useAuth();
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const processCryptoPayment = async (amount, token) => {
    try {
      setProcessingPayment(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      // Implement crypto payment logic
      const transaction = await signer.sendTransaction({
        to: process.env.VITE_PAYMENT_ADDRESS,
        value: ethers.utils.parseEther(amount.toString())
      });
      
      await transaction.wait();
      return transaction.hash;
    } catch (error) {
      console.error('Crypto payment failed:', error);
      throw error;
    } finally {
      setProcessingPayment(false);
    }
  };

  const processFiatPayment = async (amount, currency, method) => {
    try {
      setProcessingPayment(true);
      // Implement fiat payment logic based on the method (stripe, paypal, etc.)
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, method, userId: user.id })
      });
      
      if (!response.ok) throw new Error('Payment failed');
      return await response.json();
    } catch (error) {
      console.error('Fiat payment failed:', error);
      throw error;
    } finally {
      setProcessingPayment(false);
    }
  };

  const processPurchase = async (amount, currency, method) => {
    try {
      if (method === 'crypto') {
        return await processCryptoPayment(amount, currency);
      } else {
        return await processFiatPayment(amount, currency, method);
      }
    } catch (error) {
      console.error('Purchase failed:', error);
      throw error;
    }
  };

  const fetchPaymentHistory = useCallback(async () => {
    try {
      const response = await fetch(`/api/payment-history/${user.id}`);
      const history = await response.json();
      setPaymentHistory(history);
    } catch (error) {
      console.error('Failed to fetch payment history:', error);
    }
  }, [user.id]);

  return {
    processPurchase,
    processingPayment,
    paymentHistory,
    fetchPaymentHistory
  };
};