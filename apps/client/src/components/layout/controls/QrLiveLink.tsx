import { QRCodeSVG } from 'qrcode.react';
import React from 'react';
import { useCurrentUrl } from '@/client/hooks/useCurrentUrl';

export const QrLiveLink = () => {
  const currentUrl = useCurrentUrl();

  if (!currentUrl) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <QRCodeSVG value={currentUrl} fgColor="#5A0FC8" bgColor="transparent" />
      <p className="font-thin">Scan QR code using your mobile for live experience</p>
    </div>
  );
};
