import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from '@/client/components/Navigation';
import { NextUIProvider } from '@nextui-org/react';
import { Inter } from 'next/font/google';
import { twJoin } from 'tailwind-merge';

const inter = Inter({ subsets: ['latin'] });

function CustomApp({ Component, pageProps, router }: AppProps) {
  return (
    <NextUIProvider navigate={router.push}>
      <Head>
        <title>Welcome to client!</title>
      </Head>
      <AnimatePresence mode="popLayout" initial={false}>
        <div
          key={router.pathname}
          className={twJoin(inter.className, 'max-h-screen overflow-hidden')}
        >
          <Component {...pageProps} />
          <Navigation />
        </div>
      </AnimatePresence>
    </NextUIProvider>
  );
}

export default CustomApp;
