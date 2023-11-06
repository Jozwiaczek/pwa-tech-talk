/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app.module';
import { config } from '@/api/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = config.PORT;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap().catch((error) => new Error(`NestApp bootstrap error: ${error}`));
