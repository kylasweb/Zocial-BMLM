const { execSync } = require('child_process');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const deployEnvironment = process.argv[2] || 'production';

// Deployment configuration
const config = {
  production: {
    branch: 'main',
    buildCommand: 'npm run build',
    environment: {
      NODE_ENV: 'production',
      VITE_API_URL: process.env.PROD_API_URL,
      VITE_CLERK_PUBLISHABLE_KEY: process.env.PROD_CLERK_KEY,
      VITE_WEB3_NETWORK: process.env.PROD_WEB3_NETWORK
    }
  },
  staging: {
    branch: 'staging',
    buildCommand: 'npm run build:staging',
    environment: {
      NODE_ENV: 'staging',
      VITE_API_URL: process.env.STAGING_API_URL,
      VITE_CLERK_PUBLISHABLE_KEY: process.env.STAGING_CLERK_KEY,
      VITE_WEB3_NETWORK: process.env.STAGING_WEB3_NETWORK
    }
  }
};

const stagingConfig = {
  VITE_API_URL: "https://staging-api.yourapp.com",
  VITE_CLERK_PUBLISHABLE_KEY: "pk_test_c291bmQtaGlwcG8tMzguY2xlcmsuYWNjb3VudHMuZGV2JA",
  VITE_WEB3_NETWORK: "testnet",
  NODE_ENV: "staging",
  CORS_ORIGIN: "https://staging.yourapp.com"
};

const productionConfig = {
  VITE_API_URL: "https://api.yourapp.com",
  VITE_CLERK_PUBLISHABLE_KEY: "pk_live_your_prod_clerk_key",
  VITE_WEB3_NETWORK: "mainnet",
  NODE_ENV: "production",
  CORS_ORIGIN: "https://yourapp.com"
};

// Deploy function
async function deploy() {
  try {
    const deployConfig = config[deployEnvironment];
    
    // Set environment variables
    Object.entries(deployConfig.environment).forEach(([key, value]) => {
      process.env[key] = value;
    });

    // Run build
    console.log(`Building for ${deployEnvironment}...`);
    execSync(deployConfig.buildCommand, { stdio: 'inherit' });

    // Deploy to Netlify
    console.log(`Deploying to ${deployEnvironment}...`);
    execSync(`netlify deploy ${deployEnvironment === 'production' ? '--prod' : ''}`, {
      stdio: 'inherit'
    });

    console.log('Deployment completed successfully!');
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

deploy();
