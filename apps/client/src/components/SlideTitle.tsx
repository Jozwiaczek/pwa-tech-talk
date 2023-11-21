import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SlideTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const SlideTitle = ({ children, className }: SlideTitleProps) => (
  <h1 className={twMerge('text-4xl font-bold sm:text-5xl', className)}>{children}</h1>
);
