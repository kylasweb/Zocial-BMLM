import React from 'react';
import { useNetwork } from '../../contexts/NetworkContext';
import { useTokenomics } from '../../hooks/useTokenomics';
import { usePayments } from '../../hooks/usePayments';

export default function ZocialLife() {
  const { network } = useNetwork();
  const { tokenMetrics, stakingPools } = useTokenomics();
  const { processPurchase } = usePayments();

  return (
    <div className="zocial-life">
      <TokenPurchase 
        paymentMethods={{
          fiat: {
            enabled: true,
            providers: ['stripe', 'paypal', 'bankTransfer'],
            currencies: ['USD', 'EUR', 'GBP']
          },
          crypto: {
            enabled: true,
            networks: ['ETH', 'BSC', 'Polygon'],
            tokens: ['BTC', 'ETH', 'USDT']
          },
          bankTransfer: {
            enabled: true,
            swift: true,
            sepa: true
          }
        }}
        onPurchase={processPurchase}
      />
      <TokenomicsDisplay
        totalSupply={21000000}
        features={{
          distribution: {
            enabled: true,
            charts: true,
            realTimeUpdates: true
          },
          circulation: {
            enabled: true,
            burnMechanism: true,
            velocity: true
          },
          metrics: {
            marketCap: true,
            volume: true,
            liquidity: true
          },
          analytics: {
            holders: true,
            transactions: true,
            velocity: true
          }
        }}
      />
      <StakingPools 
        pools={stakingPools}
        features={{
          flexibleStaking: true,
          lockedStaking: true,
          autoCompounding: true,
          rewardBoosts: true
        }}
      />
      <NFTMarketplace 
        features={{
          creation: true,
          trading: true,
          auctions: true,
          fractionalization: true,
          crossChainBridge: true
        }}
      />
      <TransactionHistory 
        filters={{
          purchases: true,
          transfers: true,
          rewards: true,
          staking: true,
          nftTransactions: true,
          defiInteractions: true
        }}
        features={{
          export: true,
          analytics: true,
          taxReporting: true
        }}
      />
      <DeFiHub 
        features={{
          lending: true,
          borrowing: true,
          yield: true,
          insurance: true
        }}
        protocols={defiProtocols}
      />
    </div>
  );
}
