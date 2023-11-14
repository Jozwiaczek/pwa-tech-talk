import { Injectable } from '@nestjs/common';
import type { Authenticator, Prisma } from '@prisma/client';
import base64url from 'base64url';
import UserAgentParser from 'ua-parser-js';

export type AuthenticatorDeviceDetails = `${string} ${string}, ${string} ${string}`;

import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class AuthenticatorsService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUserAuthenticators(userId: string): Promise<Authenticator[]> {
    return this.prisma.authenticator.findMany({ where: { userId } });
  }

  public async deleteAuthenticator(credentialID: string): Promise<Authenticator> {
    return this.prisma.authenticator.delete({ where: { credentialID } });
  }

  public async updateAuthenticator(
    authenticatorId: string,
    newData: Prisma.XOR<Prisma.AuthenticatorUpdateInput, Prisma.AuthenticatorUncheckedUpdateInput>,
  ) {
    return await this.prisma.authenticator.update({
      where: { credentialID: authenticatorId },
      data: newData,
    });
  }

  public async createAuthenticator(
    credentialId: Uint8Array,
    publicKey: Uint8Array,
    username: string,
    counter: number,
    userAgent: string,
    deviceName: string,
  ): Promise<Authenticator> {
    const newAuthenticatorData: Prisma.AuthenticatorCreateInput = {
      credentialID: this.encodeCredentialId(credentialId),
      credentialPublicKey: this.convertUint8ArrayToBuffer(publicKey),
      user: {
        connect: { username },
      },
      counter,
      deviceName,
      deviceDetails: this.getDeviceDetails(userAgent),
    };

    return this.prisma.authenticator.create({ data: newAuthenticatorData });
  }

  public async findUserAuthenticator(
    userId: string,
    credentialId: string,
  ): Promise<Authenticator | null> {
    return this.prisma.authenticator.findFirst({ where: { userId, credentialID: credentialId } });
  }

  private convertUint8ArrayToBuffer(uint8ArrayValue: Uint8Array): Buffer {
    return Buffer.from(uint8ArrayValue);
  }

  private encodeCredentialId(credentialId: Uint8Array): string {
    return base64url.encode(this.convertUint8ArrayToBuffer(credentialId));
  }

  private getDeviceDetails(userAgent: string): AuthenticatorDeviceDetails {
    const userAgentInfo = new UserAgentParser(userAgent);

    const { name: browserName, version: browserVersion } = userAgentInfo.getBrowser();
    const { name: osName, version: osVersion } = userAgentInfo.getOS();

    return `${browserName} ${browserVersion}, ${osName} ${osVersion}`;
  }
}
