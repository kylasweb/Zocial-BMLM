import { useCallback } from 'react';

export function useTokenCrypto() {
  const generateKey = useCallback(async () => {
    return await window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt']
    );
  }, []);

  const encryptToken = useCallback(async (data) => {
    const key = await generateKey();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encodedData = new TextEncoder().encode(JSON.stringify(data));
    
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      encodedData
    );

    return {
      encryptedData: Array.from(new Uint8Array(encryptedData)),
      iv: Array.from(iv)
    };
  }, [generateKey]);

  const decryptToken = useCallback(async (encryptedData, key, iv) => {
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: new Uint8Array(iv)
      },
      key,
      new Uint8Array(encryptedData)
    );

    return JSON.parse(new TextDecoder().decode(decryptedData));
  }, []);

  return {
    encryptToken,
    decryptToken
  };
}