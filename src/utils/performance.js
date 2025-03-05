export const performanceMonitor = {
  metrics: {},

  startMeasure(label) {
    if (typeof performance !== 'undefined') {
      performance.mark(`${label}-start`);
    }
  },

  endMeasure(label) {
    if (typeof performance !== 'undefined') {
      performance.mark(`${label}-end`);
      performance.measure(label, `${label}-start`, `${label}-end`);
      
      const measurements = performance.getEntriesByName(label);
      const duration = measurements[measurements.length - 1].duration;
      
      this.metrics[label] = duration;
      
      if (duration > 1000) {
        console.warn(`Performance warning: ${label} took ${duration.toFixed(2)}ms`);
      }
      
      return duration;
    }
  },

  clearMetrics() {
    if (typeof performance !== 'undefined') {
      performance.clearMarks();
      performance.clearMeasures();
    }
    this.metrics = {};
  },

  getMetrics() {
    return this.metrics;
  }
};