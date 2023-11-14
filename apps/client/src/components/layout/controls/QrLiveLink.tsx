import { QRCodeSVG } from 'qrcode.react';
import React from 'react';
import { config } from '@/client/config';

const getClientURL = () => {
  const { NODE_ENV, NEXT_PUBLIC_VERCEL_URL } = config;
  const isProduction = NODE_ENV === 'production';

  if (!isProduction) {
    return `http://${NEXT_PUBLIC_VERCEL_URL}`;
  }

  return `https://${NEXT_PUBLIC_VERCEL_URL}`;
};

const CLIENT_URL = getClientURL();

export const QrLiveLink = () => (
  <div className="flex flex-col items-center justify-center gap-5">
    <QRCodeSVG value={CLIENT_URL} fgColor="#5A0FC8" bgColor="transparent" />
    <p className="text-lg font-light">Scan QR code using your mobile for live experience</p>
  </div>
);
