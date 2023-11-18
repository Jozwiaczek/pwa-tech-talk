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
    path: '/agenda',
    name: 'Agenda',
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
    path: '/screen-wake-lock',
    name: 'Screen wake lock',
  },
  {
    path: '/payment-request',
    name: 'Payment request',
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
    path: '/passkeys',
    name: 'Passkeys',
    serverRequired: true,
  },
  {
    path: '/notifications',
    name: 'Notifications',
    serverRequired: true,
  },
  {
    path: '/fun-facts',
    name: 'Fun facts',
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
