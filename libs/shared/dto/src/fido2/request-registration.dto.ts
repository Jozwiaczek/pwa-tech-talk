import { IsString } from 'class-validator';

export class Fido2RequestRegistrationDto {
  @IsString()
  username: string;
}
