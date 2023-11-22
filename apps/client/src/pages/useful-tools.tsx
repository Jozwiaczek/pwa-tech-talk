import React from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { Link, User } from '@nextui-org/react';
import { SlideTitle } from '@/client/components/SlideTitle';
import { ContentBox } from '@/client/components/ContentBox';

interface UsefulTool {
  title: string;
  description: string;
  iconUrl: `https://${string}`;
  url: `https://${string}`;
}

const USEFUL_TOOLS = [
  {
    title: 'Next PWA',
    description: 'Next.js plugin to add PWA capabilities',
    iconUrl: 'https://github.githubassets.com/assets/pinned-octocat-093da3e6fa40.svg',
    url: 'https://github.com/shadowwalker/next-pwa',
  },
  {
    title: 'Workbox',
    description: 'Google library for PWA',
    iconUrl:
      'https://repository-images.githubusercontent.com/55424670/fbba1680-6152-11e9-9283-c7696d438b06',
    url: 'https://developer.chrome.com/docs/workbox/',
  },
  {
    title: 'PWABuilder',
    description: 'Microsoft tool for building PWAs',
    iconUrl: 'https://www.pwabuilder.com/assets/logos/index_logo.png',
    url: 'https://www.pwabuilder.com/',
  },
  {
    title: 'Progressier',
    description: 'Independent platform for building PWAs',
    iconUrl: 'https://progressier.com/assets/img/logo/android-icon-192x192.png?v=7',
    url: 'https://progressier.com',
  },
  {
    title: 'Testing PWAs',
    description: 'Google guide for testing PWAs',
    iconUrl:
      'https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/C7YLr8zjXlEocpylBx9l.png?auto=format&w=845',
    url: 'https://developer.chrome.com/en/docs/lighthouse/pwa/',
  },
  {
    title: 'PWA Stats',
    description: 'Statistics about PWAs',
    iconUrl: 'https://www.pwastats.com/favicon-32x32.png',
    url: 'https://www.pwastats.com/',
  },
  {
    title: 'SimpleWebAuthn',
    description: 'Simple WebAuthn library for implementing FIDO2 authentication (e.g., Passkeys)',
    iconUrl: 'https://simplewebauthn.dev/img/logo_favicon.png',
    url: 'https://simplewebauthn.dev/',
  },
  {
    title: 'web-push',
    description: 'Node.js library for implementing Web Push on the server',
    iconUrl: 'https://avatars.githubusercontent.com/u/19820480?s=48&v=4',
    url: 'https://github.com/web-push-libs/web-push',
  },
] as const satisfies ReadonlyArray<UsefulTool>;

const UsefulToolsPage = (_: unknown, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <SlideContainer ref={ref}>
      <ContentBox>
        <SlideTitle>Useful PWA Tools</SlideTitle>
        <div className="flex flex-col items-start gap-5 text-left">
          {USEFUL_TOOLS.map((link) => (
            <Link
              key={link.title}
              href={link.url}
              isExternal
              showAnchorIcon
              className="text-default-foreground"
            >
              <User
                name={link.title}
                description={link.description}
                avatarProps={{
                  src: link.iconUrl,
                  imgProps: {
                    style: {
                      objectFit: 'scale-down',
                    },
                  },
                }}
              />
            </Link>
          ))}
        </div>
      </ContentBox>
    </SlideContainer>
  );
};

export default UsefulToolsPage;
