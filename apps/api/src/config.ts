import { z } from 'zod';

const configSchema = z.object({
  PORT: z.string().default('3000'),
  CLIENT_PRODUCTION_URL: z.string().url().optional(),
  CLIENT_DEVELOPMENT_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  COOKIE_SECRET: z.string().default('secret'),
  AUTH_ACCESS_TOKEN_SECRET: z.string().default('secret'),
  AUTH_ACCESS_TOKEN_EXPIRATION_TIME: z.string().default('5m'),
  AUTH_LOGOUT_TOKEN_SECRET: z.string().default('secret'),
  AUTH_REFRESH_TTL: z.string().default('12h'),
  WEB_AUTHN_RP_NAME: z.string().default('PWA'),
  WEB_AUTHN_RP_ID: z.string().default('localhost'),
  WEB_AUTHN_ORIGIN: z.string().url(),
  WEB_PUSH_CONTACT_EMAIL: z.string().email(),
  WEB_PUSH_PRIVATE_KEY: z.string(),
  WEB_PUSH_PUBLIC_KEY: z.string(),
});

export const config = configSchema.parse({
  PORT: process.env.PORT,
  CLIENT_PRODUCTION_URL: process.env.CLIENT_PRODUCTION_URL,
  CLIENT_DEVELOPMENT_URL: process.env.CLIENT_DEVELOPMENT_URL,
  NODE_ENV: process.env.NODE_ENV,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  AUTH_ACCESS_TOKEN_SECRET: process.env.AUTH_ACCESS_TOKEN_SECRET,
  AUTH_ACCESS_TOKEN_EXPIRATION_TIME: process.env.AUTH_ACCESS_TOKEN_EXPIRATION_TIME,
  AUTH_LOGOUT_TOKEN_SECRET: process.env.AUTH_LOGOUT_TOKEN_SECRET,
  AUTH_REFRESH_TTL: process.env.AUTH_REFRESH_TTL,
  WEB_AUTHN_RP_NAME: process.env.WEB_AUTHN_RP_NAME,
  WEB_AUTHN_RP_ID: process.env.WEB_AUTHN_RP_ID,
  WEB_AUTHN_ORIGIN: process.env.WEB_AUTHN_ORIGIN,
  WEB_PUSH_CONTACT_EMAIL: process.env.WEB_PUSH_CONTACT_EMAIL,
  WEB_PUSH_PRIVATE_KEY: process.env.WEB_PUSH_PRIVATE_KEY,
  WEB_PUSH_PUBLIC_KEY: process.env.WEB_PUSH_PUBLIC_KEY,
});
