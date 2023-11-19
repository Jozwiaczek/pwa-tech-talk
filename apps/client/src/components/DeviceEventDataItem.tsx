import React from 'react';

interface DeviceEventDataItemProps {
  label: string;
  value: string;
}

export const DeviceEventDataItem = ({ label, value }: DeviceEventDataItemProps) => (
  <div className="flex items-center gap-2">
    <p className="text-default-500">{label}:</p>
    <p className="font-bold">{value}</p>
  </div>
);
