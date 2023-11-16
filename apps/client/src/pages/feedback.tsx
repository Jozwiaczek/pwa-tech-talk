import React, { forwardRef } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';

export function Feedback(props: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  return (
    <SlideContainer ref={ref}>
      <h1 className="text-4xl font-bold">Feedback Page</h1>
    </SlideContainer>
  );
}

export default forwardRef(Feedback);
