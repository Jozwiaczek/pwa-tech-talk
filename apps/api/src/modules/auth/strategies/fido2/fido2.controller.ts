import { Body, Controller, Headers, Post, Res } from '@nestjs/common';
import { Authenticator } from '@prisma/client';

import { CookieResponse } from '../../cookie/cookie.types';
import { Metadata } from '../../decorators/metadata.decorator';
import { Fido2Service, RawInternalMetadata } from './fido2.service';
import {
  Fido2ReqRegistrationResponse,
  VerifyFido2LoginResponse,
} from '@/libs/shared/types/api-responses';
import {
  Fido2LoginResponseDto,
  Fido2RegisterResponseDto,
  Fido2RequestLoginDto,
  Fido2RequestRegistrationDto,
} from '@/libs/shared/dto/fido2';
import { PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/typescript-types';

@Controller('auth/fido2')
export class Fido2Controller {
  constructor(private readonly fido2Service: Fido2Service) {}

  @Post('request-registration')
  async requestRegistration(
    @Body() dto: Fido2RequestRegistrationDto,
    @Metadata() metadata: RawInternalMetadata,
  ): Promise<Fido2ReqRegistrationResponse> {
    return this.fido2Service.requestRegistration(dto, metadata);
  }

  @Post('register-response')
  async registerResponse(
    @Headers('user-agent') userAgent: string,
    @Body()
    { deviceName, username, ...registerResponse }: Fido2RegisterResponseDto,
  ): Promise<Authenticator> {
    return this.fido2Service.registerResponse(username, registerResponse, deviceName, userAgent);
  }

  @Post('request-login')
  async requestLogin(
    @Body()
    { username }: Fido2RequestLoginDto,
  ): Promise<PublicKeyCredentialRequestOptionsJSON> {
    return this.fido2Service.requestLogin(username);
  }

  @Post('verify-login-response')
  async verifyLoginResponse(
    @Res({ passthrough: true }) cookieResponse: CookieResponse,
    @Body()
    { username, ...authenticator }: Fido2LoginResponseDto,
  ): Promise<VerifyFido2LoginResponse> {
    return this.fido2Service.verifyLoginResponse(username, authenticator, cookieResponse);
  }
}
