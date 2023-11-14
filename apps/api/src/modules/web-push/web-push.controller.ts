import { Body, Controller, Post } from '@nestjs/common';
import { WebPushService } from '@/api/modules/web-push/web-push.service';
import { Auth } from '@/api/modules/auth/decorators/auth.decorator';
import { User } from '@prisma/client';
import { UserFromCookiePayloadPipe } from '@/api/modules/auth/cookie/cookieUserPayload.pipe';
import { CookiePayload } from '@/api/modules/auth/cookie/cookiePayload.decorator';
import { PushSubscriptionDto } from '@/libs/shared/dto/web-push';

@Auth()
@Controller('web-push')
export class WebPushController {
  constructor(private readonly webPushService: WebPushService) {}

  @Post('debug-send')
  async debugSend(@CookiePayload(UserFromCookiePayloadPipe) user: User): Promise<void> {
    await this.webPushService.debugSend(user);
  }

  @Post('subscribe')
  async subscribe(
    @Body() subscription: PushSubscriptionDto,
    @CookiePayload(UserFromCookiePayloadPipe) user: User,
  ): Promise<void> {
    await this.webPushService.subscribe(subscription, user);
  }

  @Post('unsubscribe')
  async unsubscribe(
    @Body() subscription: PushSubscriptionDto,
    @CookiePayload(UserFromCookiePayloadPipe) user: User,
  ): Promise<void> {
    await this.webPushService.unsubscribe(subscription, user);
  }
}
