import React, { forwardRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useRouter } from 'next/router';
import { SLIDES } from '@/client/constants/slides';

const inTheCenter = { x: 0 };
const transition = { duration: 0.6, ease: 'easeInOut' };

function SlideTransition(
  { children, ...rest }: HTMLMotionProps<'div'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const router = useRouter();
  const [previousPath] = useState<string>(router.asPath);
  const currentPath = router.asPath;
  const previousPathIndex = SLIDES.findIndex((slide) => slide.path === previousPath);
  const currentPathIndex = SLIDES.findIndex((slide) => slide.path === currentPath);
  const isGoingBack = previousPathIndex > currentPathIndex;

  const onTheRight = isGoingBack ? { x: '-100%' } : { x: '100%' };
  const onTheLeft = isGoingBack ? { x: '100%' } : { x: '-100%' };

  return (
    <motion.div
      ref={ref}
      initial={onTheRight}
      animate={inTheCenter}
      exit={onTheLeft}
      transition={transition}
      className="h-screen overflow-auto"
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default forwardRef(SlideTransition);
