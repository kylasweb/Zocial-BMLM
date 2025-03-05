import { useState } from 'react';
import { useAirdropManagement } from '../../hooks/useAirdropManagement';

export default function AirdropManager({ tokenId }) {
  const {
    createAirdrop,
    activeAirdrops,
    airdropHistory,
    statistics
  } = useAirdropManagement(tokenId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Airdrop Management</h3>
        <Button onClick={() => setShowCreateModal(true)}>
          Create New Airdrop
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Active Airdrops</h4>
          <div className="space-y-4">
            {activeAirdrops.map(airdrop => (
              <AirdropCard
                key={airdrop.id}
                airdrop={airdrop}
                onManage={handleManageAirdrop}
              />
            ))}
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Statistics</h4>
          <div className="space-y-2">
            <Stat label="Total Airdrops" value={statistics.totalAirdrops} />
            <Stat label="Total Distributed" value={statistics.totalDistributed} />
            <Stat label="Eligible Users" value={statistics.eligibleUsers} />
          </div>
        </div>
      </div>

      <AirdropHistory history={airdropHistory} />
      
      <CreateAirdropModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={createAirdrop}
      />
    </div>
  );
}