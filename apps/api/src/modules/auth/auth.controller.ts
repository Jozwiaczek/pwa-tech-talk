import { Controller, Get, Res } from '@nestjs/common';
import { User } from '@prisma/client';

import { AuthService } from './auth.service';
import { CookieResponse } from './cookie/cookie.types';
import { CookiePayload } from './cookie/cookiePayload.decorator';
import { UserFromCookiePayloadPipe } from './cookie/cookieUserPayload.pipe';
import { TokenPayload } from './token/token.types';
import { ApiAuthCheckResponse } from '@/libs/shared/types/api-responses';
import { Auth } from '@/api/modules/auth/decorators/auth.decorator';

@Auth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('check-auth')
  checkAuth(
    @CookiePayload() { exp }: TokenPayload,
    @CookiePayload(UserFromCookiePayloadPipe) user: User,
  ): ApiAuthCheckResponse {
    return this.authService.getApiAuthUserResponse(user, exp * 1000);
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) cookieResponse: CookieResponse): Promise<void> {
    return this.authService.logout(cookieResponse);
  }
}
