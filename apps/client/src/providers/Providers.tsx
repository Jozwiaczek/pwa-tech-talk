import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ReactQueryProvider from '@/client/providers/ReactQueryProvider';
import { NextUIProvider } from '@nextui-org/react';
import { AnimatePresence } from 'framer-motion';
import { config } from '@/client/config';
import { Analytics } from '@vercel/analytics/react';
import { toast, ToastContainer } from 'react-toastify';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
  dehydratedState: unknown;
  navigate?: (path: string) => void;
}

export const Providers = ({ children, dehydratedState }: ProvidersProps) => (
  <ReactQueryProvider dehydratedState={dehydratedState}>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <AnimatePresence mode="popLayout" initial={false}>
          {children}
        </AnimatePresence>
      </NextThemesProvider>
    </NextUIProvider>
    {config.NODE_ENV === 'production' && <Analytics />}
    <ToastContainer
      position={toast.POSITION.TOP_RIGHT}
      autoClose={5000}
      draggable
      limit={3}
      closeOnClick
      style={{ zIndex: 10000 }}
    />
  </ReactQueryProvider>
);
