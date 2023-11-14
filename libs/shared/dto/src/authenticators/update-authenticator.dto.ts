import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';

export class UpdateAuthenticatorDto implements Prisma.AuthenticatorUncheckedUpdateInput {
  @IsString()
  deviceName: string;
}
