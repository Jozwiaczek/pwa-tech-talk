export interface TokenBasePayload {
  sub: string;
  type: string;
}

export interface AccessTokenPayload extends TokenBasePayload {
  username: string;
}

export interface TokenPayload extends AccessTokenPayload {
  iat: number;
  exp: number;
}

interface Tokens {
  accessToken: string;
  refreshToken?: string;
  logoutToken?: string;
}

export interface GeneratedTokens {
  tokens: Tokens;
  expiration: Date;
}

export type GenerateTokenReturnType = [string, Date];

export type JWTTokenType = 'ACCESS' | 'LOGOUT';
export type TokenType = JWTTokenType | 'REFRESH';

export interface TokenConfig {
  accessToken: {
    name: string;
    secret: string;
    expirationTime: string;
  };
  logoutToken: {
    name: string;
    secret: string;
  };
  refreshToken: {
    name: string;
    expirationTime: string;
  };
}
