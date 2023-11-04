interface SlideSchema {
  path: `/${string}`;
  name: string;
}

export const SLIDES = [
  {
    path: '/',
    name: 'Intro',
  },
  {
    path: '/example',
    name: 'Example',
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
  (acc, slide) => ({ ...acc, [slide.name]: slide.name }),
  {} as Record<SlideName, SlidePath>,
);
