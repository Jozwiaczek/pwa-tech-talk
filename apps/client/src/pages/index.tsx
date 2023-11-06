import React, { forwardRef } from 'react';
import PageTransition from '../components/PageTransition';
import { PWALogo } from '@/client/assets/logos';
import { Link } from '@nextui-org/react';

type IndexPageProps = unknown;
type IndexPageRef = React.ForwardedRef<HTMLDivElement>;

export function Index(props: IndexPageProps, ref: IndexPageRef) {
  return (
    <PageTransition ref={ref}>
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center text-center">
        <h1 className="text-7xl font-bold sm:text-9xl">
          Fall in <span className="text-primary">❤</span>&nbsp;with
        </h1>
        <PWALogo className="size-64 sm:size-96" />
        <div className="flex flex-wrap items-center justify-center gap-3 text-4xl font-light">
          <p>Tech Talk Series</p>
          <span className="hidden sm:inline-block">|</span>
          <Link
            className="text-primary text-3xl font-light"
            isExternal
            showAnchorIcon
            href="https://github.com/Jozwiaczek"
          >
            Jakub Jóźwiak
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}

export default forwardRef(Index);
