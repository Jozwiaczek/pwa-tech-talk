import React, { forwardRef } from 'react';
import PageTransition from '../components/PageTransition';

type IndexPageProps = unknown;
type IndexPageRef = React.ForwardedRef<HTMLDivElement>;

export function Index(props: IndexPageProps, ref: IndexPageRef) {
  return (
    <PageTransition ref={ref}>
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-blue-500">
        <h1 className="text-4xl font-bold">Home Page [1]</h1>
      </div>
    </PageTransition>
  );
}

export default forwardRef(Index);
