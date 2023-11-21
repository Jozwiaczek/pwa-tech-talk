import { GitHubLogo, LinkedInLogo } from '@/client/assets/socials';
import { Button, Link } from '@nextui-org/react';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import GitHubButton from 'react-github-btn';
import { useTheme } from 'next-themes';

export const Socials = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="pt-safe-offset-2 pl-safe-offset-4 fixed top-0 left-0 z-50">
      <div className="flex items-start gap-1 sm:flex-col">
        <GitHubButton
          href="https://github.com/Jozwiaczek/pwa-tech-talk"
          data-color-scheme={resolvedTheme}
          data-size="large"
          data-show-count="true"
          aria-label="Star Jozwiaczek/pwa-tech-talk on GitHub"
        >
          Star
        </GitHubButton>
        <Button
          isIconOnly
          variant="light"
          as={Link}
          isExternal
          aria-label="Check out Jakub Jóźwiak GitHub profile"
          href="https://github.com/Jozwiaczek"
        >
          <GitHubLogo className="size-6" />
        </Button>
        <Button
          isIconOnly
          variant="light"
          as={Link}
          isExternal
          aria-label="Check out PWA Tech Talk code repository"
          href="https://github.com/Jozwiaczek/pwa-tech-talk"
        >
          <CodeBracketIcon className="size-8" />
        </Button>
        <Button
          isIconOnly
          variant="light"
          as={Link}
          isExternal
          aria-label="Check out Jakub Jóźwiak LinkedIn profile"
          href="https://www.linkedin.com/in/jozwiakjakub/"
        >
          <LinkedInLogo className="size-6" />
        </Button>
      </div>
    </div>
  );
};
