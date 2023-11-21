import { useEffect, useMemo, useState } from 'react';
import { checkIsWebPushSupported } from '@/client/utils/checkPwaFeatures';
import {
  base64ToUint8Array,
  getSubscriptionToSend,
  isSubscriptionExpired,
  isWebPushGranted,
} from '@/client/hooks/useWebPush/useWebPush.utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { config } from '@/client/config';
import { axios } from '@/client/lib/axios';
import { useLocalStorage } from 'react-use';
import { v4 as uuid } from 'uuid';
import { PushDebugSendDto } from '@/libs/shared/dto/web-push/push-debug-send.dto';
import { PushNotificationPayload } from '@/libs/shared/types/web-push';
import { LOCAL_STORAGE_KEYS } from '@/client/constants/local-storage-keys';

export const useWebPush = () => {
  const queryClient = useQueryClient();
  const [subscriptionInternal, setSubscriptionInternal] = useState<PushSubscription | null>(null);
  const [registrationInternal, setRegistrationInternal] =
    useState<ServiceWorkerRegistration | null>(null);
  const [clientId, setClientId] = useLocalStorage<string>(
    LOCAL_STORAGE_KEYS.WEB_PUSH_CLIENT_ID,
    uuid(),
  );

  const isWebPushSupported = useMemo(() => checkIsWebPushSupported(), []);

  useEffect(() => {
    const runEffect = async () => {
      if (isWebPushSupported) {
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.getSubscription();

        if (sub && !isSubscriptionExpired(sub)) {
          setSubscriptionInternal(sub);
        }
        setRegistrationInternal(reg);
      }
    };

    void runEffect();
  }, [isWebPushSupported]);

  return {
    isWebPushSupported,
    isSubscribed: useQuery({
      queryKey: ['is-subscribed', clientId],
      queryFn: async () => {
        if (!isWebPushSupported) {
          return false;
        }

        const { data: isSubscribed } = await axios.post<boolean>('/web-push/is-subscribed', {
          clientId,
        });
        return isSubscribed;
      },
    }).data,
    subscribeMutation: useMutation({
      mutationFn: async () => {
        const isGranted = await isWebPushGranted();
        if (!isGranted) {
          toast.error('Grant notifications permission in your browser settings');
          return;
        }

        const subscription = await registrationInternal?.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: base64ToUint8Array(config.WEB_PUSH_PUBLIC_KEY),
        });

        if (!subscription) {
          toast.error('Something went wrong');
          return;
        }

        await axios.post('/web-push/subscribe', {
          ...getSubscriptionToSend(subscription),
          clientId,
        });
        setSubscriptionInternal(subscription);
        queryClient.setQueryData(['is-subscribed', clientId], () => true);

        toast.success('You have successfully subscribed to notifications');
      },
      onError: () => {
        setClientId(uuid());
      },
    }),
    unsubscribeMutation: useMutation({
      mutationFn: async () => {
        if (!subscriptionInternal) {
          toast.error('Something went wrong');
          return;
        }

        await axios.post('/web-push/unsubscribe', {
          ...getSubscriptionToSend(subscriptionInternal),
          clientId,
        });
        await subscriptionInternal.unsubscribe();
        setSubscriptionInternal(null);
        queryClient.setQueryData(['is-subscribed', clientId], () => false);

        toast.success('You have successfully unsubscribed from notifications');
      },
    }),
    debugSendMutation: useMutation({
      mutationFn: async ({ title, options }: PushNotificationPayload) => {
        if (!subscriptionInternal) {
          toast.error('Something went wrong');
          return;
        }

        await axios.post('/web-push/debug-send', {
          clientId,
          title,
          ...options,
        } as PushDebugSendDto);
      },
    }),
  };
};
