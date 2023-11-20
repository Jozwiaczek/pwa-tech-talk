import React from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { Link } from '@nextui-org/react';

const LINKS = ['https://web.dev/articles/pwas-on-oculus-2'];

const ExampleApps = (_: unknown, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <SlideContainer ref={ref}>
      <h1 className="text-5xl font-bold">Fun Facts</h1>
      <ul>
        {LINKS.map((link) => (
          <li key={link}>
            <Link href={link} isExternal showAnchorIcon>
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </SlideContainer>
  );
};

export default ExampleApps;
