import { Module } from '@nestjs/common';

import { UsersModule } from '../../../users/users.module';
import { AuthModule } from '../../auth.module';
import { TokenModule } from '../../token/token.module';
import { AuthenticatorsModule } from './authenticators/authenticators.module';
import { Fido2Controller } from './fido2.controller';
import { Fido2Service } from './fido2.service';
import { PrismaModule } from '@/api/modules/prisma/prisma.module';

@Module({
  providers: [Fido2Service],
  controllers: [Fido2Controller],
  imports: [AuthenticatorsModule, UsersModule, AuthModule, TokenModule, PrismaModule],
})
export class Fido2Module {}
