import { PushSubscription } from 'web-push';
import { PushClientIdDto } from '@/libs/shared/dto/web-push/push-client-id.dto';

export class PushSubscriptionDto extends PushClientIdDto implements PushSubscription {
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
}
