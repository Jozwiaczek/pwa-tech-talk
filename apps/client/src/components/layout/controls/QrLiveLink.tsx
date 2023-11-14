import { QRCodeSVG } from 'qrcode.react';
import React, { useEffect, useState } from 'react';

export const QrLiveLink = () => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  if (!currentUrl) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <QRCodeSVG value={currentUrl} fgColor="#5A0FC8" bgColor="transparent" />
      <p className="text-lg font-light">Scan QR code using your mobile for live experience</p>
    </div>
  );
};
