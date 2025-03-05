import React from 'react';
import { useFeatureContext } from '../../contexts/FeatureContext';

export function CommissionSystem() {
  const { isFeatureEnabled } = useFeatureContext();

  if (!isFeatureEnabled('rewards.commission')) return null;

  return (
    <div className="commission-system">
      <h3>Commission System</h3>
      {/* Commission system content */}
    </div>
  );
}