import morgan from 'morgan';

export const requestLogger = morgan((tokens, req, res) => {
  return JSON.stringify({
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    responseTime: `${tokens['response-time'](req, res)} ms`,
    userAgent: tokens['user-agent'](req, res),
    ip: tokens['remote-addr'](req, res),
    userId: req.auth?.userId || 'anonymous'
  });
});