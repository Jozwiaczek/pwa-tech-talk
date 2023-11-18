const checkIsWindowAvailable = () => typeof window !== 'undefined';

const checkIsWorkboxAvailable = () =>
  checkIsWindowAvailable() && 'serviceWorker' in navigator && window.workbox !== undefined;

export const checkIsIosDevice = () => {
  if (!checkIsWindowAvailable()) {
    return false;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

export const checkIsInStandaloneMode = () =>
  checkIsWindowAvailable() && 'standalone' in window.navigator && window.navigator.standalone;

export const checkIsWebPushSupported = () =>
  checkIsWorkboxAvailable() && 'PushManager' in window && 'Notification' in window;

export const checkIsOnlineStatus = () =>
  checkIsWindowAvailable() && 'onLine' in window.navigator && window.navigator.onLine;

export const checkIsBluetoothSupported = () =>
  checkIsWindowAvailable() && 'bluetooth' in window.navigator;

export const checkIsGamepadSupported = () =>
  checkIsWindowAvailable() && 'getGamepads' in window.navigator;

export const checkIsWakeLockSupported = () =>
  checkIsWindowAvailable() && 'wakeLock' in window.navigator;

export const checkIsPaymentRequestSupported = () =>
  checkIsWindowAvailable() && 'PaymentRequest' in window;

export const checkIsWebShareSupported = () =>
  checkIsWindowAvailable() && 'share' in window.navigator;
