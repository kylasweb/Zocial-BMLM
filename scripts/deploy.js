const { execSync } = require('child_process');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

// Load environment variables
dotenv.config();

const deployEnvironment = process.argv[2] || 'production';

// Deployment configuration
const config = {
  production: {
    branch: 'main',
    buildCommand: 'npm run build',
  },
  staging: {
    branch: 'staging',
    buildCommand: 'npm run build:staging',
  }
};

// Fetch environment variables from admin dashboard
async function fetchEnvironmentVariables(environment) {
  try {
    const response = await fetch(`${process.env.VITE_API_URL}/admin/environment/${environment}`, {
      headers: {
        'Authorization': `Bearer ${process.env.ADMIN_API_TOKEN}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${environment} environment variables`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching environment variables:', error);
    throw error;
  }
}

// Deploy function
async function deploy() {
  try {
    const deployConfig = config[deployEnvironment];
    
    // Fetch environment-specific variables
    console.log(`Fetching ${deployEnvironment} environment variables...`);
    const envVars = await fetchEnvironmentVariables(deployEnvironment);
    
    // Set environment variables for the build
    Object.entries(envVars).forEach(([key, value]) => {
      process.env[key] = value;
    });

    // Run build
    console.log(`Building for ${deployEnvironment}...`);
    execSync(deployConfig.buildCommand, { stdio: 'inherit' });

    // Deploy to Netlify with environment variables
    console.log(`Deploying to ${deployEnvironment}...`);
    const deployCommand = [
      'netlify deploy',
      deployEnvironment === 'production' ? '--prod' : '',
      '--json'
    ].filter(Boolean).join(' ');

    const result = execSync(deployCommand, {
      stdio: 'pipe',
      encoding: 'utf-8'
    });

    const deployResult = JSON.parse(result);
    console.log('Deployment URL:', deployResult.url);
    console.log('Deployment completed successfully!');
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

// Run deployment
deploy();
