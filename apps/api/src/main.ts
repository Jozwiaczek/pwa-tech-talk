import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app.module';
import { config } from '@/api/config';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyCsrf from '@fastify/csrf-protection';
import fastifyHelmet from '@fastify/helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      trustProxy: true,
    }),
  );
  const port = config.PORT;

  app.enableCors({
    origin: [config.CLIENT_DEVELOPMENT_URL, config.CLIENT_PRODUCTION_URL],
    credentials: true,
  });
  await app.register(fastifyHelmet);
  await app.register(fastifyCsrf);
  await app.register(fastifyCookie, { secret: config.COOKIE_SECRET });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableShutdownHooks();

  await app.listen(port, '0.0.0.0');
  Logger.log(
    `🚀 Application is running on: http://localhost:${port} on ${config.NODE_ENV} environment`,
    'Bootstrap',
  );
}

bootstrap().catch((error) => new Error(`NestApp bootstrap error: ${error}`));
