import { IsUUID, IsString } from 'class-validator';

export class PushClientIdDto {
  @IsString()
  @IsUUID(4)
  clientId: string;
}
