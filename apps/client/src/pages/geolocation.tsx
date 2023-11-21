import React, { forwardRef, useState } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { toast } from 'react-toastify';
import { Button } from '@/client/components/Button';
import { MapPinIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import { LatLngExpression } from 'leaflet';
import { SlideTitle } from '@/client/components/SlideTitle';
import { checkIsGeolocationSupported } from '@/client/utils/checkPwaFeatures';

const Map = dynamic(() => import('@/client/components/Map'), { ssr: false });

const DEFAULT_POSITION: LatLngExpression = [40.67696305938522, -73.92457132156235]; // Doctor Strange's Sanctum Sanctorum 🧙🏻

export function GeolocationPage(_: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  const [isLoading, setIsLoading] = useState(false);
  const [mapPosition, setMapPosition] = useState<LatLngExpression>(DEFAULT_POSITION);

  const currentPositionSuccessHandler = (position: GeolocationPosition) => {
    setMapPosition([position.coords.latitude, position.coords.longitude]);
    setIsLoading(false);
  };

  const currentPositionErrorHandler = (error: GeolocationPositionError) => {
    toast.error(error.message);
    setIsLoading(false);
  };

  const requestGeolocation = async () => {
    if (!checkIsGeolocationSupported()) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    const permission = await navigator.permissions?.query({ name: 'geolocation' });
    if (permission.state === 'denied') {
      toast.error('Geolocation permission is denied');
      return;
    }

    if (permission?.state === 'prompt') {
      toast.error(`Geolocation permission is not granted yet. Please click "Allow" in the prompt.`);
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      currentPositionSuccessHandler,
      currentPositionErrorHandler,
    );
  };

  return (
    <SlideContainer ref={ref}>
      <SlideTitle>Geolocation API</SlideTitle>
      <p className="max-w-2xl">
        The Geolocation API enables your app to ask users to share their location. For privacy
        reasons, the user is asked for permission before their geolocation data is shared with your
        PWA.
      </p>
      <Button
        size="lg"
        color="primary"
        onPress={requestGeolocation}
        endContent={<MapPinIcon className="size-5" />}
        isLoading={isLoading}
      >
        Request Geolocation
      </Button>
      <Map position={mapPosition} className="h-64 w-screen sm:h-96" />
    </SlideContainer>
  );
}

export default forwardRef(GeolocationPage);
