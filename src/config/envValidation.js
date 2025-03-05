import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  REDIS_URL: z.string().url().optional(),
  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_KEY: z.string(),
  SENTRY_DSN: z.string().url(),
  API_VERSION: z.string(),
  CORS_ORIGIN: z.string(),
  PORT: z.number().int().positive(),
  RATE_LIMIT_WINDOW: z.number().int().positive(),
  RATE_LIMIT_MAX: z.number().int().positive(),
  BACKUP_INTERVAL: z.number().int().positive(),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']),
  SMTP_CONFIG: z.string(),
  CLERK_PUBLISHABLE_KEY: z.string(),
  VITE_CLERK_PUBLISHABLE_KEY: z.string()
});

export function validateEnv() {
  const result = envSchema.safeParse(process.env);
  
  if (!result.success) {
    console.error('❌ Invalid environment variables:', result.error.format());
    throw new Error('Invalid environment configuration');
  }
  
  return result.data;
}