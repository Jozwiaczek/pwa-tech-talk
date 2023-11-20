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

export const checkIsSafari = () => {
  if (!checkIsWindowAvailable()) {
    return false;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();

  const isIos = checkIsIosDevice();
  const isWebkit = /webkit/.test(userAgent);
  const isCriOS = /crios/.test(userAgent);
  return isIos && isWebkit && !isCriOS;
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

export const checkIsSynthesisSpeechSupported = () =>
  checkIsWindowAvailable() && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
