const fs = require('fs').promises;
const path = require('path');
const { verifyAdminAuth } = require('../utils/auth');

// Path to .env file
const ENV_FILE_PATH = path.join(process.cwd(), '.env');

// Function to read environment variables
async function readEnvFile() {
  try {
    const data = await fs.readFile(ENV_FILE_PATH, 'utf8');
    const variables = [];
    
    data.split('\n').forEach(line => {
      if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('=');
        const isSecret = key.toLowerCase().includes('key') || 
                        key.toLowerCase().includes('secret') || 
                        key.toLowerCase().includes('password');
        
        variables.push({
          id: Buffer.from(key).toString('base64'),
          key: key.trim(),
          value: value.trim(),
          isSecret
        });
      }
    });
    
    return variables;
  } catch (error) {
    console.error('Error reading .env file:', error);
    throw error;
  }
}

// Function to write environment variables
async function writeEnvFile(variables) {
  try {
    const content = variables
      .map(v => `${v.key}=${v.value}`)
      .join('\n');
    
    await fs.writeFile(ENV_FILE_PATH, content);
  } catch (error) {
    console.error('Error writing .env file:', error);
    throw error;
  }
}

exports.handler = async (event, context) => {
  try {
    // Verify admin authentication
    const isAdmin = await verifyAdminAuth(event);
    if (!isAdmin) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }

    switch (event.httpMethod) {
      case 'GET':
        const variables = await readEnvFile();
        return {
          statusCode: 200,
          body: JSON.stringify(variables)
        };

      case 'POST':
        const newVariable = JSON.parse(event.body);
        const currentVars = await readEnvFile();
        currentVars.push({
          id: Buffer.from(newVariable.key).toString('base64'),
          ...newVariable
        });
        await writeEnvFile(currentVars);
        return {
          statusCode: 201,
          body: JSON.stringify({ message: 'Variable added successfully' })
        };

      case 'PUT':
        const { id } = event.queryStringParameters;
        const updatedVariable = JSON.parse(event.body);
        let vars = await readEnvFile();
        vars = vars.map(v => v.id === id ? { ...v, ...updatedVariable } : v);
        await writeEnvFile(vars);
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Variable updated successfully' })
        };

      case 'DELETE':
        const { id: deleteId } = event.queryStringParameters;
        let currentVariables = await readEnvFile();
        currentVariables = currentVariables.filter(v => v.id !== deleteId);
        await writeEnvFile(currentVariables);
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Variable deleted successfully' })
        };

      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};