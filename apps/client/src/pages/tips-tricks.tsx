import React from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { Link } from '@nextui-org/react';
import { SlideTitle } from '@/client/components/SlideTitle';

const LINKS = [
  'https://github.com/shadowwalker/next-pwa',
  'https://github.com/GoogleChrome/workbox',
  'https://web.dev/articles/pwas-on-oculus-2',
  'https://progressier.com/pwa-manifest-generator/',
];

const TipsTricks = (_: unknown, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <SlideContainer ref={ref}>
      <SlideTitle>Tips & Tricks</SlideTitle>
      <ul>
        {LINKS.map((link) => (
          <li key={link}>
            <Link href={link} isExternal showAnchorIcon color="secondary">
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </SlideContainer>
  );
};

export default TipsTricks;
