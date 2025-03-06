import { securityMiddleware } from '../../src/security/SecurityModule';
import { validateEnv } from '../../src/config/envValidation';
const { exec } = require('child_process');

async function runSecurityAudit() {
  try {
    // Add npm audit check
    const npmAudit = await new Promise((resolve, reject) => {
      exec('npm audit --json', (error, stdout) => {
        if (error && error.code === 1) {
          const auditData = JSON.parse(stdout);
          resolve({
            success: false,
            vulnerabilities: auditData.metadata.vulnerabilities
          });
        } else {
          resolve({ success: true });
        }
      });
    });

    if (!npmAudit.success) {
      console.error('❌ npm audit detected vulnerabilities:', npmAudit.vulnerabilities);
    }

    // Validate environment
    validateEnv();

    // Check security configurations
    const securityChecks = [
      checkRateLimiting(),
      checkCorsConfig(),
      checkSecurityHeaders(),
      checkCsrfProtection(),
      checkAuthConfig(),
      checkEncryption(),
      checkBackupSecurity()
    ];

    const results = await Promise.all(securityChecks);
    const hasFailures = results.some(result => !result.success);

    if (hasFailures) {
      console.error('❌ Security audit failed. See above for details.');
      process.exit(1);
    }

    console.log('✅ Security audit passed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Security audit failed:', error);
    process.exit(1);
  }
}

runSecurityAudit();
