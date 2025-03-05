import { securityMiddleware } from '../../src/security/SecurityModule';
import { validateEnv } from '../../src/config/envValidation';

async function runSecurityAudit() {
  try {
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