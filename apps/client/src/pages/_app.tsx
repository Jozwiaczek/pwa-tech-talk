import { AppProps } from 'next/app';
import '../styles/global.css';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from '@/client/components/Navigation';
import { NextUIProvider } from '@nextui-org/react';
import { Inter } from 'next/font/google';
import { twJoin } from 'tailwind-merge';
import { PageHead } from '@/client/components/PageHead/PageHead';
import { ServerInfo } from '@/client/components/ServerInfo';
import { Analytics } from '@vercel/analytics/react';
import { config } from '@/client/config';
import { NextComponentType, NextPageContext } from 'next';

const inter = Inter({ subsets: ['latin'] });

type CustomPageComponentProps = NextComponentType<NextPageContext, unknown, unknown> & {
  hideControls?: boolean;
};

type CustomAppProps = AppProps & {
  Component: CustomPageComponentProps;
};

function CustomApp({ Component, pageProps, router }: CustomAppProps) {
  return (
    <NextUIProvider navigate={router.push}>
      <PageHead />
      <AnimatePresence mode="popLayout" initial={false}>
        <div
          key={router.pathname}
          className={twJoin(inter.className, 'max-h-screen overflow-hidden')}
        >
          <Component {...pageProps} />
          {!Component.hideControls && (
            <>
              <Navigation />
              <ServerInfo />
            </>
          )}
        </div>
      </AnimatePresence>
      {config.NODE_ENV === 'production' && <Analytics />}
    </NextUIProvider>
  );
}

export default CustomApp;
