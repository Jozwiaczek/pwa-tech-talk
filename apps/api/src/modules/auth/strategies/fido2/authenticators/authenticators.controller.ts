import type { User } from '@prisma/client';

import { CookiePayload } from '../../../cookie/cookiePayload.decorator';
import { UserFromCookiePayloadPipe } from '../../../cookie/cookieUserPayload.pipe';
import { AuthenticatorsService } from './authenticators.service';
import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { Authenticator } from '@prisma/client';
import { UpdateAuthenticatorDto } from '@/libs/shared/dto/authenticators';

@Controller('auth/authenticators')
export class AuthenticatorsController {
  constructor(private readonly authenticatorsService: AuthenticatorsService) {}

  @Get()
  async getAll(@CookiePayload(UserFromCookiePayloadPipe) user: User): Promise<Authenticator[]> {
    return this.authenticatorsService.getUserAuthenticators(user.id);
  }

  @Delete()
  async delete(@Param('id') id: string): Promise<Authenticator> {
    return this.authenticatorsService.deleteAuthenticator(id);
  }

  @Patch()
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAuthenticatorDto,
  ): Promise<Authenticator> {
    return this.authenticatorsService.updateAuthenticator(id, dto);
  }
}
