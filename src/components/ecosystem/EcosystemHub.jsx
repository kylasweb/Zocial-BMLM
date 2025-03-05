import React from 'react';
import { useFeatureContext } from '../../contexts/FeatureContext';
import ZocialNetwork from './ZocialNetwork';
import ZocialChat from './ZocialChat';
import ZocialExchange from './ZocialExchange';
import ZocialLife from './ZocialLife';
import CompensationSystem from './CompensationSystem';
import TokenomicsDisplay from './TokenomicsDisplay';
import SecurityModule from '../security/SecurityModule';
import AnalyticsHub from '../analytics/AnalyticsHub';

export default function EcosystemHub() {
  const { isFeatureEnabled } = useFeatureContext();

  return (
    <div className="ecosystem-hub">
      {/* Core Ecosystem Components */}
      <div className="ecosystem-core">
        <ZocialNetwork 
          features={{
            communityFeatures: true,
            contentManagement: true,
            reputationSystem: true,
            p2pInteractions: true,
            decentralizedStorage: true
          }}
        />

        <ZocialChat 
          features={{
            encryptedMessaging: true,
            videoConferencing: true,
            fileSharing: true,
            crossPlatformSync: true,
            blockchainVerification: true
          }}
        />

        <ZocialExchange 
          features={{
            advancedTrading: true,
            marketMaking: true,
            liquidityPools: true,
            crossChainBridge: true,
            defiIntegration: true
          }}
        />

        <ZocialLife 
          features={{
            tokenManagement: true,
            stakingPools: true,
            nftMarketplace: true,
            defiProducts: true,
            crossChainBridge: true
          }}
        />
      </div>

      {/* Advanced Compensation System */}
      <CompensationSystem>
        <BinaryMatrix 
          levels={10}
          features={{
            spilloverPools: {
              enabled: true,
              autoOptimization: true,
              smartDistribution: true
            },
            followSponsor: {
              enabled: true,
              intelligentPlacement: true,
              teamBalancing: true
            },
            superSeeding: {
              enabled: true,
              dynamicCompression: true,
              autoRebalancing: true
            },
            advancedFeatures: {
              crosslineSpillover: true,
              dynamicLegBalancing: true,
              aiPoweredPlacement: true,
              smartCompression: true
            }
          }}
        />
        
        <FastTrackBonuses 
          features={{
            quickStart: true,
            leadershipRanks: true,
            performanceMultipliers: true,
            teamAcceleration: true
          }}
        />
        
        <TeamRewards 
          features={{
            globalPoolSharing: true,
            rankBonuses: true,
            leadershipIncentives: true,
            matchingBonuses: true
          }}
        />
      </CompensationSystem>

      {/* Tokenomics and DeFi */}
      <TokenomicsDisplay 
        features={{
          realTimeMetrics: true,
          stakingAnalytics: true,
          liquidityTracking: true,
          marketAnalysis: true,
          defiIntegration: true
        }}
      />

      {/* Security and Compliance */}
      <SecurityModule 
        features={{
          advancedEncryption: true,
          multiFactorAuth: true,
          fraudPrevention: true,
          realTimeMonitoring: true,
          complianceTools: true
        }}
      />

      {/* Analytics and Reporting */}
      {isFeatureEnabled('analytics') && (
        <AnalyticsHub 
          features={{
            networkMetrics: true,
            userAnalytics: true,
            financialReporting: true,
            predictiveAnalysis: true,
            customReports: true
          }}
        />
      )}

      {/* Integration Hub */}
      <IntegrationHub 
        services={{
          socialNetworks: {
            platforms: ['twitter', 'telegram', 'discord'],
            features: ['autoSync', 'crossPosting', 'analytics']
          },
          ottServices: {
            streaming: true,
            contentDelivery: true,
            mediaProcessing: true
          },
          educationalPlatforms: {
            courses: true,
            certifications: true,
            learningPaths: true
          },
          defiProtocols: {
            enabled: true,
            protocols: ['uniswap', 'pancakeswap', 'aave']
          }
        }}
      />
    </div>
  );
}
