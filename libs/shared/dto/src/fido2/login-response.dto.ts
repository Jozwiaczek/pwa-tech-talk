import type { AuthenticatorAssertionResponseJSON } from '@simplewebauthn/typescript-types';
import { IsNotEmptyObject, IsString } from 'class-validator';

import { BaseFido2ResponseDto } from './base-response.dto';

export class Fido2LoginResponseDto extends BaseFido2ResponseDto {
  @IsString()
  username: string;

  @IsNotEmptyObject()
  response: AuthenticatorAssertionResponseJSON;
}
