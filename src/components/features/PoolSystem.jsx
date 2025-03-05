import React from 'react';
import { useFeatureContext } from '../../contexts/FeatureContext';

export function PoolSystem() {
  const { isFeatureEnabled } = useFeatureContext();

  if (!isFeatureEnabled('network.poolSystem')) return null;

  return (
    <div className="pool-system">
      <h3>Pool System</h3>
      {/* Pool system content */}
    </div>
  );
}