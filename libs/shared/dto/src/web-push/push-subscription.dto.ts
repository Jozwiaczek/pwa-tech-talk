import { PushSubscription } from 'web-push';

export class PushSubscriptionDto implements PushSubscription {
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
}
