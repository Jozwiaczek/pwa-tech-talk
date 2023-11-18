import React, { forwardRef, useEffect, useState } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { Button } from '@/client/components/Button';
import { Card, CardBody } from '@nextui-org/react';
import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

interface OrientationData {
  zAxis: string;
  xAxis: string;
  yAxis: string;
  mode: 'portrait' | 'landscape' | 'unknown';
}

export function DeviceEventsPage(props: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  const [orientation, setOrientation] = useState<OrientationData>({
    zAxis: '0°',
    xAxis: '0°',
    yAxis: '0°',
    mode: 'unknown',
  });

  const getOrientation = async () => {
    if (!window.DeviceOrientationEvent || !window.DeviceOrientationEvent.requestPermission) {
      return toast.warn('Your current device does not have access to the DeviceOrientation event');
    }

    const permission = await window.DeviceOrientationEvent.requestPermission();
    if (permission !== 'granted') {
      toast.warn("You must grant access to the device's sensor for this demo");
      return;
    }
    toast.info('Device orientation permission granted');
  };

  const deviceOrientationHandler = (event: DeviceOrientationEvent) => {
    const zAxis = event.alpha?.toFixed(1) + '°';
    const xAxis = event.beta?.toFixed(1) + '°';
    const yAxis = event.gamma?.toFixed(1) + '°';
    const mode = Math.abs(event.beta || 0) > Math.abs(event.gamma || 0) ? 'portrait' : 'landscape';
    setOrientation({ zAxis, xAxis, yAxis, mode });
  };

  useEffect(() => {
    window.addEventListener('deviceorientation', deviceOrientationHandler);
    return () => {
      window.removeEventListener('deviceorientation', deviceOrientationHandler);
    };
  }, []);

  return (
    <SlideContainer ref={ref}>
      <h1 className="text-4xl font-bold">Device Events APIs</h1>
      <Button
        size="lg"
        onPress={getOrientation}
        color="primary"
        endContent={<DevicePhoneMobileIcon className="size-5" />}
      >
        Request orientation permission
      </Button>
      <Card>
        <CardBody>
          <h2 className="mb-3 text-xl font-semibold">Device orientation</h2>

          <div className="flex items-center gap-2">
            <p>Z axis:</p>
            <p className="font-bold">{orientation.zAxis}</p>
          </div>
          <div className="flex items-center gap-2">
            <p>X axis:</p>
            <p className="font-bold">{orientation.xAxis}</p>
          </div>
          <div className="flex items-center gap-2">
            <p>Y axis:</p>
            <p className="font-bold">{orientation.yAxis}</p>
          </div>
          <div className="flex items-center gap-2">
            <p>Mode:</p>
            <p className="font-bold">{orientation.mode}</p>
          </div>
        </CardBody>
      </Card>
    </SlideContainer>
  );
}

export default forwardRef(DeviceEventsPage);
