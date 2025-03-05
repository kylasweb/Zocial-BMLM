import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export class PerformanceMonitor {
  static init() {
    if ('PerformanceObserver' in window) {
      // Monitor Core Web Vitals
      this.observeCWV();
      
      // Monitor Resource Loading
      this.observeResources();
      
      // Monitor Long Tasks
      this.observeLongTasks();
      
      // Monitor Navigation
      this.observeNavigation();
    }
  }

  static observeCWV() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // Report to analytics
        this.reportMetric(entry);
        
        // Log poor performance
        if (this.isPoorPerformance(entry)) {
          this.logPoorPerformance(entry);
        }
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'fid', 'cls'] });
  }

  static observeResources() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 1000) { // Resource took more than 1s to load
          this.logSlowResource(entry);
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  static observeLongTasks() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 50) { // Task took more than 50ms
          this.logLongTask(entry);
        }
      });
    });

    observer.observe({ entryTypes: ['longtask'] });
  }

  static observeNavigation() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        this.reportNavigation(entry);
      });
    });

    observer.observe({ entryTypes: ['navigation'] });
  }

  static isPoorPerformance(entry) {
    const thresholds = {
      'LCP': 2500,
      'FID': 100,
      'CLS': 0.1
    };

    return entry.value > thresholds[entry.name];
  }

  static async logPoorPerformance(entry) {
    try {
      await fetch('/api/performance/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric: entry.name,
          value: entry.value,
          url: window.location.href,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Failed to log performance:', error);
    }
  }

  static logSlowResource(entry) {
    Sentry.addBreadcrumb({
      category: 'performance',
      message: `Slow resource load: ${entry.name}`,
      data: {
        duration: entry.duration,
        initiatorType: entry.initiatorType,
        url: entry.name
      }
    });
  }

  static logLongTask(entry) {
    Sentry.addBreadcrumb({
      category: 'performance',
      message: 'Long task detected',
      data: {
        duration: entry.duration,
        startTime: entry.startTime,
        attribution: entry.attribution
      }
    });
  }

  static reportNavigation(entry) {
    const metrics = {
      dnsLookup: entry.domainLookupEnd - entry.domainLookupStart,
      tcpConnection: entry.connectEnd - entry.connectStart,
      serverResponse: entry.responseEnd - entry.requestStart,
      domParsing: entry.domInteractive - entry.responseEnd,
      resourceLoading: entry.loadEventEnd - entry.domContentLoadedEventEnd
    };

    // Report to analytics
    this.reportMetric({
      name: 'navigation',
      value: metrics
    });
  }

  static reportMetric(entry) {
    // Send to your analytics service
    if (window.gtag) {
      window.gtag('event', 'performance_metric', {
        metric_name: entry.name,
        metric_value: entry.value,
        metric_delta: entry.delta,
        page_url: window.location.href
      });
    }
  }
}
