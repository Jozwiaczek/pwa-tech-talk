import { useBattery } from 'react-use';
import { Card, CardBody, CardHeader, CircularProgress, Spinner } from '@nextui-org/react';
import { useIsMounted } from '@/client/hooks/useIsMounted';

const BatteryStateItem = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <strong>{label}</strong>: <span>{value}</span>
  </div>
);

export const BatteryManagerState = () => {
  const batteryState = useBattery();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  if (!batteryState.isSupported) {
    return (
      <div>
        <strong>Battery sensor</strong>: <span>not supported</span>
      </div>
    );
  }

  if (!batteryState.fetched) {
    return (
      <Spinner
        color="secondary"
        labelColor="secondary"
        size="lg"
        label="Fetching battery state..."
      />
    );
  }

  return (
    <Card className="p-2 sm:p-4">
      <CardHeader className="justify-center">
        <h2 className="text-2xl font-semibold">Battery state</h2>
      </CardHeader>
      <CardBody className="flex flex-col items-center">
        <CircularProgress
          label="Battery level"
          color="secondary"
          size="lg"
          value={batteryState.level * 100}
          showValueLabel
          classNames={{
            value: 'text-lg',
            svg: 'size-24 sm:size-32',
          }}
          className="mb-4"
        />
        <div className="flex flex-col ">
          <BatteryStateItem label="Is charging" value={batteryState.charging ? 'yes' : 'no'} />
          <BatteryStateItem
            label="Charging time"
            value={batteryState.chargingTime ? batteryState.chargingTime : 'finished'}
          />
          <BatteryStateItem label="Discharging time" value={batteryState.dischargingTime} />
        </div>
      </CardBody>
    </Card>
  );
};
