import { useState, useCallback } from 'react';
import CryptoJS from 'crypto-js';

export const useEncryption = () => {
  const [encryptionKey] = useState(() => process.env.VITE_ENCRYPTION_KEY || generateSecureKey());

  const generateSecureKey = () => {
    return CryptoJS.lib.WordArray.random(256/8).toString();
  };

  const encryptMessage = useCallback((message) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(message), encryptionKey).toString();
      return {
        data: encrypted,
        timestamp: Date.now(),
        signature: CryptoJS.HmacSHA256(encrypted, encryptionKey).toString()
      };
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Message encryption failed');
    }
  }, [encryptionKey]);

  const decryptMessage = useCallback((encryptedData) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData.data, encryptionKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Message decryption failed');
    }
  }, [encryptionKey]);

  const verifyMessage = useCallback((encryptedData) => {
    const computedSignature = CryptoJS.HmacSHA256(encryptedData.data, encryptionKey).toString();
    return computedSignature === encryptedData.signature;
  }, [encryptionKey]);

  return {
    encryptMessage,
    decryptMessage,
    verifyMessage,
    generateSecureKey
  };
};