import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiCheck } from 'react-icons/fi';

export default function VerificationFlow() {
  const [verificationState, setVerificationState] = useState({
    email: {
      verified: false,
      code: '',
      sending: false
    },
    phone: {
      verified: false,
      code: '',
      sending: false
    }
  });

  const sendVerificationCode = async (type) => {
    setVerificationState(prev => ({
      ...prev,
      [type]: { ...prev[type], sending: true }
    }));

    try {
      // API call to send verification code
      await sendCode(type);
      
      setVerificationState(prev => ({
        ...prev,
        [type]: { ...prev[type], sending: false }
      }));
    } catch (error) {
      console.error(`Error sending ${type} verification:`, error);
    }
  };

  const verifyCode = async (type) => {
    try {
      // API call to verify code
      const success = await verifyCodeWithAPI(type, verificationState[type].code);
      
      if (success) {
        setVerificationState(prev => ({
          ...prev,
          [type]: { ...prev[type], verified: true }
        }));
      }
    } catch (error) {
      console.error(`Error verifying ${type} code:`, error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Verification */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FiMail className="mr-2" />
            <h3 className="font-medium">Email Verification</h3>
          </div>
          {verificationState.email.verified && (
            <span className="text-green-500 flex items-center">
              <FiCheck className="mr-1" /> Verified
            </span>
          )}
        </div>

        {!verificationState.email.verified && (
          <div className="space-y-4">
            <button
              className="w-full p-2 bg-blue-600 text-white rounded"
              onClick={() => sendVerificationCode('email')}
              disabled={verificationState.email.sending}
            >
              {verificationState.email.sending ? 'Sending...' : 'Send Verification Code'}
            </button>

            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded"
                placeholder="Enter verification code"
                value={verificationState.email.code}
                onChange={(e) => setVerificationState(prev => ({
                  ...prev,
                  email: { ...prev.email, code: e.target.value }
                }))}
              />
              <button
                className="px-4 bg-green-600 text-white rounded"
                onClick={() => verifyCode('email')}
              >
                Verify
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* SMS Verification */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FiPhone className="mr-2" />
            <h3 className="font-medium">Phone Verification</h3>
          </div>
          {verificationState.phone.verified && (
            <span className="text-green-500 flex items-center">
              <FiCheck className="mr-1" /> Verified
            </span>
          )}
        </div>

        {!verificationState.phone.verified && (
          <div className="space-y-4">
            <button
              className="w-full p-2 bg-blue-600 text-white rounded"
              onClick={() => sendVerificationCode('phone')}
              disabled={verificationState.phone.sending}
            >
              {verificationState.phone.sending ? 'Sending...' : 'Send SMS Code'}
            </button>

            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded"
                placeholder="Enter SMS code"
                value={verificationState.phone.code}
                onChange={(e) => setVerificationState(prev => ({
                  ...prev,
                  phone: { ...prev.phone, code: e.target.value }
                }))}
              />
              <button
                className="px-4 bg-green-600 text-white rounded"
                onClick={() => verifyCode('phone')}
              >
                Verify
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}