import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Authenticator } from '@prisma/client';
import {
  generateAuthenticationOptions,
  GenerateAuthenticationOptionsOpts,
  generateRegistrationOptions,
  GenerateRegistrationOptionsOpts,
  VerifiedRegistrationResponse,
  verifyAuthenticationResponse,
  VerifyAuthenticationResponseOpts,
  verifyRegistrationResponse,
  VerifyRegistrationResponseOpts,
} from '@simplewebauthn/server';
import {
  AuthenticationResponseJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
} from '@simplewebauthn/typescript-types';
import base64url from 'base64url';
import UserAgentParser from 'ua-parser-js';

import { UsersService } from '../../../users/users.service';
import { AuthService } from '../../auth.service';
import { CookieResponse } from '../../cookie/cookie.types';
import { AuthenticatorsService } from './authenticators/authenticators.service';
import { config } from '@/api/config';
import {
  Fido2ReqRegistrationResponse,
  VerifyFido2LoginResponse,
} from '@/libs/shared/types/api-responses';
import { Fido2RequestRegistrationDto } from '@/libs/shared/dto/fido2';
import { PrismaService } from '@/api/modules/prisma/prisma.service';

export interface RawInternalMetadata {
  ipAddress: string;
  userAgent: string;
}

@Injectable()
export class Fido2Service {
  constructor(
    private readonly authenticatorsService: AuthenticatorsService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService,
  ) {}

  public async requestRegistration(
    { username }: Fido2RequestRegistrationDto,
    metadata: RawInternalMetadata,
  ): Promise<Fido2ReqRegistrationResponse> {
    const existedUser = await this.usersService.findUnique({ username });

    if (existedUser && existedUser.isVerified) {
      throw new BadRequestException();
    }

    const requestingUser = await this.prismaService.user.upsert({
      where: {
        username,
      },
      update: {
        isVerified: false,
        currentChallenge: '',
      },
      create: {
        username,
        isVerified: false,
        currentChallenge: '',
      },
    });

    const fido2Options: GenerateRegistrationOptionsOpts = {
      rpName: config.WEB_AUTHN_RP_NAME,
      rpID: config.WEB_AUTHN_RP_ID,
      userID: requestingUser.id,
      userName: requestingUser.username,
      attestationType: 'none',
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'preferred',
      },
    };

    const registrationOptions = await generateRegistrationOptions(fido2Options);

    await this.usersService.updateUserCurrentChallenge(
      requestingUser.username,
      registrationOptions.challenge,
    );

    return {
      registrationOptions,
      deviceName: this.getDefaultDeviceName(metadata.userAgent),
    };
  }

  private getDefaultDeviceName(userAgent: string): string {
    const userAgentInfo = new UserAgentParser(userAgent);
    const { name: browserName } = userAgentInfo.getBrowser();
    const { vendor: deviceVendor, model: deviceModel } = userAgentInfo.getDevice();
    const { name: osName } = userAgentInfo.getOS();

    return `${deviceVendor} ${deviceModel} (${osName} ${browserName})`;
  }

  public async registerResponse(
    username: string,
    registrationResponse: RegistrationResponseJSON,
    deviceName: string,
    userAgent: string,
  ): Promise<Authenticator> {
    const { verified, registrationInfo } = await this.verifyRegistrationResponse(
      username,
      registrationResponse,
    );

    if (!verified || !registrationInfo) {
      throw new UnauthorizedException('Registration failed');
    }

    const { credentialPublicKey, credentialID, counter } = registrationInfo;

    const authenticator = await this.authenticatorsService.createAuthenticator(
      credentialID,
      credentialPublicKey,
      username,
      counter,
      userAgent,
      deviceName,
    );

    await this.usersService.verifyUser(username);

    return authenticator;
  }

  public async requestLogin(username: string): Promise<PublicKeyCredentialRequestOptionsJSON> {
    const generatedAuthenticationOptions: GenerateAuthenticationOptionsOpts = {
      userVerification: 'preferred',
    };

    const authenticationOptions = await generateAuthenticationOptions(
      generatedAuthenticationOptions,
    );

    await this.usersService.updateUserCurrentChallenge(username, authenticationOptions.challenge);

    return authenticationOptions;
  }

  public async verifyLoginResponse(
    username: string,
    authenticator: AuthenticationResponseJSON,
    cookieResponse: CookieResponse,
  ): Promise<VerifyFido2LoginResponse> {
    const user = await this.usersService.findUnique({
      username,
    });

    const { currentChallenge: expectedChallenge, id: userId } = user;

    if (!expectedChallenge) {
      throw new UnauthorizedException('Could not find an expected challenge');
    }

    const userAuthenticator = await this.authenticatorsService.findUserAuthenticator(
      userId,
      authenticator.id,
    );

    if (!userAuthenticator) {
      throw new UnauthorizedException(
        `Could not find authenticator ${authenticator.id} for ${username}`,
      );
    }

    const verifyAuthenticationResponseOpts: VerifyAuthenticationResponseOpts = {
      response: authenticator,
      expectedChallenge,
      expectedOrigin: config.WEB_AUTHN_ORIGIN,
      expectedRPID: config.WEB_AUTHN_RP_ID,
      requireUserVerification: false,
      authenticator: {
        ...userAuthenticator,
        credentialID: this.convertBase64urlToBuffer(userAuthenticator.credentialID),
        counter: userAuthenticator.counter,
      },
    };

    const { verified, authenticationInfo } = await verifyAuthenticationResponse(
      verifyAuthenticationResponseOpts,
    );

    if (!verified) {
      throw new UnauthorizedException('Authentication failed');
    }

    await this.authenticatorsService.updateAuthenticator(userAuthenticator.credentialID, {
      counter: authenticationInfo.newCounter,
      lastUsed: new Date(),
    });

    await this.authService.setSuccessLoginCookies(user, cookieResponse);

    return {
      user,
      expiresDate: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
    };
  }

  private async verifyRegistrationResponse(
    username: string,
    registrationResponse: RegistrationResponseJSON,
  ): Promise<VerifiedRegistrationResponse> {
    const user = await this.usersService.findUnique({ username });

    if (!user?.currentChallenge) {
      throw new UnauthorizedException('No challenge found');
    }

    const verifyRegistrationResponseOptions: VerifyRegistrationResponseOpts = {
      response: registrationResponse,
      expectedChallenge: user?.currentChallenge,
      expectedOrigin: config.WEB_AUTHN_ORIGIN,
      expectedRPID: config.WEB_AUTHN_RP_ID,
      requireUserVerification: false,
    };

    return await verifyRegistrationResponse(verifyRegistrationResponseOptions);
  }

  private convertBase64urlToBuffer(base64urlValue: string): Buffer {
    return base64url.toBuffer(base64urlValue);
  }
}
