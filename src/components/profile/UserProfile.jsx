import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiUser, FiShield, FiMail, FiSettings, FiGlobe } from 'react-icons/fi';
import { Tabs, Tab } from '../common/Tabs';
import GDPRSettings from '../settings/GDPRSettings';
import AdvancedSecurity from '../security/AdvancedSecurity';
import VerificationFlow from '../verification/VerificationFlow';
import AdvancedProfileCustomization from './AdvancedProfileCustomization';

export default function ProfilePage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="bg-white shadow-xl rounded-lg">
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tab value="profile" icon={FiUser} label={t('profile.title')} />
          <Tab value="security" icon={FiShield} label={t('profile.security')} />
          <Tab value="verification" icon={FiMail} label={t('profile.verification')} />
          <Tab value="customization" icon={FiSettings} label={t('profile.customization')} />
          <Tab value="gdpr" icon={FiGlobe} label={t('profile.gdpr')} />
        </Tabs>

        <div className="p-6">
          {activeTab === 'profile' && <AdvancedProfileCustomization />}
          {activeTab === 'security' && <AdvancedSecurity />}
          {activeTab === 'verification' && <VerificationFlow />}
          {activeTab === 'gdpr' && <GDPRSettings />}
        </div>
      </div>
    </div>
  );
}
