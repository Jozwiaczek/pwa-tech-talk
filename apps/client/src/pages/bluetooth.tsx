import React, { forwardRef, useState } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { Button } from '@/client/components/Button';
import {
  Battery50Icon,
  CpuChipIcon,
  ForwardIcon,
  LinkIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { HeartIcon } from '@heroicons/react/24/solid';
import { Checkbox } from '@nextui-org/react';
import { useNavigation } from '@/client/hooks/useNavigation';

export function Feedback(props: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  const { nextSlide } = useNavigation();
  const [heartData, setHeartData] = useState<Array<{ time: number; value: number }>>();
  const [device, setDevice] = useState<BluetoothDevice | undefined>();
  const [batteryLevel, setBatteryLevel] = useState<number | undefined>(undefined);
  const currentHeartRate = heartData?.[heartData?.length - 1]?.value || 0;
  const [shouldAcceptAllTypes, setShouldAcceptAllTypes] = useState(false);

  const isBluetoothAvailable = !!navigator?.bluetooth?.getAvailability();

  if (!isBluetoothAvailable) {
    return (
      <SlideContainer ref={ref}>
        <h1 className="text-4xl font-bold">Web Bluetooth API</h1>
        <p className="font-semibold">
          Your device does not support the Web Bluetooth API.
          <br />
          Try again on Chrome on Desktop or Android.
        </p>
        <Button
          size="lg"
          onClick={nextSlide}
          color="warning"
          endContent={<ForwardIcon className="size-5" />}
        >
          Skip slide
        </Button>
      </SlideContainer>
    );
  }

  const onDisconnected = () => {
    setDevice(undefined);
    toast.info('Device disconnected');
  };

  const disconnectDevice = () => {
    if (!device) {
      return;
    }
    device.gatt?.disconnect();
  };

  const connectToDevice = async () => {
    if (!navigator.bluetooth) {
      toast.warn(
        'Your device does not support the Web Bluetooth API. Try again on Chrome on Desktop or Android!',
      );
      return;
    }

    const requestDeviceOptions: RequestDeviceOptions = shouldAcceptAllTypes
      ? { acceptAllDevices: true }
      : {
          filters: [{ services: ['heart_rate'] }],
          optionalServices: ['battery_service'],
        };

    const device = await navigator?.bluetooth.requestDevice(requestDeviceOptions);
    setDevice(device);
    const server = await device.gatt?.connect();

    const batteryService = await server?.getPrimaryService('battery_service');
    const batteryCharacteristic = await batteryService?.getCharacteristic('battery_level');
    const batteryValue = await batteryCharacteristic?.readValue();
    setBatteryLevel(batteryValue?.getUint8(0));

    const service = await server?.getPrimaryService('heart_rate');
    const characteristic = await service?.getCharacteristic('heart_rate_measurement');
    await characteristic?.startNotifications().then((_) => {
      characteristic?.addEventListener('characteristicvaluechanged', (event) => {
        // @ts-ignore sad
        const value = event.target?.value;
        const deviceValue = value?.getUint8(1);
        setHeartData((prev) => {
          const time = Date.now();
          if (!prev) {
            return [{ time, value: deviceValue }];
          }
          return [...prev, { time, value: deviceValue }];
        });
      });
    });

    device.addEventListener('gattserverdisconnected', onDisconnected);
  };

  return (
    <SlideContainer ref={ref}>
      <h1 className="text-4xl font-bold">Web Bluetooth API</h1>
      {device ? (
        <>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <CpuChipIcon className="size-6" /> {device.name}
            </div>
            <div className="flex items-center gap-2">
              <Battery50Icon className="size-6" /> {batteryLevel}%
            </div>
          </div>
          <Button
            variant="ghost"
            color="secondary"
            onPress={disconnectDevice}
            endContent={<XMarkIcon className="size-5" />}
          >
            Disconnect device
          </Button>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xl font-bold">{currentHeartRate} BPM</p>
            <HeartIcon
              className="size-12 animate-pulse text-red-500"
              style={{
                animationDuration: `${60 / currentHeartRate}s`,
              }}
            />
          </div>
          <div className="h-64 w-screen">
            <ResponsiveContainer>
              <AreaChart data={heartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="totalValueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopOpacity={0.8}
                      stopColor="currentColor"
                      className="text-primary"
                    />
                    <stop
                      offset="95%"
                      stopOpacity={0}
                      stopColor="currentColor"
                      className="text-secondary"
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="value"
                  type="monotone"
                  fillOpacity={1}
                  fill="url(#totalValueGradient)"
                  stroke="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <>
          <Checkbox onValueChange={setShouldAcceptAllTypes} isSelected={shouldAcceptAllTypes}>
            Should accept all bluetooth devices type?
          </Checkbox>
          <Button
            color="primary"
            onPress={connectToDevice}
            endContent={<LinkIcon className="size-5" />}
          >
            Connect heart rate monitor
          </Button>
        </>
      )}
    </SlideContainer>
  );
}

export default forwardRef(Feedback);
