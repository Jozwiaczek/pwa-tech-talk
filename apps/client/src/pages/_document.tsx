import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

React.useLayoutEffect = React.useEffect;

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
