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
          'flex min-h-screen flex-col items-center gap-5 p-5 text-center sm:justify-center sm:gap-10 sm:p-10',
          className,
        )}
      >
        {children}
      </div>
    </PageTransition>
  ),
);

PageContainer.displayName = 'PageContainer';
