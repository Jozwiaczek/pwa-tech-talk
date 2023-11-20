import React, { forwardRef, useState } from 'react';
import { motion, HTMLMotionProps, PanInfo, AnimationProps } from 'framer-motion';
import { useRouter } from 'next/router';
import { SLIDES } from '@/client/slides';
import { useNavigation } from '@/client/hooks/useNavigation';

const inTheCenter = { x: 0 };
const transition = { duration: 0.6, ease: 'easeInOut' };

interface SlideTransitionProps extends HTMLMotionProps<'div'> {
  disableSwipeNav?: boolean;
}

function SlideTransition(
  { children, disableSwipeNav, ...rest }: SlideTransitionProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const router = useRouter();
  const { nextSlide, previousSlide } = useNavigation();
  const [previousPath] = useState<string>(router.asPath);

  const onPanEnd = async (event: PointerEvent, info: PanInfo) => {
    event.stopPropagation();

    if (disableSwipeNav) {
      return;
    }

    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const isSwipeLeft = offset < -50 && velocity < -50;
    const isSwipeRight = offset > 50 && velocity > 50;

    if (isSwipeLeft) {
      await nextSlide();
      return;
    }

    if (isSwipeRight) {
      await previousSlide();
      return;
    }
  };

  const currentPath = router.asPath;
  const previousPathIndex = SLIDES.findIndex((slide) => slide.path === previousPath);
  const currentPathIndex = SLIDES.findIndex((slide) => slide.path === currentPath);
  const isGoingBack = previousPathIndex > currentPathIndex;

  const onTheRight: AnimationProps['initial'] = isGoingBack ? { x: '-100%' } : { x: '100%' };
  const onTheLeft: AnimationProps['exit'] = isGoingBack ? { x: '100%' } : { x: '-100%' };

  return (
    <motion.div
      ref={ref}
      initial={onTheRight}
      animate={inTheCenter}
      exit={onTheLeft}
      transition={transition}
      className="h-screen overflow-auto"
      onPanEnd={onPanEnd}
      drag={disableSwipeNav ? false : 'x'}
      dragDirectionLock
      dragElastic={0.1}
      dragSnapToOrigin
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default forwardRef(SlideTransition);
