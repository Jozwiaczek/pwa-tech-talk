import { useRouter } from 'next/router';
import { SLIDES, Slide, SlidePath } from '@/client/slides';
import { useMemo } from 'react';

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

export const useNavigation = () => {
  const router = useRouter();
  const currentPathname = router.pathname;

  const currentSlideName = useMemo(() => {
    const slide = SLIDES.find((slide) => slide.path === currentPathname);
    return slide?.name;
  }, [currentPathname]);

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
    currentPathname,
    currentSlideName,
    nextSlide,
    previousSlide,
    goToSlide,
  };
};
