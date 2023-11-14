import { z } from 'zod';

const configSchema = z.object({
  API_URL: z.string().default('http://localhost:3000'),
  NEXT_PUBLIC_VERCEL_URL: z.string().default('localhost:3000'),
  NEXT_PUBLIC_HOST_NAME: z.string().default('localhost:3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export const config = configSchema.parse({
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL, //The domain name of the generated deployment URL. Example: *.vercel.app. The value does not include the protocol scheme https://
  NEXT_PUBLIC_HOST_NAME: process.env.NEXT_PUBLIC_HOST_NAME,
  NODE_ENV: process.env.NODE_ENV,
});
