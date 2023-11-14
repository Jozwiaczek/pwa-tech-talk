import { Module } from '@nestjs/common';

import { PrismaModule } from '../../../../prisma/prisma.module';
import { UsersModule } from '../../../../users/users.module';
import { TokenModule } from '../../../token/token.module';
import { AuthenticatorsController } from './authenticators.controller';
import { AuthenticatorsService } from './authenticators.service';

@Module({
  providers: [AuthenticatorsService],
  controllers: [AuthenticatorsController],
  imports: [PrismaModule, TokenModule, UsersModule],
  exports: [AuthenticatorsService],
})
export class AuthenticatorsModule {}
