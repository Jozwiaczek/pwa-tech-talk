import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshTokenModule } from './token/refresh-token/refresh-token.module';
import { TokenModule } from './token/token.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [TokenModule, UsersModule, RefreshTokenModule],
  exports: [AuthService],
})
export class AuthModule {}
