import { useEffect, useMemo, useState } from 'react';
import { checkIsWebPushSupported } from '@/client/utils/checkPwaFeatures';
import {
  base64ToUint8Array,
  getSubscriptionToSend,
  isSubscriptionExpired,
  isWebPushGranted,
} from '@/client/hooks/useWebPush/useWebPush.utils';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { config } from '@/client/config';
import { axios } from '@/client/lib/axios';

export const useWebPush = () => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [subscriptionInternal, setSubscriptionInternal] = useState<PushSubscription | null>(null);
  const [registrationInternal, setRegistrationInternal] =
    useState<ServiceWorkerRegistration | null>(null);

  const isWebPushSupported = useMemo(() => checkIsWebPushSupported(), []);

  useEffect(() => {
    const runEffect = async () => {
      if (isWebPushSupported) {
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.getSubscription();

        if (sub && !isSubscriptionExpired(sub)) {
          setSubscriptionInternal(sub);
          setIsSubscribed(true);
        }
        setRegistrationInternal(reg);
      }
    };

    void runEffect();
  }, [isWebPushSupported]);

  return {
    isWebPushSupported,
    isSubscribed,
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

        await axios.post('/web-push/subscribe', getSubscriptionToSend(subscription));
        setSubscriptionInternal(subscription);
        setIsSubscribed(true);

        toast.success('You have successfully subscribed to notifications');
      },
    }),
    unsubscribeMutation: useMutation({
      mutationFn: async () => {
        if (!subscriptionInternal) {
          toast.error('Something went wrong');
          return;
        }

        await axios.post('/web-push/unsubscribe', getSubscriptionToSend(subscriptionInternal));
        await subscriptionInternal.unsubscribe();
        setSubscriptionInternal(null);
        setIsSubscribed(false);

        toast.success('You have successfully unsubscribed from notifications');
      },
    }),
    debugSendMutation: useMutation({
      mutationFn: async () => {
        if (!subscriptionInternal) {
          toast.error('Something went wrong');
          return;
        }

        await axios.post('/web-push/debug-send', getSubscriptionToSend(subscriptionInternal));
      },
    }),
  };
};
