import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  public async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅  Prisma connected successfully to the database');
    } catch (error) {
      if (error instanceof Prisma.PrismaClientInitializationError) {
        this.logger.error(`Client initialization error: ${error.message}`);
      }
      if (error instanceof Error) {
        this.logger.error(`${error.message}`);
      }
    }
  }
}
