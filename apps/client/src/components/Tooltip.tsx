import type { TooltipProps as NextuiTooltipProps } from '@nextui-org/react';
import { Tooltip as NextUiTooltip } from '@nextui-org/react';
import { useCallback, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { twJoin } from 'tailwind-merge';

interface TooltipProps extends NextuiTooltipProps {
  hideHelperCursor?: boolean;
}

/*
 * Overriding the default Tooltip component from NextUI to make it work on mobile devices.
 */
export const Tooltip = ({ children, hideHelperCursor, ...props }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  useClickAway(contentRef, () => {
    setIsOpen(false);
  });

  const handleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <span className={twJoin('hidden lg:inline-block', !hideHelperCursor && 'cursor-help')}>
        <NextUiTooltip {...props}>{children}</NextUiTooltip>
      </span>
      <span className="lg:hidden">
        <NextUiTooltip isOpen={isOpen} {...props}>
          <span ref={contentRef} onClick={handleClick}>
            {children}
          </span>
        </NextUiTooltip>
      </span>
    </>
  );
};
