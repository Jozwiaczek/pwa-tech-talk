import React, { forwardRef } from 'react';
import { CoverIllustration } from '@/client/assets/illustrations';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { SLIDES } from '@/client/slides';
import { Link } from '@nextui-org/react';
import { useNavigation } from '@/client/hooks/useNavigation';

const TABLE_OF_CONTENTS = SLIDES.slice(2, SLIDES.length);

const firstHalfSlides = TABLE_OF_CONTENTS.slice(0, Math.floor(TABLE_OF_CONTENTS.length / 2));
const secondHalfSlides = TABLE_OF_CONTENTS.slice(
  Math.floor(TABLE_OF_CONTENTS.length / 2),
  TABLE_OF_CONTENTS.length,
);

export function TableOfContents(_: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  const { goToSlide } = useNavigation();

  return (
    <SlideContainer ref={ref}>
      <CoverIllustration />
      <div className="flex w-full max-w-xl flex-col items-center gap-10">
        <h1 className="text-5xl font-bold">Table of contents</h1>
        <ol
          start={3}
          className="flex w-full list-decimal flex-wrap justify-around gap-x-16 gap-y-3 text-left sm:text-center"
        >
          <div className="ml-4 flex flex-col gap-3 sm:m-0">
            {firstHalfSlides.map((slide) => (
              <li key={slide.name}>
                <Link
                  color="secondary"
                  className="hover:cursor-pointer"
                  showAnchorIcon
                  onPress={() => goToSlide(slide.path)}
                >
                  {slide.name}
                </Link>
              </li>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {secondHalfSlides.map((slide) => (
              <li key={slide.name}>
                <Link
                  color="secondary"
                  className="hover:cursor-pointer"
                  showAnchorIcon
                  onPress={() => goToSlide(slide.path)}
                >
                  {slide.name}
                </Link>
              </li>
            ))}
          </div>
        </ol>
      </div>
    </SlideContainer>
  );
}

export default forwardRef(TableOfContents);
