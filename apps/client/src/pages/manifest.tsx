import React from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import manifest from '../../public/manifest.json';
import { Link } from '@nextui-org/react';
import { ComplexCodeBlock } from '@/client/components/ComplexCodeBlock';
import { CODE_BLOCK_LANGUAGE } from '@/client/data/code-block-languages';
import { SlideTitle } from '@/client/components/SlideTitle';

const Manifest = (_: unknown, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <SlideContainer ref={ref}>
      <SlideTitle>Manifest File</SlideTitle>
      <p className="max-w-2xl">
        An app manifest (also known as &quot;manifest file&quot; or &quot;PWA manifest&quot;) is a
        structured configuration JSON file used by web apps to provide essential information about
        their attributes and characteristics, which helps browsers and platforms understand how apps
        should be handled and executed.
      </p>
      <p className="max-w-2xl">
        The app manifest is the file that tells browsers that your domain is an app — not just a
        website. Browsers will fire the installation prompt if it detects an app manifest in your
        HTML.
      </p>
      <p className="max-w-2xl">
        Add <code>{'<link rel="manifest" href="manifest.json">'}</code> in the{' '}
        <code>{'</head>'}</code> tag.
      </p>
      <p className="max-w-2xl">
        <strong className="text-secondary">name</strong>,{' '}
        <strong className="text-secondary">short_name</strong>, and{' '}
        <strong className="text-secondary">start_url</strong> properties are crucial for the basic
        functionality and appearance of your PWA.
      </p>
      <Link
        href="https://developer.mozilla.org/en-US/docs/Web/Manifest"
        color="secondary"
        isExternal
        showAnchorIcon
      >
        All available manifest parameters
      </Link>
      <div className="w-full max-w-2xl text-left">
        <ComplexCodeBlock
          filePath="public/manifest.json"
          code={JSON.stringify(manifest, null, 2)}
          language={CODE_BLOCK_LANGUAGE.json}
        />
      </div>
    </SlideContainer>
  );
};

export default Manifest;
