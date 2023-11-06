import React, { forwardRef } from 'react';
import { PageContainer } from '@/client/components/PageContainer';

export function Feedback(props: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  return (
    <PageContainer ref={ref} className="bg-green-500">
      <h1 className="text-4xl font-bold">Feedback Page [3]</h1>
    </PageContainer>
  );
}

export default forwardRef(Feedback);
