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
      title: 'Introduction to Progressive Web Apps',
      description:
        'A live presentation about PWA, including the most usable or interesting functionalities. Real-world use cases with popular examples, tips and tricks 🚀',
      keywords: ['progressive web app', 'tech talk', 'pwa'],
    },
  },
  {
    path: '/table-of-contents',
    name: 'Table of contents',
    seo: {
      title: 'Table of contents for Progressive Web Apps Tech Talk',
      description:
        'A list of all the slides about progressive web apps. Features, implementation and live examples.',
      keywords: ['pwa features', 'pwa overview'],
    },
  },
  {
    path: '/what-is-pwa',
    name: 'What is PWA?',
    seo: {
      title: 'What is Progressive Web App? Definition and Introduction',
      description:
        'An introduction to Progressive Web Apps (PWAs) and the three pillars that separate them from other web apps.',
      keywords: ['what is pwa', 'pwa definition', 'pwa introduction'],
    },
  },
  {
    path: '/manifest',
    name: 'Manifest file',
    seo: {
      title: 'Progressive Web App Manifest File',
      description: 'Learn how to create a web app manifest file to make your app installable.',
      keywords: ['web app manifest', 'manifest.json'],
    },
  },
  {
    path: '/offline-mode',
    name: 'Offline mode',
    seo: {
      title: 'Offline Mode in Progressive Web Apps',
      description: 'Learn and experience how offline mode works in progressive web apps.',
      keywords: ['offline first', 'pwa offline', 'network state api'],
    },
  },
  {
    path: '/comparison',
    name: 'Comparison',
    seo: {
      title: 'PWA vs Native App Comparison Table',
      description: 'A comparison table between progressive web apps and native apps.',
      keywords: ['pwa comparison', 'pwa vs native', 'pwa advantages', 'pwa disadvantages'],
    },
  },
  {
    path: '/geolocation',
    name: 'Geolocation',
    seo: {
      title: 'Web Geolocation API in Progressive Web Apps',
      description: 'Learn and experience how geolocation works in progressive web apps.',
      keywords: ['web geolocation', 'geolocation api', 'web api'],
    },
  },
  {
    path: '/speech-recognition',
    name: 'Speech recognition',
    seo: {
      title: 'Web Speech Recognition API in Progressive Web Apps',
      description: 'Learn and experience how speech recognition works in progressive web apps.',
      keywords: ['web speech recognition', 'speech recognition', 'web api'],
    },
  },
  {
    path: '/speech-synthesis',
    name: 'Speech synthesis',
    seo: {
      title: 'Web Speech Synthesis API in Progressive Web Apps',
      description: 'Learn and experience how speech synthesis works in progressive web apps.',
      keywords: ['web speech synthesis', 'speech api'],
    },
  },
  {
    path: '/bluetooth',
    name: 'Bluetooth',
    seo: {
      title: 'Web Bluetooth API in Progressive Web Apps',
      description: 'Learn and experience how Bluetooth works in progressive web apps.',
      keywords: ['web bluetooth', 'bluetooth api', 'web api'],
    },
  },
  {
    path: '/gamepads',
    name: 'Gamepads',
    seo: {
      title: 'Web Gamepad API in Progressive Web Apps',
      description: 'Learn and experience how gamepads work in progressive web apps.',
      keywords: ['web gamepad', 'gamepad api', 'web api'],
    },
  },
  {
    path: '/device-events',
    name: 'Device events',
    seo: {
      title: 'Device Events in Progressive Web Apps',
      description:
        'Learn and experience how orientation and motion events work in progressive web apps.',
      keywords: ['device events', 'device orientation', 'device motion', 'web api'],
    },
  },
  {
    path: '/payment-request',
    name: 'Payment request',
    seo: {
      title: 'Web Payment Request API in Progressive Web Apps',
      description: 'Learn and experience how payment request works in progressive web apps.',
      keywords: ['web payment request', 'payment request api', 'web api'],
    },
  },
  {
    path: '/push-notifications',
    name: 'Push notifications',
    serverRequired: true,
    seo: {
      title: 'Web Push Notifications in Progressive Web Apps',
      description: 'Learn and experience how push notifications work in progressive web apps.',
      keywords: ['web notifications', 'push notifications', 'web push', 'web api'],
    },
  },
  {
    path: '/passkeys',
    name: 'Passkeys',
    serverRequired: true,
    seo: {
      title: 'WebAuthn Passkeys in Progressive Web Apps',
      description: 'Learn and experience how passkeys work in progressive web apps.',
      keywords: ['passkeys', 'webauthn', 'biometric authentication', 'web api'],
    },
  },
  {
    path: '/web-share',
    name: 'Web share',
    seo: {
      title: 'Web Share API in Progressive Web Apps',
      description: 'Learn and experience how web share works in progressive web apps.',
      keywords: ['web share', 'share api', 'web api'],
    },
  },
  {
    path: '/screen-wake-lock',
    name: 'Screen wake lock',
    seo: {
      title: 'Screen Wake Lock API in Progressive Web Apps',
      description: 'Learn and experience how screen wake lock works in progressive web apps.',
      keywords: ['screen wake lock', 'wake lock api', 'web api'],
    },
  },
  {
    path: '/battery-manager',
    name: 'Battery manager',
    seo: {
      title: 'Battery Manager API in Progressive Web Apps',
      description: 'Learn and experience how battery manager works in progressive web apps.',
      keywords: ['battery manager', 'battery status api', 'web api'],
    },
  },
  {
    path: '/example-apps',
    name: 'Example apps',
    seo: {
      title: 'Best Examples of Progressive Web Apps',
      description:
        'A list of the best, and most popular progressive web apps with author example projects.',
      keywords: ['pwa examples', 'best pwa', 'examples of pwa'],
    },
  },
  {
    path: '/tips-tricks',
    name: 'Tips & Tricks',
    seo: {
      title: 'Tips and Tricks for Progressive Web Apps',
      description: 'A list of tips, tricks, tools and libraries for building progressive web apps.',
      keywords: ['pwa tips', 'pwa tricks', 'pwa tools', 'pwa libraries'],
    },
  },
  {
    path: '/finale',
    name: 'Finale',
    seo: {
      title: 'Finale and summary of Progressive Web Apps Tech Talk',
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
