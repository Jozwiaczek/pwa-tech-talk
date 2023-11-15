import { PushNotificationPayload } from '@/libs/shared/types/web-push';

declare let self: ServiceWorkerGlobalScope;

export const focusClient = async () => {
  try {
    const clientList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const client = clientList.find((c) => c.focused) || clientList[0];

    if (client) {
      client.focus();
    } else {
      await self.clients.openWindow('/');
    }
  } catch (error) {
    console.error('Error in focusClient:', error);
  }
};

export const showNotification = async (event: PushEvent | undefined) => {
  if (!event || !event.data) {
    return;
  }

  const { title, options } = event.data.json() as PushNotificationPayload;

  const optionsWithDefaults: NotificationOptions = {
    icon: '/icons/icon512_maskable.png',
    ...options,
  };

  return self.registration.showNotification(title, optionsWithDefaults);
};
