import type { ButtonProps as NIButtonProps } from '@nextui-org/react';
import { Button as NIButton } from '@nextui-org/react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const Button = forwardRef<HTMLButtonElement, NIButtonProps>(
  ({ className, ...props }, ref) => (
    <NIButton
      ref={ref}
      type="button"
      className={twMerge(
        'group transition-[transform,shadow] ease-in-out hover:scale-[1.02] hover:shadow-md hover:transition-[transform,shadow]',
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = 'Button';
