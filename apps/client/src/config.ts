import { z } from 'zod';

const configSchema = z
  .object({
    API_URL: z.string(),
    SITE_URL: z.string().url().optional(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    WEB_PUSH_PUBLIC_KEY: z.string(),
  })
  .refine((data) => {
    if (data.NODE_ENV === 'production' && !data.SITE_URL) {
      throw new Error('SITE_URL is required in production');
    }
    return true;
  });

export const config = configSchema.parse({
  SITE_URL: process.env.SITE_URL,
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  NODE_ENV: process.env.NODE_ENV,
  WEB_PUSH_PUBLIC_KEY: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
});
