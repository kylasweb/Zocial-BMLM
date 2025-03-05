import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

export const initSentry = () => {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
      environment: import.meta.env.MODE,
      beforeSend(event) {
        if (event.exception) {
          Sentry.showReportDialog({ eventId: event.event_id });
        }
        return event;
      },
    });
  }
};

export const captureException = (error, context = {}) => {
  Sentry.captureException(error, {
    extra: context,
  });
};