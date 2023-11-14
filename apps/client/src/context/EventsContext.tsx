import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { config } from '@/client/config';

interface EventsProviderProps {
  children: React.ReactNode;
}

interface EventsProviderContext {
  isConnected: boolean;
  isConnecting: boolean;
  totalSpectators: number;
}

const EventsContext = React.createContext<EventsProviderContext>({
  isConnected: false,
  isConnecting: false,
  totalSpectators: 0,
});

export const EventsContextProvider = ({ children }: EventsProviderProps) => {
  const [totalSpectators, setTotalSpectators] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    const internalSocket = io(config.API_URL);
    setIsConnecting(true);

    internalSocket.on('connect', () => {
      setIsConnected(true);
      setIsConnecting(false);
    });

    internalSocket.on('connectedClients', (total: number) => {
      setTotalSpectators(total);
    });

    internalSocket.on('disconnect', () => {
      setIsConnected(false);
      setIsConnecting(false);
    });

    return () => {
      internalSocket.disconnect();
      setIsConnected(false);
      setTotalSpectators(0);
      setIsConnecting(false);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      isConnected,
      isConnecting,
      totalSpectators,
    }),
    [isConnected, isConnecting, totalSpectators],
  );

  return <EventsContext.Provider value={contextValue}>{children}</EventsContext.Provider>;
};

export const useEvents = () => React.useContext(EventsContext);
