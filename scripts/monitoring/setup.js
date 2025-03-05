import { MonitoringService } from '../../src/services/MonitoringService.js';
import { validateEnv } from '../../src/config/envValidation.js';

async function setupMonitoring() {
  try {
    // Validate environment variables first
    validateEnv();

    // Initialize monitoring
    await MonitoringService.initializeMonitoring();

    // Start memory monitoring
    MonitoringService.startMemoryMonitoring();

    // Initialize health checks
    const healthChecks = MonitoringService.initializeHealthChecks();

    console.log('✅ Monitoring setup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Monitoring setup failed:', error);
    process.exit(1);
  }
}

setupMonitoring();
