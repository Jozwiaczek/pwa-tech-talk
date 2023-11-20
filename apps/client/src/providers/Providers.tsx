import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ReactQueryProvider from '@/client/providers/ReactQueryProvider';
import { NextUIProvider } from '@nextui-org/react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { EventsContextProvider } from '@/client/context/EventsContext';
import { ToastProvider } from '@/client/providers/ToastProvider';

interface ProvidersProps {
  children: React.ReactNode;
  dehydratedState: unknown;
  navigate?: (path: string) => void;
}

export const Providers = ({ children, dehydratedState }: ProvidersProps) => (
  <ReactQueryProvider dehydratedState={dehydratedState}>
    <EventsContextProvider>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <AnimatePresence mode="popLayout" initial={false}>
            {children}
          </AnimatePresence>
          <ToastProvider />
        </NextThemesProvider>
      </NextUIProvider>
    </EventsContextProvider>
  </ReactQueryProvider>
);
