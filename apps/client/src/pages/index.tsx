import React, { forwardRef } from 'react';
import PageTransition from '../components/PageTransition';

type IndexPageProps = unknown;
type IndexPageRef = React.ForwardedRef<HTMLDivElement>;

export function Index(props: IndexPageProps, ref: IndexPageRef) {
  return (
    <PageTransition ref={ref}>
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-6 bg-blue-500">
        <span className="text-6xl">❤️</span>
        <h1 className="text-content1 text-4xl font-semibold">Fall in love with</h1>
        <h2 className="text-content1 text-6xl font-bold">Progressive Web Applications</h2>
      </div>
    </PageTransition>
  );
}

export default forwardRef(Index);
