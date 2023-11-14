import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshToken, User } from '@prisma/client';
import jsonwebtoken from 'jsonwebtoken';
import ms from 'ms';

import { TokenConfigService } from './config/token-config.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import {
  AccessTokenPayload,
  GenerateTokenReturnType,
  JWTTokenType,
  TokenBasePayload,
  TokenPayload,
  TokenType,
} from './token.types';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenConfigService: TokenConfigService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  private readonly tokenConfig = this.tokenConfigService.getTokenConfig();

  public verifyJWTToken(
    tokenType: 'ACCESS',
    token: string,
    userId?: string,
    ignoreExpiration?: boolean,
  ): TokenPayload;
  public verifyJWTToken(
    tokenType: JWTTokenType,
    token: string,
    userId?: string,
    ignoreExpiration?: boolean,
  ): TokenBasePayload;
  public verifyJWTToken(
    tokenType: JWTTokenType,
    token: string,
    userId?: string,
    ignoreExpiration?: boolean,
  ): TokenBasePayload {
    const { verify } = jsonwebtoken;
    const { accessToken, logoutToken } = this.tokenConfig;

    let payload: TokenBasePayload;

    switch (tokenType) {
      case 'ACCESS':
        payload = verify(token, accessToken.secret, { ignoreExpiration }) as AccessTokenPayload;
        this.validatePayload(payload, accessToken.name, userId);
        break;

      case 'LOGOUT':
        payload = verify(token, logoutToken.secret, { ignoreExpiration }) as TokenBasePayload;
        this.validatePayload(payload, logoutToken.name, userId);
        break;

      default:
        throw new BadRequestException(`Invalid token type: '${tokenType as string}'.`);
    }

    return payload;
  }

  public async generateToken(tokenType: 'REFRESH', user: User): Promise<GenerateTokenReturnType>;
  public async generateToken(tokenType: JWTTokenType, user: User): Promise<GenerateTokenReturnType>;
  public async generateToken(tokenType: TokenType, user: User): Promise<GenerateTokenReturnType> {
    switch (tokenType) {
      case 'REFRESH': {
        return this.generateRefreshToken(user.id);
      }
      case 'LOGOUT':
        return this.generateLogoutToken(user.id);
      case 'ACCESS':
        return this.generateAccessToken(user);
      default:
        throw new BadRequestException(`Invalid token type: '${tokenType as string}'.`);
    }
  }

  public async validateRefreshToken(
    refreshTokenId: string,
    tokenSubject: string,
  ): Promise<RefreshToken> {
    const refreshTokenEntity = await this.refreshTokenService.findFirstOrThrow({
      id: refreshTokenId,
      userId: tokenSubject,
    });
    const { expirationDate, id } = refreshTokenEntity;

    if (expirationDate.getTime() < Date.now()) {
      throw new UnauthorizedException(`Refresh token with an id: '${id}' expired.`);
    }

    return refreshTokenEntity;
  }

  private async generateRefreshToken(userId: string): Promise<GenerateTokenReturnType> {
    const expirationDate = new Date(Date.now() + ms(this.tokenConfig.refreshToken.expirationTime));

    const refreshTokenEntity = await this.refreshTokenService.create({
      user: { connect: { id: userId } },
      expirationDate,
    });

    return [refreshTokenEntity.id, expirationDate];
  }

  private generateAccessToken({ id: userId, username }: User): GenerateTokenReturnType {
    const { sign, decode } = jsonwebtoken;
    const { accessToken } = this.tokenConfig;

    const payload: AccessTokenPayload = {
      sub: userId,
      username,
      type: accessToken.name,
    };

    const token = sign(payload, accessToken.secret, {
      expiresIn: accessToken.expirationTime,
    });
    const expirationDate = new Date((decode(token) as TokenPayload).exp * 1000);

    return [token, expirationDate];
  }

  private generateLogoutToken(userId: string): GenerateTokenReturnType {
    const { sign, decode } = jsonwebtoken;
    const { logoutToken, refreshToken } = this.tokenConfig;
    const payload: TokenBasePayload = { sub: userId, type: logoutToken.name };

    const token = sign(payload, logoutToken.secret, {
      expiresIn: refreshToken.expirationTime,
    });
    const expirationDate = new Date((decode(token) as TokenPayload).exp * 1000);

    return [token, expirationDate];
  }

  private validatePayload(
    { sub: payloadSubject, type: payloadType }: TokenBasePayload,
    type: string,
    userId?: string,
  ): void {
    if (userId && payloadSubject !== userId) {
      throw new BadRequestException('Invalid subscriber ID');
    }

    if (payloadType !== type) {
      throw new BadRequestException('Invalid payload type');
    }
  }
}
