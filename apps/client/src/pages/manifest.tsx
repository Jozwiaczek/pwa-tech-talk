import React from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';

const Manifest = (props: unknown, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <SlideContainer ref={ref}>
      <h1 className="text-5xl font-bold">Manifest File</h1>
    </SlideContainer>
  );
};

export default Manifest;
