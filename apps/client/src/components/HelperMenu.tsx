import { QrLiveLink } from '@/client/components/QrLiveLink';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { Button } from '@/client/components/Button';
import { QrCodeIcon } from '@heroicons/react/24/outline';

export const HelperMenu = () => {
  return (
    <div className="fixed top-4 left-4 z-50 hidden sm:inline-block">
      <Popover showArrow placement="bottom-start" offset={20}>
        <PopoverTrigger>
          <Button isIconOnly variant="light">
            <QrCodeIcon className="size-9" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-10">
          <QrLiveLink />
        </PopoverContent>
      </Popover>
    </div>
  );
};
