import { Injectable, Logger } from '@nestjs/common';
import type { PushSubscription } from 'web-push';
import webPush from 'web-push';
import { PushNotificationPayload } from '@/libs/shared/types/web-push';
import { config } from '@/api/config';
import { PushDebugSendDto } from '@/libs/shared/dto/web-push/push-debug-send.dto';
import { PushClientIdDto } from '@/libs/shared/dto/web-push';

@Injectable()
export class WebPushService {
  private readonly logger: Logger = new Logger(WebPushService.name);
  private subscriptions = new Map<string, { endpoint: string; p256dh: string; auth: string }>();

  constructor() {
    webPush.setVapidDetails(
      `mailto:${config.WEB_PUSH_CONTACT_EMAIL}`,
      config.WEB_PUSH_PUBLIC_KEY,
      config.WEB_PUSH_PRIVATE_KEY,
    );
    this.logger.log('Web push vapid details initialized');
  }

  public isSubscribed(dto: PushClientIdDto): boolean {
    return this.subscriptions.has(dto.clientId);
  }

  public async subscribe(subscription: PushSubscription, clientId: string): Promise<void> {
    const { endpoint, keys } = subscription;
    const { p256dh, auth } = keys;

    this.subscriptions.set(clientId, { endpoint, p256dh, auth });

    this.logger.log(`[${clientId}] Subscribed`);
  }

  public async unsubscribe(subscription: PushSubscription, clientId: string): Promise<void> {
    const userSubscription = this.subscriptions.get(clientId);
    if (!userSubscription) {
      this.logger.warn(`[${clientId}] No subscriptions found`);
      return;
    }

    this.subscriptions.delete(clientId);
    this.logger.log(`[${clientId}] Unsubscribed`);
  }

  public async send(clientId: string, payload: PushNotificationPayload): Promise<void> {
    const userSubscription = this.subscriptions.get(clientId);

    if (!userSubscription) {
      this.logger.warn(`[${clientId}] No subscriptions found`);
      return;
    }

    this.logger.log(
      `[${clientId}] Sending (title: "${payload.title}", ${
        payload.options ? `, options: ${JSON.stringify(payload.options)}` : ''
      })`,
    );

    try {
      const composedSubscription = {
        endpoint: userSubscription.endpoint,
        keys: { p256dh: userSubscription.p256dh, auth: userSubscription.auth },
      };
      const payloadString = JSON.stringify(payload);
      await webPush.sendNotification(composedSubscription, payloadString);

      this.logger.log(`[${clientId}] notification sent`);
    } catch (error) {
      this.logger.error(error);
    }
  }

  public async debugSend({
    clientId,
    title,
    ...notificationOpts
  }: PushDebugSendDto): Promise<void> {
    const payload: PushNotificationPayload = {
      title: title || 'Test title',
      options: {
        body: 'Test body',
        requireInteraction: true,
        actions: [
          {
            action: 'test-action',
            title: 'Test action',
          },
        ],
        ...notificationOpts,
      },
    };

    await this.send(clientId, payload);
  }
}
