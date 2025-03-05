export const environment = {
  production: import.meta.env.PROD,
  development: import.meta.env.DEV,
  apiUrl: import.meta.env.VITE_API_URL,
  clerkPublishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  web3Network: import.meta.env.VITE_WEB3_NETWORK,
  contractAddresses: {
    tokenDistributor: import.meta.env.VITE_TOKEN_DISTRIBUTOR_ADDRESS,
    // Add other contract addresses
  }
};