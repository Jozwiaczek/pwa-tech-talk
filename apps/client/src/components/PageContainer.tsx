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
          'flex min-h-screen flex-col items-center gap-10 p-10 sm:justify-center',
          className,
        )}
      >
        {children}
      </div>
    </PageTransition>
  ),
);

PageContainer.displayName = 'PageContainer';
