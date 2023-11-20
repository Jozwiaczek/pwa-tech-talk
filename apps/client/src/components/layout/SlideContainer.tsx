import React, { forwardRef } from 'react';
import SlideTransition from '@/client/components/layout/SlideTransition';
import { twMerge } from 'tailwind-merge';

interface SlideContainerProps {
  children: React.ReactNode;
  className?: string;
  disableSwipeNav?: boolean;
}

export const SlideContainer = forwardRef<HTMLDivElement, SlideContainerProps>(
  ({ children, className, disableSwipeNav }, ref) => (
    <SlideTransition ref={ref} disableSwipeNav={disableSwipeNav}>
      <div
        className={twMerge(
          'pt-safe-offset-10 pb-safe-offset-28 px-safe-offset-5 sm:px-safe-offset-10 sm:pb-safe-offset-32 bg-content1 flex min-h-screen flex-col items-center justify-center gap-5 text-center sm:gap-10',
          className,
        )}
      >
        {children}
      </div>
    </SlideTransition>
  ),
);

SlideContainer.displayName = 'SlideContainer';
