import { CookieSerializeOptions } from '@fastify/cookie';
import { Request } from '@nestjs/common';

export interface CookieResponse extends Response {
  cookie(key: string, value: string, options: CookieSerializeOptions): void;
  clearCookie(key: string): void;
}

export interface CookieRequest extends Request {
  cookies: {
    [cookie: string]: string;
  };
  signedCookies: {
    [cookie: string]: string;
  };
}
