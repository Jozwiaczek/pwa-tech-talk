import { z } from 'zod';

export const slideSeoSchema = z.object({
  title: z.string().min(30).max(60).optional(),
  description: z.string().min(55).max(160).optional(),
  keywords: z.array(z.string()).max(4).readonly().optional(),
});

export type SlideSeo = z.infer<typeof slideSeoSchema>;

interface SlideSchema {
  path: `/${string}`;
  name: string;
  serverRequired?: true;
  seo: SlideSeo;
}

export const SLIDES = [
  {
    path: '/',
    name: 'Intro',
    seo: {
      title: 'Introduction to Progressive Web Apps', // chars: 36
      description: 'Learn about the benefits of Progressive Web Apps and how to build them.', // chars: 71
      keywords: ['progressive web app', 'tech talk', 'pwa'], // keywords: 3
    },
  },
  {
    path: '/table-of-contents',
    name: 'Table of contents',
    seo: {
      title: 'Table of contents for Progressive Web Apps Tech Talk', // chars: 52
      description:
        'A list of all the slides about progressive web apps. Features, implementation and live examples.', // chars: 96
      keywords: ['pwa features', 'pwa overview'], // keywords: 2
    },
  },
  {
    path: '/comparison',
    name: 'Comparison',
    seo: {
      title: 'PWA vs Native App Comparison Table', // chars: 34
      description: 'A comparison table between progressive web apps and native apps.', // chars: 64
      keywords: ['pwa comparison', 'pwa vs native', 'pwa advantages', 'pwa disadvantages'], // keywords: 4
    },
  },
  {
    path: '/manifest',
    name: 'Manifest file',
    seo: {
      title: 'Progressive Web App Manifest File', // chars: 33
      description: 'Learn how to create a web app manifest file to make your app installable.', // chars: 73
      keywords: ['web app manifest', 'manifest.json'], // keywords: 2
    },
  },
  {
    path: '/offline-mode',
    name: 'Offline mode',
    seo: {
      title: 'Offline Mode in Progressive Web Apps', // chars: 36
      description: 'Learn and experience how offline mode works in progressive web apps.', // chars: 68
      keywords: ['offline first', 'pwa offline', 'network state api'], // keywords: 3
    },
  },
  {
    path: '/geolocation',
    name: 'Geolocation',
    seo: {
      title: 'Web Geolocation API in Progressive Web Apps', // chars 43
      description: 'Learn and experience how geolocation works in progressive web apps.', // chars: 67
      keywords: ['web geolocation', 'geolocation api', 'web api'], // keywords: 3
    },
  },
  {
    path: '/speech-recognition',
    name: 'Speech recognition',
    seo: {
      title: 'Web Speech Recognition API in Progressive Web Apps', // chars: 50
      description: 'Learn and experience how speech recognition works in progressive web apps.', // chars: 74
      keywords: ['web speech recognition', 'speech recognition', 'web api'], // keywords: 3
    },
  },
  {
    path: '/speech-synthesis',
    name: 'Speech synthesis',
    seo: {
      title: 'Web Speech Synthesis API in Progressive Web Apps', // chars: 48
      description: 'Learn and experience how speech synthesis works in progressive web apps.', // chars: 72
      keywords: ['web speech synthesis', 'speech api'], // keywords: 2
    },
  },
  {
    path: '/bluetooth',
    name: 'Bluetooth',
    seo: {
      title: 'Web Bluetooth API in Progressive Web Apps', // chars: 41
      description: 'Learn and experience how Bluetooth works in progressive web apps.', // chars: 65
      keywords: ['web bluetooth', 'bluetooth api', 'web api'], // keywords: 3
    },
  },
  {
    path: '/gamepads',
    name: 'Gamepads',
    seo: {
      title: 'Web Gamepad API in Progressive Web Apps', // chars: 39
      description: 'Learn and experience how gamepads work in progressive web apps.', // chars: 63
      keywords: ['web gamepad', 'gamepad api', 'web api'], // keywords: 3
    },
  },
  {
    path: '/device-events',
    name: 'Device events',
    seo: {
      title: 'Device Events in Progressive Web Apps', // chars: 37
      description:
        'Learn and experience how orientation and motion events work in progressive web apps.', // chars: 84
      keywords: ['device events', 'device orientation', 'device motion', 'web api'], // keywords count: 4
    },
  },
  {
    path: '/payment-request',
    name: 'Payment request',
    seo: {
      title: 'Web Payment Request API in Progressive Web Apps', // chars: 47
      description: 'Learn and experience how payment request works in progressive web apps.', // chars: 71
      keywords: ['web payment request', 'payment request api', 'web api'], // keywords: 3
    },
  },
  {
    path: '/notifications',
    name: 'Notifications',
    serverRequired: true,
    seo: {
      title: 'Web Notifications in Progressive Web Apps', // chars: 41
      description: 'Learn and experience how notifications work in progressive web apps.', // chars: 68
      keywords: ['web notifications', 'push notifications', 'web push', 'web api'], // keywords: 3
    },
  },
  {
    path: '/passkeys',
    name: 'Passkeys',
    serverRequired: true,
    seo: {
      title: 'WebAuthn Passkeys in Progressive Web Apps', // chars: 41
      description: 'Learn and experience how passkeys work in progressive web apps.', // chars: 63
      keywords: ['passkeys', 'webauthn', 'biometric authentication', 'web api'], // keywords: 3
    },
  },
  {
    path: '/web-share',
    name: 'Web share',
    seo: {
      title: 'Web Share API in Progressive Web Apps', // chars: 37
      description: 'Learn and experience how web share works in progressive web apps.', // chars: 65
      keywords: ['web share', 'share api', 'web api'], // keywords: 3
    },
  },
  {
    path: '/screen-wake-lock',
    name: 'Screen wake lock',
    seo: {
      title: 'Screen Wake Lock API in Progressive Web Apps', // chars: 44
      description: 'Learn and experience how screen wake lock works in progressive web apps.', // chars: 72
      keywords: ['screen wake lock', 'wake lock api', 'web api'], // keywords: 3
    },
  },
  {
    path: '/battery-manager',
    name: 'Battery manager',
    seo: {
      title: 'Battery Manager API in Progressive Web Apps', // chars: 43
      description: 'Learn and experience how battery manager works in progressive web apps.', // chars: 71
      keywords: ['battery manager', 'battery status api', 'web api'], // keywords: 3
    },
  },
  {
    path: '/example-apps',
    name: 'Example apps',
    seo: {
      title: 'Best Examples of Progressive Web Apps', // chars: 37
      description:
        'A list of the best, and most popular progressive web apps with author example projects.', // chars: 87
      keywords: ['pwa examples', 'best pwa', 'examples of pwa'], // keywords: 3
    },
  },
  {
    path: '/tips-tricks',
    name: 'Tips & Tricks',
    seo: {
      title: 'Tips and Tricks for Progressive Web Apps', // chars: 40
      description: 'A list of tips, tricks, tools and libraries for building progressive web apps.', // chars: 78
      keywords: ['pwa tips', 'pwa tricks', 'pwa tools', 'pwa libraries'], // keywords: 4
    },
  },
  {
    path: '/finale',
    name: 'Finale',
    seo: {
      title: 'Finale of Progressive Web Apps Tech Talk', // chars: 40
    },
  },
] as const satisfies ReadonlyArray<SlideSchema>;

export type Slide = (typeof SLIDES)[number];
export type SlidePath = Slide['path'];
export type SlideName = Slide['name'];

export const SLIDE_PATHS = SLIDES.reduce<Record<SlideName, SlidePath>>(
  (acc, slide) => ({ ...acc, [slide.name]: slide.path }),
  {} as Record<SlideName, SlidePath>,
);
