import { IsString } from 'class-validator';

export class Fido2RequestLoginDto {
  @IsString()
  username: string;
}
