import { PushClientIdDto } from '@/libs/shared/dto/web-push/push-client-id.dto';

export class PushDebugSendDto extends PushClientIdDto implements NotificationOptions {
  title: string;
  body: string;
}
