import { useState } from 'react';
import { useFaucetManagement } from '../../hooks/useFaucetManagement';

export default function FaucetManager({ tokenId }) {
  const {
    faucetConfig,
    updateFaucetConfig,
    claimHistory,
    statistics
  } = useFaucetManagement(tokenId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Faucet Management</h3>
        <Switch
          checked={faucetConfig.enabled}
          onChange={(enabled) => updateFaucetConfig({ enabled })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Claim Rules</h4>
          <div className="space-y-4">
            <FormField
              label="Claim Amount"
              value={faucetConfig.claimAmount}
              onChange={(value) => updateFaucetConfig({ claimAmount: value })}
              type="number"
            />
            <FormField
              label="Cooldown Period (hours)"
              value={faucetConfig.cooldownPeriod}
              onChange={(value) => updateFaucetConfig({ cooldownPeriod: value })}
              type="number"
            />
            <FormField
              label="Max Claims Per User"
              value={faucetConfig.maxClaimsPerUser}
              onChange={(value) => updateFaucetConfig({ maxClaimsPerUser: value })}
              type="number"
            />
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Statistics</h4>
          <div className="space-y-2">
            <Stat label="Total Claims" value={statistics.totalClaims} />
            <Stat label="Total Distributed" value={statistics.totalDistributed} />
            <Stat label="Active Users" value={statistics.activeUsers} />
          </div>
        </div>
      </div>

      <ClaimHistory history={claimHistory} />
    </div>
  );
}