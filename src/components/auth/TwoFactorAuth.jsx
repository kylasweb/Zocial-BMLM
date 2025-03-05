import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { QRCode } from 'react-qr-code';
import { toast } from 'react-toastify';
import { setTwoFactorEnabled } from '../../store/authSlice';

export default function TwoFactorAuth() {
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const dispatch = useDispatch();

  const enableTwoFactor = async () => {
    try {
      const response = await fetch('/api/auth/2fa/enable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setSecret(data.secret);
      setQrCode(data.qrCode);
    } catch (error) {
      toast.error('Failed to enable 2FA');
    }
  };

  const verifyTwoFactor = async () => {
    try {
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationCode, secret }),
      });
      
      if (response.ok) {
        dispatch(setTwoFactorEnabled(true));
        toast.success('2FA enabled successfully');
      } else {
        toast.error('Invalid verification code');
      }
    } catch (error) {
      toast.error('Failed to verify 2FA');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Two-Factor Authentication</h2>
      
      {!secret ? (
        <button
          onClick={enableTwoFactor}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Enable 2FA
        </button>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center">
            <QRCode value={qrCode} />
          </div>
          <div>
            <p className="mb-2">Enter verification code:</p>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={verifyTwoFactor}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
}