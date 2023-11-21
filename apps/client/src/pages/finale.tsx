import React, { forwardRef } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { SlideTitle } from '@/client/components/SlideTitle';
import { GitHubStarButton } from '@/client/components/GitHubStarButton';

export function FinalePage(_: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  return (
    <SlideContainer ref={ref}>
      <SlideTitle className="text-6xl font-bold sm:text-7xl">Finale 🎉</SlideTitle>

      <p className="text-4xl font-semibold sm:text-5xl">
        May the <strong className="text-primary">PWA</strong> be with you!
      </p>

      <GitHubStarButton />
    </SlideContainer>
  );
}

export default forwardRef(FinalePage);
