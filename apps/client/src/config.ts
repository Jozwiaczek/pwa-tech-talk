import { z } from 'zod';

const configSchema = z.object({
  API_URL: z.string(),
  SITE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  WEB_PUSH_PUBLIC_KEY: z.string(),
});

export const config = configSchema.parse({
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  NODE_ENV: process.env.NODE_ENV,
  WEB_PUSH_PUBLIC_KEY: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
});
