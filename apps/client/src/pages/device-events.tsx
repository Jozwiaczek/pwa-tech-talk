import React, { forwardRef, useEffect, useState } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { Button } from '@/client/components/Button';
import { Card, CardBody } from '@nextui-org/react';
import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { DeviceEventDataItem } from '@/client/components/DeviceEventDataItem';

interface OrientationData {
  zAxis: string;
  xAxis: string;
  yAxis: string;
  mode: 'portrait' | 'landscape' | 'unknown';
}

interface MotionData {
  acceleration: {
    x: string;
    y: string;
    z: string;
  };
  accelerationIncludingGravity: {
    x: string;
    y: string;
    z: string;
  };
  rotationRate: {
    alpha: string;
    beta: string;
    gamma: string;
  };
}

const getOrientationPermission = async () => {
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

const getMotionPermission = async () => {
  if (!window.DeviceMotionEvent || !window.DeviceMotionEvent.requestPermission) {
    return toast.warn('Your current device does not have access to the DeviceMotion event');
  }

  const permission = await window.DeviceMotionEvent.requestPermission();
  if (permission !== 'granted') {
    return toast.warn("You must grant access to the device's sensor for this demo");
  }
  toast.info('Device motion permission granted');
};

const getReadableMotionData = (data: number | null | undefined, unit: string) => {
  if (!data) {
    return '0' + unit;
  }
  return `${data.toFixed(1)}${unit}`;
};

const ORIENTATION_DEFAULT_DATA: OrientationData = {
  zAxis: '0°',
  xAxis: '0°',
  yAxis: '0°',
  mode: 'unknown',
};

const MOTION_DEFAULT_DATA: MotionData = {
  acceleration: {
    x: '0m/s²',
    y: '0m/s²',
    z: '0m/s²',
  },
  accelerationIncludingGravity: {
    x: '0m/s²',
    y: '0m/s²',
    z: '0m/s²',
  },
  rotationRate: {
    alpha: '0°/s',
    beta: '0°/s',
    gamma: '0°/s',
  },
};

export function DeviceEventsPage(props: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  const [orientation, setOrientation] = useState<OrientationData>(ORIENTATION_DEFAULT_DATA);
  const [motion, setMotion] = useState<MotionData>(MOTION_DEFAULT_DATA);

  const deviceOrientationHandler = (event: DeviceOrientationEvent) => {
    const zAxis = event.alpha?.toFixed(1) + '°';
    const xAxis = event.beta?.toFixed(1) + '°';
    const yAxis = event.gamma?.toFixed(1) + '°';
    const mode = Math.abs(event.beta || 0) > Math.abs(event.gamma || 0) ? 'portrait' : 'landscape';
    setOrientation({ zAxis, xAxis, yAxis, mode });
  };

  const deviceMotionHandler = (event: DeviceMotionEvent) => {
    const acceleration = {
      x: getReadableMotionData(event.acceleration?.x, 'm/s²'),
      y: getReadableMotionData(event.acceleration?.y, 'm/s²'),
      z: getReadableMotionData(event.acceleration?.z, 'm/s²'),
    };
    const accelerationIncludingGravity = {
      x: getReadableMotionData(event.accelerationIncludingGravity?.x, 'm/s²'),
      y: getReadableMotionData(event.accelerationIncludingGravity?.y, 'm/s²'),
      z: getReadableMotionData(event.accelerationIncludingGravity?.z, 'm/s²'),
    };
    const rotationRate = {
      alpha: getReadableMotionData(event.rotationRate?.alpha, '°/s'),
      beta: getReadableMotionData(event.rotationRate?.beta, '°/s'),
      gamma: getReadableMotionData(event.rotationRate?.gamma, '°/s'),
    };
    setMotion({ acceleration, accelerationIncludingGravity, rotationRate });
  };

  useEffect(() => {
    window.addEventListener('deviceorientation', deviceOrientationHandler);
    window.addEventListener('devicemotion', deviceMotionHandler);
    return () => {
      window.removeEventListener('deviceorientation', deviceOrientationHandler);
      window.removeEventListener('devicemotion', deviceMotionHandler);
    };
  }, []);

  return (
    <SlideContainer ref={ref}>
      <h1 className="text-4xl font-bold">Device Events APIs</h1>
      <p className="max-w-2xl">
        With the DeviceOrientation and DeviceMotion event, you can detect the orientation, physical
        motion, and motion of a device in three-dimensional space to create advanced interactive
        experiences in your PWAs.
      </p>
      <div className="mt-5 flex w-full max-w-2xl flex-wrap justify-center gap-10 md:justify-between">
        <div className="flex flex-col items-center justify-start gap-5">
          <Button
            size="lg"
            onPress={getOrientationPermission}
            color="primary"
            endContent={<DevicePhoneMobileIcon className="size-5" />}
          >
            Request orientation permission
          </Button>
          <Card>
            <CardBody className="w-64">
              <h2 className="mb-3 text-xl font-semibold">Device orientation</h2>
              <DeviceEventDataItem label="Z axis" value={orientation.zAxis} />
              <DeviceEventDataItem label="X axis" value={orientation.xAxis} />
              <DeviceEventDataItem label="Y axis" value={orientation.yAxis} />
              <DeviceEventDataItem label="Mode" value={orientation.mode} />
            </CardBody>
          </Card>
        </div>

        <div className="flex flex-col items-center justify-start gap-5">
          <Button
            size="lg"
            onPress={getMotionPermission}
            color="primary"
            endContent={<DevicePhoneMobileIcon className="size-5" />}
          >
            Request motion permission
          </Button>
          <Card>
            <CardBody className="w-64">
              <h2 className="mb-3 text-xl font-semibold">Device motion</h2>
              <div className="flex flex-col gap-2">
                <p>Acceleration:</p>
                <div className="pl-4">
                  <DeviceEventDataItem label="x" value={motion.acceleration.x} />
                  <DeviceEventDataItem label="y" value={motion.acceleration.y} />
                  <DeviceEventDataItem label="z" value={motion.acceleration.z} />
                </div>
                <p>Acceleration including gravity:</p>
                <div className="pl-4">
                  <DeviceEventDataItem label="x" value={motion.accelerationIncludingGravity.x} />
                  <DeviceEventDataItem label="y" value={motion.accelerationIncludingGravity.y} />
                  <DeviceEventDataItem label="z" value={motion.accelerationIncludingGravity.z} />
                </div>
                <p>Rotation rate:</p>
                <div className="pl-4">
                  <DeviceEventDataItem label="alpha" value={motion.rotationRate.alpha} />
                  <DeviceEventDataItem label="beta" value={motion.rotationRate.beta} />
                  <DeviceEventDataItem label="gamma" value={motion.rotationRate.gamma} />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </SlideContainer>
  );
}

export default forwardRef(DeviceEventsPage);
