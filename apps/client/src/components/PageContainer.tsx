import React, { forwardRef } from 'react';
import PageTransition from '@/client/components/PageTransition';
import { twMerge } from 'tailwind-merge';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  ({ children, className }, ref) => (
    <PageTransition ref={ref}>
      <div
        className={twMerge(
          'pt-safe pb-safe-offset-28 px-safe-offset-5 sm:px-safe-offset-10 sm:pb-safe-offset-0 flex min-h-screen flex-col items-center gap-5 text-center sm:justify-center sm:gap-10',
          className,
        )}
      >
        {children}
      </div>
    </PageTransition>
  ),
);

PageContainer.displayName = 'PageContainer';
