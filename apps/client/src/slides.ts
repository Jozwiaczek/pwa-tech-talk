interface SlideSchema {
  path: `/${string}`;
  name: string;
  serverRequired?: true;
  keywords?: ReadonlyArray<string>;
}

export const SLIDES = [
  {
    path: '/',
    name: 'Intro',
    keywords: ['progressive web app', 'tech talk'],
  },
  {
    path: '/table-of-contents',
    name: 'Table of contents',
  },
  {
    path: '/comparison',
    name: 'Comparison',
    keywords: ['pwa comparison', 'pwa vs native'],
  },
  {
    path: '/manifest',
    name: 'Manifest file',
    keywords: ['manifest.json', 'web app manifest'],
  },
  {
    path: '/offline-mode',
    name: 'Offline mode',
    keywords: ['offline mode', 'offline-first', 'pwa-offline'],
  },
  {
    path: '/geolocation',
    name: 'Geolocation',
    keywords: ['web geolocation', 'geolocation api'],
  },
  {
    path: '/speech-recognition',
    name: 'Speech recognition',
    keywords: ['web speech recognition', 'speech api'],
  },
  {
    path: '/speech-synthesis',
    name: 'Speech synthesis',
    keywords: ['web speech synthesis', 'speech api'],
  },
  {
    path: '/bluetooth',
    name: 'Bluetooth',
    keywords: ['web bluetooth', 'bluetooth api'],
  },
  {
    path: '/gamepads',
    name: 'Gamepads',
    keywords: ['web gamepad', 'gamepad api'],
  },
  {
    path: '/device-events',
    name: 'Device events',
    keywords: ['device events', 'device orientation', 'device motion'],
  },
  {
    path: '/payment-request',
    name: 'Payment request',
    keywords: ['web payment request', 'payment request api'],
  },
  {
    path: '/notifications',
    name: 'Notifications',
    serverRequired: true,
    keywords: ['web notifications', 'push notifications'],
  },
  {
    path: '/passkeys',
    name: 'Passkeys',
    serverRequired: true,
    keywords: ['passkeys', 'webauthn', 'biometric authentication'],
  },
  {
    path: '/web-share',
    name: 'Web share',
    keywords: ['web share', 'web share api'],
  },
  {
    path: '/screen-wake-lock',
    name: 'Screen wake lock',
    keywords: ['screen wake lock', 'wake lock api'],
  },
  {
    path: '/battery-manager',
    name: 'Battery manager',
    keywords: ['battery manager', 'battery status api'],
  },
  {
    path: '/example-apps',
    name: 'Example apps',
    keywords: ['pwa examples', 'popular pwa'],
  },
  {
    path: '/tips-tricks',
    name: 'Tips & Tricks',
    keywords: ['pwa tips', 'pwa tricks'],
  },
  {
    path: '/feedback',
    name: 'Feedback',
  },
] as const satisfies ReadonlyArray<SlideSchema>;

export type Slide = (typeof SLIDES)[number];
export type SlidePath = Slide['path'];
export type SlideName = Slide['name'];

export const SLIDE_PATHS = SLIDES.reduce<Record<SlideName, SlidePath>>(
  (acc, slide) => ({ ...acc, [slide.name]: slide.path }),
  {} as Record<SlideName, SlidePath>,
);
