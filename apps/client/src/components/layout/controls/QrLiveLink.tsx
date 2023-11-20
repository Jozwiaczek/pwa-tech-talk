import { QRCodeSVG } from 'qrcode.react';
import React from 'react';
import { useCurrentUrl } from '@/client/hooks/useCurrentUrl';
import { useTheme } from 'next-themes';

export const QrLiveLink = () => {
  const currentUrl = useCurrentUrl();
  const { resolvedTheme } = useTheme();

  if (!currentUrl) {
    return null;
  }

  const qrCodeColor = resolvedTheme === 'dark' ? '#a379e7' : '#5A0FC8';

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <QRCodeSVG value={currentUrl} fgColor={qrCodeColor} bgColor="transparent" />
      <p className="font-thin">Scan QR code using your mobile for live experience</p>
    </div>
  );
};
