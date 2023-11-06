import React, { forwardRef } from 'react';
import { PageContainer } from '@/client/components/PageContainer';

const ExamplePage = (props: unknown, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <PageContainer ref={ref} className="bg-red-500">
      <h1 className="text-4xl font-bold">Example Page [2]</h1>
    </PageContainer>
  );
};

export default forwardRef(ExamplePage);
