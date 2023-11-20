import { GitHubLogo, LinkedInLogo } from '@/client/assets/socials';
import { Button, Link } from '@nextui-org/react';

export const Socials = () => (
  <div className="pt-safe-offset-2 pl-safe-offset-4 fixed top-0 left-0 z-50">
    <div className="flex items-center gap-1 sm:flex-col">
      <Button isIconOnly variant="light" as={Link} isExternal href="https://github.com/Jozwiaczek">
        <GitHubLogo className="size-6" />
      </Button>
      <Button
        isIconOnly
        variant="light"
        as={Link}
        isExternal
        href="https://www.linkedin.com/in/jozwiakjakub/"
      >
        <LinkedInLogo className="size-6" />
      </Button>
    </div>
  </div>
);
