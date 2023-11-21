interface SlideSchema {
  path: `/${string}`;
  name: string;
  serverRequired?: true;
}

export const SLIDES = [
  {
    path: '/',
    name: 'Intro',
  },
  {
    path: '/table-of-contents',
    name: 'Table of contents',
  },
  {
    path: '/comparison',
    name: 'Comparison',
  },
  {
    path: '/manifest',
    name: 'Manifest file',
  },
  {
    path: '/offline-mode',
    name: 'Offline mode',
  },
  {
    path: '/geolocation',
    name: 'Geolocation',
  },
  {
    path: '/speech-recognition',
    name: 'Speech recognition',
  },
  {
    path: '/speech-synthesis',
    name: 'Speech synthesis',
  },
  {
    path: '/bluetooth',
    name: 'Bluetooth',
  },
  {
    path: '/gamepads',
    name: 'Gamepads',
  },
  {
    path: '/device-events',
    name: 'Device events',
  },
  {
    path: '/payment-request',
    name: 'Payment request',
  },
  {
    path: '/notifications',
    name: 'Notifications',
    serverRequired: true,
  },
  {
    path: '/passkeys',
    name: 'Passkeys',
    serverRequired: true,
  },
  {
    path: '/web-share',
    name: 'Web share',
  },
  {
    path: '/screen-wake-lock',
    name: 'Screen wake lock',
  },
  {
    path: '/battery-manager',
    name: 'Battery manager',
  },
  {
    path: '/example-apps',
    name: 'Example apps',
  },
  {
    path: '/tips-tricks',
    name: 'Tips & Tricks',
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
