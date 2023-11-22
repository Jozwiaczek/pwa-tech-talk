import { twMerge } from 'tailwind-merge';
import React from 'react';

interface ContentBoxProps {
  children: React.ReactNode;
  className?: string;
}

export const ContentBox = ({ children, className }: ContentBoxProps) => (
  <div
    className={twMerge(
      'flex max-w-2xl flex-col items-center justify-center gap-5 text-center sm:gap-10',
      className,
    )}
  >
    {children}
  </div>
);
