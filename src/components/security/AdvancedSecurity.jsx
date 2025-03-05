import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiSmartphone, FiLock } from 'react-icons/fi';
import ReCAPTCHA from 'react-google-recaptcha';

export default function AdvancedSecurity() {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    biometricLogin: false,
    deviceVerification: true,
    loginNotifications: true,
    captchaOnLogin: true,
    strongPasswordPolicy: true
  });

  const [verificationMethod, setVerificationMethod] = useState('email');
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleSettingChange = (setting) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    // Verify captcha with backend
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FiShield className="mr-2" /> Advanced Security Settings
        </h2>

        <div className="space-y-4">
          {/* Two-Factor Authentication */}
          <motion.div
            className="p-4 border rounded-lg"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FiSmartphone className="mr-2" />
                <h3 className="font-medium">Two-Factor Authentication</h3>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={securitySettings.twoFactorAuth}
                  onChange={() => handleSettingChange('twoFactorAuth')}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            {securitySettings.twoFactorAuth && (
              <div className="ml-8 space-y-2">
                <select
                  value={verificationMethod}
                  onChange={(e) => setVerificationMethod(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="authenticator">Authenticator App</option>
                </select>
              </div>
            )}
          </motion.div>

          {/* CAPTCHA Settings */}
          <motion.div
            className="p-4 border rounded-lg"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FiLock className="mr-2" />
                <h3 className="font-medium">CAPTCHA on Login</h3>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={securitySettings.captchaOnLogin}
                  onChange={() => handleSettingChange('captchaOnLogin')}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            {securitySettings.captchaOnLogin && (
              <div className="ml-8">
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  onChange={handleCaptchaChange}
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}