interface PopularPwaApp {
  name: string;
  url: `https://${string}`;
  icon: `https://${string}`;
}

export const POPULAR_PWA_APPS = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/home',
    icon: 'https://abs.twimg.com/favicons/twitter.3.ico',
  },
  {
    name: 'Starbucks',
    url: 'https://app.starbucks.com/',
    icon: 'https://app.starbucks.com/weblx/images/icons/pwa-icon-192.png',
  },
  {
    name: 'Uber',
    url: 'https://m.uber.com/',
    icon: 'https://d3i4yxtzktqr9n.cloudfront.net/web-plan/99c4bc580c8b57b7.ico',
  },
  {
    name: 'Pinterest',
    url: 'https://pinterest.com/',
    icon: 'https://pinterest.com/favicon.ico',
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/',
    icon: 'https://open.spotify.com/favicon.ico',
  },
  {
    name: 'BMW',
    url: 'https://www.bmw.com/',
    icon: 'https://www.bmw.com/etc.clientlibs/settings/wcm/designs/bmwcom/base/resources/ci2020/img/logo-light.svg',
  },
] as const satisfies ReadonlyArray<PopularPwaApp>;
