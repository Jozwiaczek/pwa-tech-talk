import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { CookieResponse } from './cookie/cookie.types';
import { RefreshTokenService } from './token/refresh-token/refresh-token.service';
import { TokenService } from './token/token.service';
import { GeneratedTokens } from './token/token.types';
import { TokenCookieService } from './token/token-cookie.service';
import { ApiAuthCheckResponse } from '@/libs/shared/types/api-responses';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly tokenCookieService: TokenCookieService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async setSuccessLoginCookies(user: User, cookieResponse: CookieResponse) {
    await this.refreshTokenService.deleteAllExpired(user.id);

    const [refreshToken, expirationDate] = await this.tokenService.generateToken('REFRESH', user);

    const [accessToken] = await this.tokenService.generateToken('ACCESS', user);

    const generateTokens: GeneratedTokens = {
      tokens: {
        accessToken,
        refreshToken,
      },
      expiration: expirationDate,
    };

    this.tokenCookieService.setCookieTokens(generateTokens, cookieResponse);
  }

  public async logout(response: CookieResponse): Promise<void> {
    const refreshToken = this.tokenCookieService.getCookieToken('REFRESH');
    this.tokenCookieService.clearAllCookieTokens(response);

    await this.refreshTokenService.delete({ id: refreshToken });
  }

  public getApiAuthUserResponse(
    { id, createdAt, updatedAt, username }: User,
    expiresDate?: number,
  ): ApiAuthCheckResponse {
    return {
      user: {
        id,
        createdAt,
        updatedAt,
        username,
      },
      expiresDate: expiresDate ?? Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
    };
  }
}
