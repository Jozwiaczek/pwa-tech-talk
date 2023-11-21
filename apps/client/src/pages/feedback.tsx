import React, { forwardRef } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { SlideTitle } from '@/client/components/SlideTitle';

export function Feedback(_: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  return (
    <SlideContainer ref={ref}>
      <SlideTitle>Feedback</SlideTitle>
    </SlideContainer>
  );
}

export default forwardRef(Feedback);
