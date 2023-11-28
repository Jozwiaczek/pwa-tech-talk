import { Button } from '@/client/components/Button';
import { BmcFullLogo } from '@/client/assets/logos';
import { Link } from '@nextui-org/react';

export const BuyMeCoffeeButton = () => (
  <Button
    as={Link}
    size="lg"
    variant="solid"
    isIconOnly
    className="w-64 bg-yellow-400 font-semibold text-zinc-900"
    href="https://www.buymeacoffee.com/jozwiaczek"
    // @ts-ignore props are passed to the Link component
    isExternal
  >
    <BmcFullLogo className="h-8" />
  </Button>
);
