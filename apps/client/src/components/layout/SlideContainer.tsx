import React, { forwardRef } from 'react';
import SlideTransition from '@/client/components/layout/SlideTransition';
import { twMerge } from 'tailwind-merge';
import { config } from '@/client/config';
import { Analytics } from '@vercel/analytics/react';

interface SlideContainerProps {
  children: React.ReactNode;
  className?: string;
  disableSwipeNav?: boolean;
}

export const SlideContainer = forwardRef<HTMLDivElement, SlideContainerProps>(
  ({ children, className, disableSwipeNav }, ref) => (
    <>
      <SlideTransition ref={ref} disableSwipeNav={disableSwipeNav}>
        <div
          className={twMerge(
            'pt-safe-offset-20 pb-safe-offset-28 px-safe-offset-5 sm:px-safe-offset-10 sm:pb-safe-offset-32 bg-content1 flex min-h-screen flex-col items-center justify-center gap-5 text-center sm:gap-10',
            className,
          )}
        >
          {children}
        </div>
      </SlideTransition>
      {config.NODE_ENV === 'production' && <Analytics />}
    </>
  ),
);

SlideContainer.displayName = 'SlideContainer';
