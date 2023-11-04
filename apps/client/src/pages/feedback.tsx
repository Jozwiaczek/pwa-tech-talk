import React, { forwardRef } from 'react';
import PageTransition from '../components/PageTransition';

type FeedbackPageProps = unknown;
type FeedbackPageRef = React.ForwardedRef<HTMLDivElement>;

export function Feedback(props: FeedbackPageProps, ref: FeedbackPageRef) {
  return (
    <PageTransition ref={ref}>
      <div className="flex h-full w-full flex-col items-center justify-center bg-green-500">
        <h1 className="text-4xl font-bold">Feedback Page [3]</h1>
      </div>
    </PageTransition>
  );
}

export default forwardRef(Feedback);
