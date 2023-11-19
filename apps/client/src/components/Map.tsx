import { MapContainer, TileLayer } from 'react-leaflet';
import React from 'react';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationMarker } from '@/client/components/LocationMarker';

interface MapProps {
  position: LatLngExpression;
  className?: string;
}

const Map = ({ position, className }: MapProps) => (
  <MapContainer
    center={position}
    zoom={13}
    scrollWheelZoom={false}
    className={className}
    touchZoom={false}
    attributionControl={false}
    dragging={false}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <LocationMarker position={position} />
  </MapContainer>
);

export default Map;
