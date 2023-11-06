import { z } from 'zod';

const configSchema = z.object({
  PORT: z.string().default('3000'),
  CLIENT_PRODUCTION_URL: z.string().url().optional(),
  CLIENT_DEVELOPMENT_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export const config = configSchema.parse({
  PORT: process.env.PORT,
  CLIENT_PRODUCTION_URL: process.env.CLIENT_PRODUCTION_URL,
  CLIENT_DEVELOPMENT_URL: process.env.CLIENT_DEVELOPMENT_URL,
  NODE_ENV: process.env.NODE_ENV,
});
