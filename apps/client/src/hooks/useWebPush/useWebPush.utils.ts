import { PushSubscription as PushSubscriptionLib } from 'web-push';

export const isSubscriptionExpired = ({ expirationTime }: PushSubscription): boolean => {
  if (!expirationTime) {
    return false;
  }

  return Date.now() > expirationTime - 5 * 60 * 1000;
};

export const base64ToUint8Array = (base64: string): Uint8Array => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const getSubscriptionToSend = (subscription: PushSubscription): PushSubscriptionLib => {
  const { endpoint, keys } = subscription.toJSON();

  if (!endpoint || !keys) {
    throw new Error('invalid subscription');
  }

  return {
    endpoint: endpoint,
    keys: {
      p256dh: keys.p256dh,
      auth: keys.auth,
    },
  };
};

export const isWebPushGranted = async (): Promise<boolean> => {
  const notificationPermission = await Notification.requestPermission();
  return notificationPermission === 'granted';
};
