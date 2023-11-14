import { BadRequestException, Injectable } from '@nestjs/common';

import { CookieService } from '../cookie/cookie.service';
import { CookieResponse } from '../cookie/cookie.types';
import { TokenConfigService } from './config/token-config.service';
import { GeneratedTokens, TokenType } from './token.types';

@Injectable()
export class TokenCookieService {
  constructor(
    private readonly tokenConfigService: TokenConfigService,
    private readonly cookieService: CookieService,
  ) {}

  public setCookieTokens(
    { tokens, expiration }: GeneratedTokens,
    cookieResponse: CookieResponse,
  ): void {
    const {
      refreshToken: { name: refreshTokenName },
      accessToken: { name: accessTokenName },
      logoutToken: { name: logoutTokenName },
    } = this.tokenConfigService.getTokenConfig();

    const { accessToken, logoutToken, refreshToken } = tokens;

    if (logoutToken) {
      this.cookieService.setCookie(cookieResponse, logoutTokenName, logoutToken, undefined);
    }

    if (refreshToken) {
      this.cookieService.setCookie(cookieResponse, refreshTokenName, refreshToken, expiration);
    }

    this.cookieService.setCookie(cookieResponse, accessTokenName, accessToken, expiration);
  }

  public getCookieToken(tokenType: TokenType): string {
    const { accessToken, refreshToken, logoutToken } = this.tokenConfigService.getTokenConfig();

    switch (tokenType) {
      case 'ACCESS':
        return this.cookieService.getCookie(accessToken.name);
      case 'LOGOUT':
        return this.cookieService.getCookie(logoutToken.name);
      case 'REFRESH':
        return this.cookieService.getCookie(refreshToken.name);
      default:
        throw new BadRequestException(`Invalid token type: '${tokenType}'.`);
    }
  }

  public clearAllCookieTokens(res: CookieResponse): void {
    const { accessToken, refreshToken, logoutToken } = this.tokenConfigService.getTokenConfig();

    this.cookieService.clearCookie(res, accessToken.name);
    this.cookieService.clearCookie(res, logoutToken.name);
    this.cookieService.clearCookie(res, refreshToken.name);
  }
}
