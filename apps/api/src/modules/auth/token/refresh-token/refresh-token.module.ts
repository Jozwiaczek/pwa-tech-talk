import { Module } from '@nestjs/common';

import { PrismaModule } from '../../../prisma/prisma.module';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  imports: [PrismaModule],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
