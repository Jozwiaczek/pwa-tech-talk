import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../../users/users.service';
import { CookieResponse } from '../cookie/cookie.types';
import { TokenService } from '../token/token.service';
import { TokenPayload } from '../token/token.types';
import { TokenCookieService } from '../token/token-cookie.service';

@Injectable()
export class OnlyAuthenticatedGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly tokenCookieService: TokenCookieService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<{ payload: TokenPayload }>();
      const response = context.switchToHttp().getResponse<CookieResponse>();

      const accessToken = this.tokenCookieService.getCookieToken('ACCESS');
      console.log('L:23 | accessToken: ', accessToken);
      const verifiedAccessToken = this.tokenService.verifyJWTToken(
        'ACCESS',
        accessToken,
        undefined,
        true,
      );
      request.payload = verifiedAccessToken; // injects the payload (token) into request

      const { exp: accessTokenExp, sub: accessTokenSubject } = verifiedAccessToken;

      // if (!keepMeLoggedIn) {
      //   this.checkLogoutToken(accessTokenSubject, keepMeLoggedIn);
      // }

      if (this.isAccessTokenActive(accessTokenExp)) {
        return true;
      }

      await this.regenerateAccessToken(accessTokenSubject, response);
    } catch (e) {
      console.warn('Guard error:', e);
      throw new UnauthorizedException();
    }
    return true;
  }

  private isAccessTokenActive(expiry: number): boolean {
    return expiry * 1000 > Date.now();
  }

  private async regenerateAccessToken(accessTokenSubject: string, response: CookieResponse) {
    const validatedRefreshToken = await this.getValidatedRefreshToken(accessTokenSubject);

    const user = await this.usersService.findUnique({ id: accessTokenSubject });
    const [newAccessToken] = await this.tokenService.generateToken('ACCESS', user);

    this.tokenCookieService.setCookieTokens(
      {
        tokens: {
          accessToken: newAccessToken,
        },
        expiration: validatedRefreshToken.expirationDate,
      },
      response,
    );
  }

  private async getValidatedRefreshToken(accessTokenSubject: string) {
    const refreshToken = this.tokenCookieService.getCookieToken('REFRESH');
    return await this.tokenService.validateRefreshToken(refreshToken, accessTokenSubject);
  }
}
