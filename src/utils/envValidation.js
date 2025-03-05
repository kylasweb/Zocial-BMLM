import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  VITE_SENTRY_DSN: z.string().url(),
  VITE_WEB3_NETWORK: z.enum(['testnet', 'mainnet']),
  VITE_TOKEN_DISTRIBUTOR_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});

export function validateEnv() {
  try {
    const env = {
      VITE_API_URL: import.meta.env.VITE_API_URL,
      VITE_CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
      VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
      VITE_WEB3_NETWORK: import.meta.env.VITE_WEB3_NETWORK,
      VITE_TOKEN_DISTRIBUTOR_ADDRESS: import.meta.env.VITE_TOKEN_DISTRIBUTOR_ADDRESS,
      NODE_ENV: import.meta.env.MODE,
    };

    const result = envSchema.safeParse(env);

    if (!result.success) {
      const errorMessages = result.error.errors.map(error => 
        `${error.path.join('.')}: ${error.message}`
      ).join('\n');
      
      throw new Error(`Environment validation failed:\n${errorMessages}`);
    }

    return result.data;
  } catch (error) {
    console.error('Environment validation failed:', error);
    throw error;
  }
}