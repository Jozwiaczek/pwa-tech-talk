import React from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { useWebPush } from '@/client/hooks/useWebPush/useWebPush';
import { Button } from '@nextui-org/react';
import { useCurrentUser } from '@/client/hooks/useCurrentUser';
import { useNavigation } from '@/client/hooks/useNavigation';
import { ForwardIcon, KeyIcon } from '@heroicons/react/24/outline';
import { SLIDE_PATHS } from '@/client/constants/slides';

const NotificationsPage = (props: unknown, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { currentUser } = useCurrentUser();
  const { nextSlide, goToSlide } = useNavigation();
  const {
    isSubscribed,
    isWebPushSupported,
    subscribeMutation,
    unsubscribeMutation,
    debugSendMutation,
  } = useWebPush();

  if (!isWebPushSupported) {
    return (
      <SlideContainer ref={ref}>
        <h1 className="text-5xl font-bold">Notifications</h1>
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

  if (!currentUser) {
    return (
      <SlideContainer ref={ref}>
        <h1 className="text-5xl font-bold">Notifications</h1>
        <p className="text-xl font-semibold">
          You need to be logged in to subscribe to notifications
        </p>

        <Button
          size="lg"
          onClick={() => goToSlide(SLIDE_PATHS.Passkeys)}
          color="primary"
          className="w-64"
          endContent={<KeyIcon className="size-5" />}
        >
          Back to passkeys
        </Button>
        <Button
          size="lg"
          onClick={nextSlide}
          color="warning"
          className="w-64"
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

  const debugSendHandler = async () => {
    debugSendMutation.mutate();
  };

  return (
    <SlideContainer ref={ref}>
      <h1 className="text-5xl font-bold">Notifications</h1>
      <div className="flex w-full flex-col gap-4 md:max-w-lg">
        {isSubscribed ? (
          <>
            <Button
              size="lg"
              color="warning"
              isLoading={unsubscribeMutation.isLoading || debugSendMutation.isLoading}
              onPress={debugSendHandler}
            >
              Send Test Notification
            </Button>
            <Button
              size="lg"
              color="danger"
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

NotificationsPage.apiRequired = true;

export default NotificationsPage;
