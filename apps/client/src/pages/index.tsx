import React, { forwardRef } from 'react';
import { PWALogo } from '@/client/assets/logos';
import { Link } from '@nextui-org/react';
import { SlideContainer } from '@/client/components/SlideContainer';

export function Index(props: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  return (
    <SlideContainer ref={ref} className="justify-center">
      <h1 className="text-7xl font-bold sm:text-9xl">
        Fall in <span className="text-primary">💜</span>&nbsp;with
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
    </SlideContainer>
  );
}

export default forwardRef(Index);
