import React, { forwardRef } from 'react';
import PageTransition from '@/client/components/PageTransition';

type IndexPageProps = unknown;
type IndexPageRef = React.ForwardedRef<HTMLDivElement>;

const ExamplePage = (props: IndexPageProps, ref: IndexPageRef) => {
  return (
    <PageTransition ref={ref}>
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-red-500">
        <h1 className="text-4xl font-bold">Example Page [2]</h1>
      </div>
    </PageTransition>
  );
};

export default forwardRef(ExamplePage);
