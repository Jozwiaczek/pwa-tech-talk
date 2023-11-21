import React, { useState } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { useWebPush } from '@/client/hooks/useWebPush/useWebPush';
import { Button, Checkbox, Divider, Input } from '@nextui-org/react';
import { useNavigation } from '@/client/hooks/useNavigation';
import { ForwardIcon } from '@heroicons/react/24/outline';
import { SlideTitle } from '@/client/components/SlideTitle';

const NotificationsPage = (_: unknown, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { nextSlide } = useNavigation();
  const {
    isSubscribed,
    isWebPushSupported,
    subscribeMutation,
    unsubscribeMutation,
    debugSendMutation,
  } = useWebPush();
  const [requireInteraction, setRequireInteraction] = useState(true);
  const [renotify, setRenotify] = useState(false);
  const [silent, setSilent] = useState(false);

  if (!isWebPushSupported) {
    return (
      <SlideContainer ref={ref}>
        <SlideTitle>Notifications API</SlideTitle>
        <p className="text-xl font-semibold">
          Oops, looks like your browser does not support web push notifications.
        </p>
        <Button
          size="lg"
          onClick={nextSlide}
          color="warning"
          endContent={<ForwardIcon className="size-5" />}
        >
          Skip slide
        </Button>
      </SlideContainer>
    );
  }

  const subscribeHandler = async () => {
    subscribeMutation.mutate();
  };

  const unsubscribeHandler = async () => {
    unsubscribeMutation.mutate();
  };

  const debugSendHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get('title') as string;
    const body = data.get('body') as string;
    const icon = data.get('icon') as string;
    const action = data.get('action') as string;

    debugSendMutation.mutate({
      title,
      options: {
        body,
        actions: [
          {
            action: 'test-action',
            title: action || 'Test action',
          },
        ],
        icon,
        renotify,
        requireInteraction,
        silent,
        vibrate: [200, 100, 200],
      },
    });
  };

  return (
    <SlideContainer ref={ref}>
      <SlideTitle>Notifications API</SlideTitle>
      <div className="flex w-full flex-col gap-4 md:max-w-lg">
        {isSubscribed ? (
          <>
            <form onSubmit={debugSendHandler} className="flex w-full flex-col gap-6">
              <Input name="title" label="Title" isRequired defaultValue="Example title" />
              <Input name="body" label="Body" defaultValue="Example body" />
              <Input name="icon" label="Icon" defaultValue="/icons/icon512_maskable.png" />
              <Input name="action" label="Action" defaultValue="Example action 🚀" />
              <Checkbox
                name="requireInteraction"
                isSelected={requireInteraction}
                onValueChange={setRequireInteraction}
              >
                Require interaction
              </Checkbox>
              <Checkbox name="renotify" isSelected={renotify} onValueChange={setRenotify}>
                Renotify
              </Checkbox>
              <Checkbox name="silent" isSelected={silent} onValueChange={setSilent}>
                Silent
              </Checkbox>
              <Button
                type="submit"
                size="lg"
                color="warning"
                isLoading={unsubscribeMutation.isLoading || debugSendMutation.isLoading}
              >
                Send notification
              </Button>
            </form>
            <Divider />
            <Button
              size="lg"
              color="danger"
              variant="ghost"
              isLoading={unsubscribeMutation.isLoading || debugSendMutation.isLoading}
              onPress={unsubscribeHandler}
            >
              Unsubscribe
            </Button>
          </>
        ) : (
          <Button
            color="primary"
            size="lg"
            isLoading={subscribeMutation.isLoading}
            onPress={subscribeHandler}
            isDisabled={isSubscribed}
          >
            Subscribe
          </Button>
        )}
      </div>
    </SlideContainer>
  );
};

export default NotificationsPage;
