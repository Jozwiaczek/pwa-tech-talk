import { focusClient, showNotification } from './worker.utils';

declare let self: ServiceWorkerGlobalScope;

self.addEventListener('push', (event) => {
  event?.waitUntil(showNotification(event));
});

self.addEventListener('notificationclick', (event) => {
  event?.notification.close();
  event?.waitUntil(focusClient());
});
