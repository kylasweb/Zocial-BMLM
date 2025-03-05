import { execSync } from 'child_process';
import { validateEnv } from '../src/config/envValidation';
import { securityConfig } from '../src/config/security.config';

async function preDeploymentChecks() {
  try {
    console.log('🔍 Running pre-deployment checks...\n');

    // 1. Environment Variables
    console.log('Checking environment variables...');
    validateEnv();

    // 2. Dependencies Check
    console.log('\nChecking dependencies...');
    execSync('npm audit', { stdio: 'inherit' });
    
    // 3. Build Test
    console.log('\nTesting build process...');
    execSync('npm run build', { stdio: 'inherit' });

    // 4. Run Tests
    console.log('\nRunning tests...');
    execSync('npm run test:all', { stdio: 'inherit' });

    // 5. Security Checks
    console.log('\nRunning security checks...');
    execSync('npm run security:audit', { stdio: 'inherit' });

    // 6. Performance Check
    console.log('\nAnalyzing bundle size...');
    execSync('npm run analyze', { stdio: 'inherit' });

    // 7. Backup Verification
    console.log('\nVerifying backup systems...');
    execSync('npm run backup:verify', { stdio: 'inherit' });

    // 8. Monitoring Setup
    console.log('\nVerifying monitoring setup...');
    execSync('npm run monitoring:check', { stdio: 'inherit' });

    console.log('\n✅ All pre-deployment checks passed!');
    return true;
  } catch (error) {
    console.error('\n❌ Pre-deployment checks failed:', error);
    process.exit(1);
  }
}

preDeploymentChecks();