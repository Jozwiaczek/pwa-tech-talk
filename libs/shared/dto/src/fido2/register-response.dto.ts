import type { AuthenticatorAttestationResponseJSON } from '@simplewebauthn/typescript-types';
import { IsNotEmptyObject, IsString } from 'class-validator';

import { BaseFido2ResponseDto } from './base-response.dto';

export class Fido2RegisterResponseDto extends BaseFido2ResponseDto {
  @IsString()
  username: string;

  @IsNotEmptyObject()
  response: AuthenticatorAttestationResponseJSON;

  @IsString()
  deviceName: string;
}
