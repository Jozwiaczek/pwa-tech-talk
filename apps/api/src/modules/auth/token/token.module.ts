import { Module } from '@nestjs/common';

import { CookieModule } from '../cookie/cookie.module';
import { TokenConfigModule } from './config/token-config.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { TokenService } from './token.service';
import { TokenCookieService } from './token-cookie.service';

@Module({
  imports: [TokenConfigModule, CookieModule, RefreshTokenModule],
  providers: [TokenService, TokenCookieService],
  exports: [TokenService, TokenCookieService],
})
export class TokenModule {}
