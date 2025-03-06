const fetch = require('node-fetch');
const fs = require('fs').promises;

async function fetchAndSaveEnv() {
  const environment = process.argv[2] || 'production';
  
  try {
    const response = await fetch(`${process.env.VITE_API_URL}/admin/environment/${environment}`, {
      headers: {
        'Authorization': `Bearer ${process.env.ADMIN_API_TOKEN}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${environment} environment variables`);
    }

    const envVars = await response.json();
    const envContent = Object.entries(envVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    await fs.writeFile('.env', envContent);
    console.log(`Successfully wrote ${environment} environment variables to .env`);
  } catch (error) {
    console.error('Error fetching environment variables:', error);
    process.exit(1);
  }
}

fetchAndSaveEnv();