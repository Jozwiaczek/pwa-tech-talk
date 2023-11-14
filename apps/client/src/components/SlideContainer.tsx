import React, { forwardRef } from 'react';
import SlideTransition from '@/client/components/SlideTransition';
import { twMerge } from 'tailwind-merge';

interface SlideContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const SlideContainer = forwardRef<HTMLDivElement, SlideContainerProps>(
  ({ children, className }, ref) => (
    <SlideTransition ref={ref}>
      <div
        className={twMerge(
          'pt-safe pb-safe-offset-28 px-safe-offset-5 sm:px-safe-offset-10 sm:pb-safe-offset-0 flex min-h-screen flex-col items-center justify-center gap-5 text-center sm:justify-center sm:gap-10',
          className,
        )}
      >
        {children}
      </div>
    </SlideTransition>
  ),
);

SlideContainer.displayName = 'SlideContainer';
