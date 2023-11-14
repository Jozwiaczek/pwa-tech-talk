import { Module } from '@nestjs/common';
import { PrismaModule } from '@/api/modules/prisma/prisma.module';
import { EventsModule } from '@/api/modules/events/events.module';
import { UsersModule } from './users/users.module';
import { Fido2Module } from '@/api/modules/auth/strategies/fido2/fido2.module';
import { AuthModule } from '@/api/modules/auth/auth.module';
import { TokenModule } from '@/api/modules/auth/token/token.module';
import { AuthenticatorsModule } from '@/api/modules/auth/strategies/fido2/authenticators/authenticators.module';
import { CookieModule } from '@/api/modules/auth/cookie/cookie.module';

@Module({
  imports: [
    EventsModule,
    PrismaModule,
    UsersModule,
    Fido2Module,
    AuthModule,
    TokenModule,
    AuthenticatorsModule,
    CookieModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
