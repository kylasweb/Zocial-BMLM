import * as Sentry from "@sentry/node";

export class MonitoringService {
  static async initializeMonitoring() {
    // Initialize Sentry
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0.2,
    });

    // Memory leak detection
    this.startMemoryMonitoring();

    // Health checks
    this.initializeHealthChecks();
  }

  static startMemoryMonitoring() {
    setInterval(() => {
      const used = process.memoryUsage();
      if (used.heapUsed > 0.8 * used.heapTotal) {
        Sentry.captureMessage('High memory usage detected', 'warning');
      }
    }, 60000);
  }

  static initializeHealthChecks() {
    return {
      '/health': async () => {
        const checks = await Promise.all([
          this.checkDatabase(),
          this.checkAPI(),
          this.checkCache()
        ]);
        return checks.every(check => check.status === 'healthy');
      }
    };
  }

  static async checkDatabase() {
    try {
      // Implement your database health check here
      return { status: 'healthy' };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  }

  static async checkAPI() {
    try {
      // Implement your API health check here
      return { status: 'healthy' };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  }

  static async checkCache() {
    try {
      // Implement your cache health check here
      return { status: 'healthy' };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  }
}
