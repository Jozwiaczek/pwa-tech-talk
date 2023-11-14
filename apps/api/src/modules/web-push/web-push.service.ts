import { Injectable, Logger } from '@nestjs/common';
import { User, WebPushSubscription } from '@prisma/client';
import type { PushSubscription } from 'web-push';
import webPush from 'web-push';

import { PrismaService } from '../prisma/prisma.service';
import { PushNotificationPayload } from '@/libs/shared/types/web-push';
import { config } from '@/api/config';

@Injectable()
export class WebPushService {
  private readonly logger: Logger = new Logger(WebPushService.name);

  constructor(private readonly prisma: PrismaService) {
    webPush.setVapidDetails(
      `mailto:${config.WEB_PUSH_CONTACT_EMAIL}`,
      config.WEB_PUSH_PUBLIC_KEY,
      config.WEB_PUSH_PRIVATE_KEY,
    );
    this.logger.log('Web push vapid details initialized');
  }

  public async subscribe(subscription: PushSubscription, user: User): Promise<void> {
    const { endpoint, keys } = subscription;
    const { p256dh, auth } = keys;

    await this.prisma.webPushSubscription.create({
      data: {
        endpoint,
        p256dh,
        auth,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    this.logger.log(`[${user.username}] Subscribed`);
  }

  public async unsubscribe(subscription: PushSubscription, user: User): Promise<void> {
    const userSubscriptions = await this.getUserSubscriptions(user.id);
    if (!userSubscriptions.length) {
      this.logger.warn(`[${user.username}] No subscriptions found`);
      return;
    }

    const matchingSubscription = userSubscriptions.find(
      ({ endpoint }) => endpoint === subscription.endpoint,
    );

    if (!matchingSubscription) {
      this.logger.warn(`[${user.username}] No matching subscription found`);
      return;
    }

    const { endpoint } = subscription;
    await this.prisma.webPushSubscription.delete({
      where: {
        endpoint,
      },
    });
    this.logger.log(`[${user.username}] Unsubscribed`);
  }

  public async send(user: User, payload: PushNotificationPayload): Promise<void> {
    const userSubscriptions = await this.getUserSubscriptions(user.id);

    if (!userSubscriptions.length) {
      this.logger.warn(`[${user.username}] No subscriptions found`);
      return;
    }

    this.logger.log(
      `[${user.username}] Sending (title: "${payload.title}", ${
        payload.options ? `, options: ${JSON.stringify(payload.options)}` : ''
      })`,
    );

    const sendPromises = userSubscriptions.map(({ endpoint, p256dh, auth }) => {
      const subscription = { endpoint, keys: { p256dh, auth } };
      const payloadString = JSON.stringify(payload);
      return webPush.sendNotification(subscription, payloadString);
    });

    try {
      await Promise.all(sendPromises);

      const sendTotal = sendPromises.length;
      this.logger.log(
        `[${user.username}] ${sendTotal} ${sendTotal > 1 ? 'notifications' : 'notification'} sent`,
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  public async debugSend(user: User): Promise<void> {
    const payload: PushNotificationPayload = {
      title: 'Test title',
      options: {
        body: 'Test body',
        requireInteraction: true,
        actions: [
          {
            action: 'test-action',
            title: 'Test action',
          },
        ],
      },
    };

    await this.send(user, payload);
  }

  private async getUserSubscriptions(userId: string): Promise<WebPushSubscription[]> {
    return this.prisma.webPushSubscription.findMany({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}
