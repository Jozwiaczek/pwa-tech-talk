import { NextRouter } from 'next/dist/shared/lib/router/router';
import { useMemo } from 'react';
import { Slide, SlidePath, SLIDES, SlideSeo } from '@/client/slides';

const isSlidePage = (path: string): path is SlidePath => {
  return SLIDES.some((slide) => slide.path === path);
};

const getNextSlide = (path: SlidePath): Slide => {
  const currentSlideIndex = SLIDES.findIndex((slide) => slide.path === path);
  const nextSlideIndex = currentSlideIndex + 1;

  if (nextSlideIndex >= SLIDES.length) {
    return SLIDES[0];
  }

  return SLIDES[nextSlideIndex];
};

const getPreviousSlide = (path: SlidePath): Slide => {
  const currentSlideIndex = SLIDES.findIndex((slide) => slide.path === path);
  const previousSlideIndex = currentSlideIndex - 1;

  if (previousSlideIndex < 0) {
    return SLIDES[SLIDES.length - 1];
  }

  return SLIDES[previousSlideIndex];
};

export const useBaseNavigation = (router: NextRouter) => {
  const currentPathname = router.pathname;

  const currentSlideSeo = useMemo<SlideSeo | undefined>(() => {
    const slide = SLIDES.find((slide) => slide.path === currentPathname);
    return slide?.seo;
  }, [currentPathname]);

  const currentSlideName = useMemo(() => {
    const slide = SLIDES.find((slide) => slide.path === currentPathname);
    return slide?.name;
  }, [currentPathname]);

  const isFirstSlide = currentPathname === SLIDES[0].path;

  const changeSlide = async (getSlide: (path: SlidePath) => Slide) => {
    if (!isSlidePage(currentPathname)) {
      await router.push(SLIDES[0].path);
      return;
    }

    const slide = getSlide(currentPathname);
    await router.push(slide.path);
  };

  const nextSlide = async () => changeSlide(getNextSlide);

  const previousSlide = async () => changeSlide(getPreviousSlide);

  const goToSlide = async (slidePath: SlidePath) => {
    await router.push(slidePath);
  };

  return {
    isFirstSlide,
    currentPathname,
    currentSlideName,
    currentSlideSeo,
    nextSlide,
    previousSlide,
    goToSlide,
  };
};
