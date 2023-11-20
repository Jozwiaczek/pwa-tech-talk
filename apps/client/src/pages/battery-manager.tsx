import React, { forwardRef } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { BatteryManagerState } from '@/client/containers/BatteryManagerState';

export function BatteryManagerPage(_: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  return (
    <SlideContainer ref={ref}>
      <h1 className="text-4xl font-bold">Battery Manager API</h1>
      <p className="max-w-2xl">
        The Battery Manager API provides information about the system&apos;s battery charge level
        and lets you be notified by events that are sent when the battery level or charging status
        change.
      </p>
      <p className="text-warning max-w-2xl font-semibold">
        Current BatteryManager API state is obsolete. <br />
        Although it may still work in some browsers, its use is discouraged since it could be
        removed at any time.
      </p>
      <BatteryManagerState />
    </SlideContainer>
  );
}

export default forwardRef(BatteryManagerPage);
