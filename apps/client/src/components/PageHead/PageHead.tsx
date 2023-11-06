import React from 'react';
import Head from 'next/head';
import { SplashScreensHead } from './components/SplashScreensHead';
import { IconsHead } from '@/client/components/PageHead/components/IconsHead';
import { SocialsHead } from '@/client/components/PageHead/components/SocialsHead';

const APP_TITLE = 'PWA Tech Talk';
const APP_DESCRIPTION = 'Best PWA App in the world';

export const PageHead = () => (
  <Head>
    <title>{APP_TITLE}</title>

    <meta name="application-name" content={APP_TITLE} />
    <meta name="apple-mobile-web-app-title" content={APP_TITLE} />
    <meta name="description" content={APP_DESCRIPTION} />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="theme-color" content="#5A0FC8" />

    <link rel="manifest" href="/manifest.json" />
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
    />

    <IconsHead />
    <SplashScreensHead />
    <SocialsHead title={APP_TITLE} description={APP_DESCRIPTION} />
  </Head>
);
