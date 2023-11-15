import { Body, Controller, Post } from '@nestjs/common';
import { WebPushService } from '@/api/modules/web-push/web-push.service';
import { PushClientIdDto, PushSubscriptionDto } from '@/libs/shared/dto/web-push';
import { PushDebugSendDto } from '@/libs/shared/dto/web-push/push-debug-send.dto';

@Controller('web-push')
export class WebPushController {
  constructor(private readonly webPushService: WebPushService) {}

  @Post('debug-send')
  async debugSend(@Body() dto: PushDebugSendDto): Promise<void> {
    await this.webPushService.debugSend(dto);
  }

  @Post('is-subscribed')
  isSubscribed(@Body() dto: PushClientIdDto): boolean {
    return this.webPushService.isSubscribed(dto);
  }

  @Post('subscribe')
  async subscribe(@Body() { clientId, ...subscription }: PushSubscriptionDto): Promise<void> {
    await this.webPushService.subscribe(subscription, clientId);
  }

  @Post('unsubscribe')
  async unsubscribe(@Body() { clientId, ...subscription }: PushSubscriptionDto): Promise<void> {
    await this.webPushService.unsubscribe(subscription, clientId);
  }
}
