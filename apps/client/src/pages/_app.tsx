import 'regenerator-runtime/runtime'; // Solves "regeneratorRuntime is not defined" error - https://github.com/nrwl/nx/issues/5063
import { AppProps } from 'next/app';
import '../styles/global.css';
import { Inter } from 'next/font/google';
import { twJoin } from 'tailwind-merge';
import { PageHead } from '@/client/components/PageHead/PageHead';
import { config } from '@/client/config';
import { NextComponentType, NextPageContext } from 'next';
import { Providers } from '@/client/providers/Providers';
import { AppLayout } from '@/client/components/layout/AppLayout';
import { ApiRequirementGuard } from '@/client/guards/ApiRequirementGuard';
import { InstallAppModal } from '@/client/components/modals/InstallAppModal';

const inter = Inter({ subsets: ['latin'] });

type CustomPageComponentProps = NextComponentType<NextPageContext, unknown, unknown> & {
  hideControls?: boolean;
  apiRequired?: boolean;
};

type CustomAppProps = AppProps & {
  Component: CustomPageComponentProps;
};

function CustomApp({ Component, pageProps, router }: CustomAppProps) {
  const isDev = config.NODE_ENV === 'development';

  return (
    <Providers navigate={router.push} dehydratedState={pageProps.dehydratedState}>
      <div key={router.pathname} className={twJoin(inter.className, isDev ? 'debug-screens' : '')}>
        <PageHead router={router} />
        <AppLayout hideControls={Component.hideControls}>
          <ApiRequirementGuard isApiRequired={Component.apiRequired}>
            <Component {...pageProps} />
            <InstallAppModal />
          </ApiRequirementGuard>
        </AppLayout>
      </div>
    </Providers>
  );
}

export default CustomApp;
