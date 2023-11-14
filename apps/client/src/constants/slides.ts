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
    path: '/passkeys',
    name: 'Passkey',
    serverRequired: true,
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
