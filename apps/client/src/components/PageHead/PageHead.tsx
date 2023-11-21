import React from 'react';
import Head from 'next/head';
import { SplashScreensHead } from './components/SplashScreensHead';
import { IconsHead } from '@/client/components/PageHead/components/IconsHead';
import { SocialsHead } from '@/client/components/PageHead/components/SocialsHead';
import { config } from '@/client/config';
import { AppProps } from 'next/app';
import { useBaseNavigation } from '@/client/hooks/useBaseNavigation';

const APP_TITLE = 'PWA Tech Talk';
const APP_DESCRIPTION =
  'A live presentation about progressive web applications, including the most usable or interesting functionalities and Real-world use cases with popular examples.';

export const PageHead = ({ router }: { router: AppProps['router'] }) => {
  const { currentSlideName, currentSlideKeywords } = useBaseNavigation(router);
  const pageTitle = currentSlideName ? `${APP_TITLE} | ${currentSlideName}` : APP_TITLE;

  return (
    <Head>
      <title>{pageTitle}</title>

      <meta name="application-name" content={APP_TITLE} />
      <meta name="apple-mobile-web-app-title" content={APP_TITLE} />
      <meta name="description" content={APP_DESCRIPTION} />
      <meta name="author" content="Jakub Jóźwiak" />
      <meta name="keywords" content={currentSlideKeywords.join(', ')} />

      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#ffffff" />

      <meta charSet="utf-8" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="robots" content="index, follow" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no, viewport-fit=cover"
      />

      <SocialsHead
        siteUrl={config.SITE_URL}
        currentPageTitle={currentSlideName}
        title={APP_TITLE}
        description={APP_DESCRIPTION}
      />
      <IconsHead />
      <SplashScreensHead />
    </Head>
  );
};
