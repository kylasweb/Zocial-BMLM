import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      profile: {
        title: 'Profile',
        security: 'Security',
        notifications: 'Notifications',
        verification: 'Verification',
        settings: 'Settings'
      },
      gdpr: {
        title: 'GDPR Settings',
        marketing: 'Marketing Communications',
        analytics: 'Analytics Cookies',
        thirdParty: 'Third Party Services',
        essential: 'Essential Cookies'
      },
      security: {
        title: 'Security Settings',
        twoFactor: '2-Factor Authentication',
        devices: 'Connected Devices',
        activity: 'Account Activity'
      }
    }
  },
  es: {
    translation: {
      // Spanish translations
    }
  },
  fr: {
    translation: {
      // French translations
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
