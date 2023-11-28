import React, { forwardRef } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { SlideTitle } from '@/client/components/SlideTitle';
import { GitHubStarButton } from '@/client/components/GitHubStarButton';
import { ContentBox } from '@/client/components/ContentBox';
import { Divider } from '@nextui-org/react';
import { BuyMeCoffeeButton } from '@/client/components/BuyMeCoffeeButton';

export function FinalePage(_: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  return (
    <SlideContainer ref={ref}>
      <ContentBox>
        <SlideTitle className="text-6xl font-bold sm:text-7xl">Finale 🎉</SlideTitle>

        <div className="flex flex-col gap-3 sm:gap-6">
          <h2 className="text-2xl font-bold sm:text-3xl">The best of both words</h2>
          <p>
            At their heart, Progressive Web Apps are just web applications. If the new capabilities
            aren&apos;t available, users still get the core experience.
          </p>

          <p>
            Progressive Web Apps provide you with a unique opportunity to deliver a web experience
            your users will love. Using the latest web features to bring enhanced capabilities and
            reliability, Progressive Web Apps allow what you build to be installed by anyone,
            anywhere, on any device with a single codebase.
          </p>
        </div>

        <Divider />

        <h2 className="text-4xl font-semibold sm:text-5xl">
          May the <strong className="text-primary">PWA</strong> be with you!
        </h2>

        <GitHubStarButton />
        <BuyMeCoffeeButton />
      </ContentBox>
    </SlideContainer>
  );
}

export default forwardRef(FinalePage);
