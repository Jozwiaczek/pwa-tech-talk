import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { config } from '@/client/config';

export const useEvents = () => {
  const [totalSpectators, setTotalSpectators] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const internalSocket = io(config.API_URL);

    internalSocket.on('connect', () => {
      setIsConnected(true);
    });

    internalSocket.on('connectedClients', (total: number) => {
      setTotalSpectators(total);
    });

    return () => {
      internalSocket.disconnect();
      setIsConnected(false);
      setTotalSpectators(0);
    };
  }, []);

  return {
    isConnected,
    totalSpectators,
  };
};
