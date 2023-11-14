import { Injectable, PipeTransform } from '@nestjs/common';
import { User } from '@prisma/client';

import { UsersService } from '../../users/users.service';
import { TokenPayload } from '../token/token.types';

@Injectable()
export class UserFromCookiePayloadPipe implements PipeTransform {
  constructor(private readonly userService: UsersService) {}

  async transform({ sub: userId }: TokenPayload): Promise<User> {
    return this.userService.findUnique({ id: userId });
  }
}
