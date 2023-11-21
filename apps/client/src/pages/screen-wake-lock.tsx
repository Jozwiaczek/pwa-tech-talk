import React, { forwardRef, useState } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { checkIsWakeLockSupported } from '@/client/utils/checkPwaFeatures';
import { useIsMounted } from '@/client/hooks/useIsMounted';
import { Button } from '@/client/components/Button';
import { toast } from 'react-toastify';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import { SlideTitle } from '@/client/components/SlideTitle';

export function ScreenWakeLock(_: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  const isMounted = useIsMounted();
  const isSupported = checkIsWakeLockSupported();
  const [currentWakeLock, setCurrentWakeLock] = useState<WakeLockSentinel | null>();

  if (!isMounted) {
    return null;
  }

  if (!isSupported) {
    return (
      <SlideContainer ref={ref}>
        <SlideTitle>Wake Lock API</SlideTitle>
        <p className="text-xl">This feature is not supported on your device.</p>
      </SlideContainer>
    );
  }

  const enableWakeLock = async () => {
    try {
      const wakeLock = await navigator.wakeLock.request('screen');
      setCurrentWakeLock(wakeLock);
      toast.info('Wake lock enabled');
    } catch (error) {
      toast.error('Failed to enable wake lock');
    }
  };

  const disableWakeLock = async () => {
    if (currentWakeLock) {
      await currentWakeLock.release();
      setCurrentWakeLock(null);
      toast.info('Wake lock disabled');
    }
  };

  return (
    <SlideContainer ref={ref}>
      <SlideTitle>Wake Lock API</SlideTitle>
      <p className="max-w-2xl">
        The Screen Wake Lock API allows PWAs to request a device to stay awake and prevent the
        screen or system from entering sleep mode, ensuring continuous operation and display
        functionality while the app is running.
      </p>
      {currentWakeLock ? (
        <Button
          size="lg"
          onPress={disableWakeLock}
          endContent={<LockClosedIcon className="size-5" />}
        >
          Disable Wake Lock
        </Button>
      ) : (
        <Button
          size="lg"
          color="primary"
          onPress={enableWakeLock}
          endContent={<LockOpenIcon className="size-5" />}
        >
          Enable Wake Lock
        </Button>
      )}
    </SlideContainer>
  );
}

export default forwardRef(ScreenWakeLock);
