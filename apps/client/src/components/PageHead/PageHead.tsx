import React from 'react';
import Head from 'next/head';
import { SplashScreensHead } from './components/SplashScreensHead';
import { IconsHead } from '@/client/components/PageHead/components/IconsHead';
import { SocialsHead } from '@/client/components/PageHead/components/SocialsHead';
import { config } from '@/client/config';
import { AppProps } from 'next/app';
import { useBaseNavigation } from '@/client/hooks/useBaseNavigation';
import { slideSeoSchema } from '@/client/slides';

const APP_TITLE = 'PWA Tech Talk';
const APP_DESCRIPTION =
  'A live presentation about progressive web applications, including the most usable or interesting functionalities and Real-world use cases with popular examples.';

export const PageHead = ({ router }: { router: AppProps['router'] }) => {
  const { currentSlideSeo, currentPathname } = useBaseNavigation(router);
  const seo = currentSlideSeo ? slideSeoSchema.parse(currentSlideSeo) : {};
  const pageTitle = seo?.title || APP_TITLE;
  const pageDescription = seo?.description || APP_DESCRIPTION;
  const currentUrl = `${config.SITE_URL}${currentPathname}`;

  return (
    <Head>
      <title>{pageTitle}</title>

      <meta name="application-name" content={APP_TITLE} />
      <meta name="apple-mobile-web-app-title" content={APP_TITLE} />
      <meta name="description" content={pageDescription} />
      <meta name="author" content="Jakub Jóźwiak" />
      <meta name="keywords" content={seo?.keywords?.join(', ')} />

      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#5A0FC8" />

      <meta charSet="utf-8" />
      <link rel="canonical" href={currentUrl} />
      <link rel="manifest" href="/manifest.json" />
      <meta name="robots" content="index, follow" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no, viewport-fit=cover"
      />

      <SocialsHead
        siteUrl={config.SITE_URL}
        appTitle={APP_TITLE}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
      />
      <IconsHead />
      <SplashScreensHead />
    </Head>
  );
};
