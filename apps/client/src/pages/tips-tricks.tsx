import React from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { Link } from '@nextui-org/react';

const LINKS = [
  'https://progressier.com/pwa-screenshots-generator',
  'https://progressier.com/pwa-manifest-generator',
  'https://github.com/shadowwalker/next-pwa',
  'https://web.dev/articles/pwas-on-oculus-2',
];

const TipsTricks = (props: unknown, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <SlideContainer ref={ref}>
      <h1 className="text-5xl font-bold">Tips & Tricks</h1>
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
