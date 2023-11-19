import { Icon, LatLngExpression } from 'leaflet';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import React, { useEffect } from 'react';

interface LocationMarkerProps {
  position: LatLngExpression;
}

export const LocationMarker = ({ position }: LocationMarkerProps) => {
  const map = useMapEvents({});

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [map, position]);

  if (!position) {
    return null;
  }

  return (
    <Marker
      position={position}
      icon={
        new Icon({
          iconUrl: '/map-pin.svg',
          iconSize: [40, 40],
        })
      }
    >
      <Popup>Your current location</Popup>
    </Marker>
  );
};
