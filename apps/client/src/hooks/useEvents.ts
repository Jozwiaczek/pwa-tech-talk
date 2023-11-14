import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { config } from '@/client/config';

export const useEvents = () => {
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

  return {
    isConnected,
    isConnecting,
    totalSpectators,
  };
};
