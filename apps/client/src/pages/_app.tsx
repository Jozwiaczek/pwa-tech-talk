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

const inter = Inter({ subsets: ['latin'] });

function CustomApp({ Component, pageProps, router }: AppProps) {
  return (
    <NextUIProvider navigate={router.push}>
      <PageHead />
      <AnimatePresence mode="popLayout" initial={false}>
        <div
          key={router.pathname}
          className={twJoin(inter.className, 'max-h-screen overflow-hidden')}
        >
          <Component {...pageProps} />
          <Navigation />
          <ServerInfo />
        </div>
      </AnimatePresence>
      {config.NODE_ENV === 'production' && <Analytics />}
    </NextUIProvider>
  );
}

export default CustomApp;
