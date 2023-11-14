import { QrLiveLink } from '@/client/components/layout/controls/QrLiveLink';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { Button } from '@/client/components/Button';
import { QrCodeIcon } from '@heroicons/react/24/outline';

export const QrLinkPopover = () => (
  <div className="hidden sm:inline-block">
    <Popover showArrow placement="bottom-start" offset={20}>
      <PopoverTrigger>
        <Button isIconOnly variant="light">
          <QrCodeIcon className="size-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-10">
        <QrLiveLink />
      </PopoverContent>
    </Popover>
  </div>
);
