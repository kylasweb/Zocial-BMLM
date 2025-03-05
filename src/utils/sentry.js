import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { Integrations } from "@sentry/tracing";

export const initSentry = () => {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        new BrowserTracing({
          tracingOrigins: ["localhost", /^\//],
        }),
        new Integrations.BrowserPerformance(),
      ],
      tracesSampleRate: 0.2,
      environment: import.meta.env.MODE,
      beforeSend(event, hint) {
        const error = hint?.originalException;
        if (error && error.name === 'NetworkError') {
          event.fingerprint = ['network-error'];
        }
        if (event.exception) {
          Sentry.showReportDialog({ eventId: event.event_id });
        }
        return event;
      },
      // Performance monitoring
      enablePerformanceMonitoring: true,
      performanceOptions: {
        captureInteractions: true,
        timeoutWarningLimit: 3000,
      }
    });
  }
};

export const captureException = (error, context = {}) => {
  Sentry.captureException(error, {
    extra: context,
  });
};
