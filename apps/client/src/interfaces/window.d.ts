// Keep the workbox-window package in the same version as it is in next-pwa library to avoid type errors
// https://github.com/shadowwalker/next-pwa/blob/master/package.json
import { Workbox } from 'workbox-window';

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

export {};
declare global {
  interface Window {
    workbox: Workbox;
    DeviceOrientationEvent: DeviceOrientationEventiOS | undefined;
  }
}

window.workbox = window.workbox || {};
