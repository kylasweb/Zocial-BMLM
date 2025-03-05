export const TOKEN_CONFIG = {
  supportedNetworks: {
    1: 'Ethereum Mainnet',
    56: 'Binance Smart Chain',
    137: 'Polygon',
    // Add more networks as needed
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
  }
};