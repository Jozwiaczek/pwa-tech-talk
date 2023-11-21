import React, { forwardRef } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { checkIsWebShareSupported } from '@/client/utils/checkPwaFeatures';
import { useCurrentUrl } from '@/client/hooks/useCurrentUrl';
import { Button } from '@/client/components/Button';
import { ShareIcon } from '@heroicons/react/24/outline';
import { Input } from '@nextui-org/react';
import { SlideTitle } from '@/client/components/SlideTitle';

export function WebSharePage(_: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  const currentUrl = useCurrentUrl();
  const isSupported = checkIsWebShareSupported();

  if (!isSupported) {
    return (
      <SlideContainer ref={ref}>
        <SlideTitle>Web Share API</SlideTitle>
        <p className="max-w-2xl">
          Share text content, files and links from your PWA to other apps with the Web Share API.
        </p>
        <p className="max-w-2xl font-thin">
          Your device does not support the Web Share API. Try on an iPhone or Android phone!
        </p>
      </SlideContainer>
    );
  }

  const shareHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get('title') as string;
    const text = data.get('text') as string;
    const url = data.get('url') as string;

    try {
      await navigator.share({
        title,
        text,
        url,
        files: [],
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SlideContainer ref={ref}>
      <SlideTitle>Web Share API</SlideTitle>
      <p className="max-w-2xl">
        Share text content, files and links from your PWA to other apps with the Web Share API.
      </p>
      <form onSubmit={shareHandler} className="flex w-full flex-col gap-6 md:max-w-lg">
        <Input name="title" label="Title" defaultValue="PWAs are awesome!" />
        <Input
          name="text"
          label="Text"
          defaultValue="Check out what Progressive Web Apps can do!"
        />
        <Input
          name="url"
          label="URL"
          defaultValue={currentUrl || 'https://pwa-tech-talk.vercel.app/'}
        />
        <Button
          type="submit"
          color="primary"
          size="lg"
          endContent={<ShareIcon className="size-5" />}
        >
          Share
        </Button>
      </form>
    </SlideContainer>
  );
}

export default forwardRef(WebSharePage);
