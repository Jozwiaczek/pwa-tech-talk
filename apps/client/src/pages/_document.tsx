import 'regenerator-runtime/runtime'; // Solves "regeneratorRuntime is not defined" error - https://github.com/nrwl/nx/issues/5063
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
