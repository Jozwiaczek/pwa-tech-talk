import React, { forwardRef, useState } from 'react';
import { motion, HTMLMotionProps, PanInfo, AnimationProps } from 'framer-motion';
import { useRouter } from 'next/router';
import { SLIDES } from '@/client/constants/slides';
import { useNavigation } from '@/client/hooks/useNavigation';

const inTheCenter = { x: 0 };
const transition = { duration: 0.6, ease: 'easeInOut' };

function SlideTransition(
  { children, ...rest }: HTMLMotionProps<'div'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const router = useRouter();
  const { nextSlide, previousSlide } = useNavigation();
  const [previousPath] = useState<string>(router.asPath);

  const onPanEnd = async (event: PointerEvent, info: PanInfo) => {
    event.stopPropagation();

    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const isSwipeLeft = offset < -100 && velocity < -100;
    const isSwipeRight = offset > 100 && velocity > 100;

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
      drag="x"
      dragDirectionLock
      dragElastic={0.2}
      dragSnapToOrigin
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default forwardRef(SlideTransition);
