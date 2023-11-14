export interface PushNotificationPayload {
  title: string;
  // https://developer.mozilla.org/en-US/docs/Web/API/notification#instance_properties
  options?: NotificationOptions;
}
