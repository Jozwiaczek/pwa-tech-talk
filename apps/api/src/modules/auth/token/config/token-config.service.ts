import { Injectable } from '@nestjs/common';

import { TokenConfig } from '../token.types';
import { config } from '@/api/config';

const AUTH_TOKENS_NAMES = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
  logoutToken: 'logout_token',
};

@Injectable()
export class TokenConfigService {
  public getTokenConfig(): TokenConfig {
    return {
      logoutToken: {
        name: AUTH_TOKENS_NAMES.logoutToken,
        secret: config.AUTH_LOGOUT_TOKEN_SECRET,
      },
      accessToken: {
        name: AUTH_TOKENS_NAMES.accessToken,
        secret: config.AUTH_ACCESS_TOKEN_SECRET,
        expirationTime: config.AUTH_ACCESS_TOKEN_EXPIRATION_TIME,
      },
      refreshToken: {
        name: AUTH_TOKENS_NAMES.refreshToken,
        expirationTime: config.AUTH_REFRESH_TTL,
      },
    };
  }
}
