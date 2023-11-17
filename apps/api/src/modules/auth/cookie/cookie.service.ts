import { CookieSerializeOptions } from '@fastify/cookie';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { CookieRequest, CookieResponse } from './cookie.types';
import { config } from '@/api/config';

@Injectable({ scope: Scope.REQUEST })
export class CookieService {
  constructor(@Inject(REQUEST) private request: CookieRequest) {}

  public getCookie(key: string): string {
    console.log('L:13 | this.request.cookies: ', this.request.cookies);
    console.log('L:14 | this.request.cookies: ', this.request.signedCookies);
    if (config.NODE_ENV === 'production') {
      return this.request.signedCookies[key];
    }
    return this.request.cookies[key];
  }

  public setCookie(res: CookieResponse, key: string, value: string, expires?: Date): void {
    const options = this.getCookieOptions();

    res.cookie(key, value, { ...options, expires });
  }

  public clearCookie(res: CookieResponse, key: string): void {
    const options = this.getCookieOptions();

    res.cookie(key, '', { ...options, maxAge: 0 });
  }

  private getCookieOptions(): CookieSerializeOptions {
    const isProd = config.NODE_ENV === 'production';

    return {
      httpOnly: true,
      path: '/',
      signed: isProd,
      secure: isProd,
      sameSite: isProd ? 'strict' : undefined,
    };
  }
}
