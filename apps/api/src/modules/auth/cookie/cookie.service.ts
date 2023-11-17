import { CookieSerializeOptions } from '@fastify/cookie';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { CookieRequest, CookieResponse } from './cookie.types';

@Injectable({ scope: Scope.REQUEST })
export class CookieService {
  constructor(@Inject(REQUEST) private request: CookieRequest) {}

  public getCookie(key: string): string {
    // if (config.NODE_ENV === 'production') {
    //   return this.request.signedCookies[key];
    // }

    console.log('L:16 | this.request: ', this.request);
    console.log('---------------\n\n');
    console.log('L:16 | this.request.cookies: ', this.request.cookies);

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
    // const isProd = config.NODE_ENV === 'production';

    return {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'none',
      // signed: isProd,
      // domain: isProd ? 'pwa-tech-talk.vercel.app' : 'localhost',
      // secure: isProd,
      // signed: isProd,
      // sameSite: isProd ? 'strict' : undefined,
    };
  }
}
