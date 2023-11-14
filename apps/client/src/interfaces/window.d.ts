// Keep the workbox-window package in the same version as it is in next-pwa library to avoid type errors
// https://github.com/shadowwalker/next-pwa/blob/master/package.json
import { Workbox } from 'workbox-window';

export {};
declare global {
  interface Window {
    workbox: Workbox;
  }
}

window.workbox = window.workbox || {};
