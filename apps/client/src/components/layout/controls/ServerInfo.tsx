import { Badge } from '@nextui-org/react';
import { SignalIcon, SignalSlashIcon, UserGroupIcon, WifiIcon } from '@heroicons/react/24/outline';
import { useEvents } from '@/client/context/EventsContext';
import { useNetworkState } from 'react-use';
import { Tooltip } from '@/client/components/Tooltip';
import { useIsMounted } from '@/client/hooks/useIsMounted';

export const ServerInfo = () => {
  const isMounted = useIsMounted();
  const { online } = useNetworkState();
  const { totalSpectators, isConnected } = useEvents();

  if (!isMounted) {
    return null;
  }

  return (
    <aside className="flex h-16 flex-col items-end justify-center sm:h-auto">
      {!online && (
        <Tooltip content="No internet connection">
          <WifiIcon className="text-danger size-8 animate-pulse" />
        </Tooltip>
      )}
      {isConnected && (
        <Badge content={totalSpectators} color="secondary" shape="circle">
          <Tooltip content={`${totalSpectators} active spectators`}>
            <UserGroupIcon className="size-8 cursor-help" />
          </Tooltip>
        </Badge>
      )}
      {isConnected ? (
        <Tooltip content="Server is online">
          <SignalIcon className="size-8 text-success cursor-help" />
        </Tooltip>
      ) : (
        <Tooltip content="Server is offline">
          <SignalSlashIcon className="size-8 text-warning cursor-help" />
        </Tooltip>
      )}
    </aside>
  );
};
