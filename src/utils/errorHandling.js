import { Retrier } from "@humanwhocodes/retry";
import { store } from '../store';
import { addNotification } from '../store/notificationSlice';
import { MonitoringService } from '../services/MonitoringService';

class SystemErrorHandler {
  constructor() {
    this.retrier = new Retrier(
      error => this.shouldRetry(error),
      { 
        timeout: 120000,
        maxAttempts: 3,
        backoff: 'exponential'
      }
    );
    
    this.errorPatterns = new Map([
      ['DATABASE_CONNECTION', /connection.*failed|timeout|refused/i],
      ['AUTHENTICATION', /auth.*failed|invalid.*token|expired/i],
      ['RATE_LIMIT', /rate.*limit|too.*many.*requests/i],
      ['NETWORK', /network.*error|connection.*lost/i],
      ['VALIDATION', /validation.*failed|invalid.*input/i],
      ['PERMISSION', /permission.*denied|unauthorized|forbidden/i],
      ['API_ERROR', /api.*error|service.*unavailable/i],
      ['DATA_INTEGRITY', /data.*integrity|constraint.*violation/i],
      ['MEMORY', /out.*of.*memory|heap.*size/i],
      ['TRANSACTION', /transaction.*failed|deadlock/i]
    ]);
  }

  shouldRetry(error) {
    const retriableErrors = [
      'ECONNRESET',
      'ETIMEDOUT',
      'ECONNREFUSED',
      'NETWORK_ERROR',
      'RATE_LIMIT_EXCEEDED'
    ];
    
    return retriableErrors.includes(error.code) || 
           error.status === 429 || 
           (error.status >= 500 && error.status <= 599);
  }

  async handleError(error, context = {}) {
    const errorType = this.identifyErrorType(error);
    const healing = this.initiateAutoHealing(errorType, error);
    
    if (context.stealth) {
      await this.logStealthError(error, context);
      return;
    }

    const errorActions = {
      DATABASE_CONNECTION: this.handleDatabaseError,
      AUTHENTICATION: this.handleAuthError,
      RATE_LIMIT: this.handleRateLimit,
      NETWORK: this.handleNetworkError,
      PERMISSION: this.handlePermissionError,
    };

    const handler = errorActions[errorType] || this.handleGenericError;
    await handler.call(this, error);

    return healing;
  }

  async logStealthError(error, context) {
    const stealthLog = {
      timestamp: new Date().toISOString(),
      error: error.message,
      context,
      trace: error.stack,
      healing: await this.initiateAutoHealing(this.identifyErrorType(error), error)
    };
    
    // Store in encrypted format
    await this.storeStealthLog(stealthLog);
  }

  identifyErrorType(error) {
    for (const [type, pattern] of this.errorPatterns) {
      if (pattern.test(error.message)) return type;
    }
    return 'UNKNOWN';
  }

  async initiateAutoHealing(errorType, error) {
    const healingStrategies = {
      DATABASE_CONNECTION: this.healDatabaseConnection.bind(this),
      AUTHENTICATION: this.healAuthentication.bind(this),
      RATE_LIMIT: this.healRateLimit.bind(this),
      NETWORK: this.healNetwork.bind(this),
      API_ERROR: this.healAPIError.bind(this),
      MEMORY: this.healMemoryIssue.bind(this)
    };

    const healingStrategy = healingStrategies[errorType];
    if (healingStrategy) {
      return await healingStrategy(error);
    }
  }

  // Implement specific error handling methods
  async handleDatabaseError(error) {
    store.dispatch(addNotification({
      type: 'error',
      message: 'Database connection issue detected. Attempting to recover...'
    }));
    // Additional database error handling logic
  }

  async handleAuthError(error) {
    store.dispatch(addNotification({
      type: 'error',
      message: 'Authentication error occurred. Please try logging in again.'
    }));
    // Additional auth error handling logic
  }

  async handleRateLimitError(error) {
    store.dispatch(addNotification({
      type: 'warning',
      message: 'Rate limit reached. Please wait before trying again.'
    }));
    // Additional rate limit error handling logic
  }

  async handleNetworkError(error) {
    store.dispatch(addNotification({
      type: 'error',
      message: 'Network connectivity issue detected. Attempting to reconnect...'
    }));
    // Additional network error handling logic
  }

  async handleGenericError(error) {
    store.dispatch(addNotification({
      type: 'error',
      message: 'An unexpected error occurred. Our team has been notified.'
    }));
    // Additional generic error handling logic
  }

  async storeStealthLog(log) {
    // Implement encrypted logging storage
    console.log('Stealth log stored:', log);
  }

  // Healing methods
  async healDatabaseConnection(error) {
    const pool = await import('../services/database').then(m => m.pool);
    await pool.end();
    await pool.connect();
    await this.verifyDatabaseConnection();
  }

  async healAuthentication(error) {
    const auth = await import('../services/auth').then(m => m.default);
    await auth.refreshToken();
    await this.verifyAuthStatus();
  }

  async healRateLimit(error) {
    await new Promise(resolve => setTimeout(resolve, 1000 * 60));
    return this.retrier.execute(async () => {
      const response = await fetch('/api/health');
      if (!response.ok) throw new Error('Rate limit still active');
    });
  }

  async healNetwork(error) {
    await MonitoringService.checkNetworkConnectivity();
    if (!await this.isOnline()) {
      throw new Error('Network still unavailable');
    }
  }

  async healAPIError(error) {
    return this.retrier.execute(async () => {
      const health = await fetch('/api/health');
      if (!health.ok) throw new Error('API still unhealthy');
      await this.reconnectAPI();
    });
  }

  async healMemoryIssue(error) {
    if (typeof window !== 'undefined') {
      window.gc && window.gc();
    }
    // Clear non-essential caches
    this.clearApplicationCaches();
  }

  private async clearApplicationCaches() {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }
  }
}

export const errorHandler = new SystemErrorHandler();
