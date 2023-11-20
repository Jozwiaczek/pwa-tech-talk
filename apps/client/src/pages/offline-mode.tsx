import React, { forwardRef } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { useNetworkState } from 'react-use';
import { InformationCircleIcon, WifiIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/client/utils/formatDate';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Tooltip } from '@/client/components/Tooltip';
import { useIsMounted } from '@/client/hooks/useIsMounted';

interface NetworkStateItemProps {
  label: string;
  value: string | undefined;
  hide?: boolean;
  note: string;
}

const NetworkStateItem = ({ label, value, hide, note }: NetworkStateItemProps) => {
  if (hide || !value) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
      <Tooltip content={note} color="primary" className="max-w-md p-4" showArrow>
        <InformationCircleIcon className="size-5" />
      </Tooltip>
    </div>
  );
};

export function OfflineModePage(_: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  const state = useNetworkState();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <SlideContainer ref={ref}>
      <h1 className="text-4xl font-bold">Offline Mode</h1>
      <p className="max-w-2xl">
        PWAs can work offline by utilizing a combination of service workers and offline storage
        technologies.
        <br />
        Service workers act as a proxy between the browser and the network, enabling PWAs to cache
        and serve content when the user is offline or has a poor internet connection.
      </p>
      <p className="text-primary-300 max-w-2xl text-xl font-semibold">
        You can simulate offline mode by turning off your internet connection or by using the
        &quot;Offline&quot; tab in the developer tools.
      </p>
      <Card className="p-2 sm:p-4">
        <CardHeader className="justify-center">
          <h2 className="text-2xl font-semibold">Network State</h2>
        </CardHeader>
        <CardBody>
          <div className="mb-4 flex items-center justify-center gap-2">
            {state.online ? (
              <>
                <WifiIcon className="text-success size-8 sm:size-10 animate-pulse" />
                Online
              </>
            ) : (
              <>
                <WifiIcon className="text-danger size-8 sm:size-10 animate-pulse" />
                Offline
              </>
            )}
          </div>
          <NetworkStateItem
            label="Since"
            note="The {Date} object pointing to the moment when state change occurred."
            value={state.since ? formatDate(state.since, true) : undefined}
          />
          <NetworkStateItem
            label="Downlink"
            note="Effective bandwidth estimate in megabits per second, rounded to the nearest multiple of 25 kilobits per seconds."
            hide={!state.downlink}
            value={`${state.downlink} Mbps`}
          />
          <NetworkStateItem
            label="Downlink max"
            note="Maximum downlink speed, in megabits per second (Mbps), for the underlying connection technology."
            hide={!state.downlinkMax}
            value={`${state.downlinkMax} Mbps`}
          />
          <NetworkStateItem
            label="Effective type"
            note="Effective type of the connection meaning one of 'slow-2g', '2g', '3g', or '4g'. This value is determined using a combination of recently observed round-trip time and downlink values."
            value={state.effectiveType?.toUpperCase()}
          />
          <NetworkStateItem
            label="RTT"
            note="Estimated effective round-trip time of the current connection, rounded to the nearest multiple of 25 milliseconds"
            hide={!state.rtt}
            value={`${state.rtt} ms`}
          />
          <NetworkStateItem
            label="Save data"
            note="Wheter user has set a reduced data usage option on the user agent."
            hide={!('saveData' in state && state?.saveData)}
            value={state.saveData ? 'On' : 'Off'}
          />
          <NetworkStateItem
            label="Type"
            note=" The type of connection a device is using to communicate with the network."
            value={state.type}
          />
        </CardBody>
      </Card>
    </SlideContainer>
  );
}

export default forwardRef(OfflineModePage);
