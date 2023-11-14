import { Module } from '@nestjs/common';
import { WebPushService } from './web-push.service';
import { WebPushController } from './web-push.controller';
import { PrismaModule } from '@/api/modules/prisma/prisma.module';
import { TokenModule } from '@/api/modules/auth/token/token.module';
import { UsersModule } from '@/api/modules/users/users.module';

@Module({
  imports: [TokenModule, UsersModule, PrismaModule],
  providers: [WebPushService],
  controllers: [WebPushController],
})
export class WebPushModule {}
