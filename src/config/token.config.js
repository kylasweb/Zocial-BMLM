export const TOKEN_CONFIG = {
  supportedNetworks: {
    1: 'Ethereum Mainnet',
    56: 'Binance Smart Chain',
    137: 'Polygon',
  },
  
  defaultGasLimit: 3000000,
  
  securityDefaults: {
    transferLock: false,
    mintingEnabled: true,
    burningEnabled: true,
    maxTransactionLimit: 0,
    cooldownPeriod: 0
  },
  
  vestingDefaults: {
    enabled: false,
    cliffPeriod: 0,
    vestingDuration: 0
  },

  // Add new configurations
  faucetDefaults: {
    enabled: true,
    claimAmount: 100,
    cooldownPeriod: 24, // hours
    maxClaimsPerUser: 1,
    requiresVerification: true
  },

  airdropDefaults: {
    minHoldingPeriod: 30, // days
    minTokenBalance: 100,
    stakingRequirement: 0,
    referralRequirement: 0
  },

  rewardSystem: {
    achievements: {
      newRank: 100,
      referral: 50,
      stakingMilestone: 200
    },
    pools: {
      leadershipPool: 0.2,
      stakingPool: 0.3,
      referralPool: 0.5
    }
  },

  binaryMatrix: {
    maxDepth: 10,
    spilloverRules: {
      autoBalance: true,
      preferredLeg: 'weak'
    }
  }
};
