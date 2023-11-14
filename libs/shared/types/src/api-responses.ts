import { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/typescript-types';

export interface ApiAuthUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
}

export interface ApiAuthCheckResponse {
  user: ApiAuthUser;
  expiresDate: number;
}

export type VerifyFido2LoginResponse = ApiAuthCheckResponse;

export interface Fido2ReqRegistrationResponse {
  registrationOptions: PublicKeyCredentialCreationOptionsJSON;
  deviceName: string;
}
