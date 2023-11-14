import { Equals, IsIn, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class BaseFido2ResponseDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  rawId: string;

  @IsOptional()
  @IsString()
  @IsIn(['cross-platform', 'platform'])
  authenticatorAttachment?: AuthenticatorAttachment;

  @IsObject()
  clientExtensionResults: AuthenticationExtensionsClientOutputs;

  @IsString()
  @Equals('public-key')
  type: PublicKeyCredentialType;
}
