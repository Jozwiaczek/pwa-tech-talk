import React from 'react';

export const AppSupportType = {
  Full: 'Full',
  Partial: 'Partial',
  None: 'None',
} as const;

export type AppSupportType = (typeof AppSupportType)[keyof typeof AppSupportType];

interface AppFeature {
  title: string;
  description: React.ReactNode;
  pwaSupport: AppSupportType;
  nativeAppSupport: AppSupportType;
}

export const COMPARE_FEATURES: AppFeature[] = [
  {
    title: 'Desktop Installation',
    description:
      "You can install a PWA on macOS, Windows and Chrome OS. You'll need to create one separate app for each operating system.",
    pwaSupport: AppSupportType.Full,
    nativeAppSupport: AppSupportType.Full,
  },
  {
    title: 'Mobile Installation',
    description:
      "You can install a PWA on macOS, Windows and Chrome OS. You'll need to create one separate app for each operating system.",
    pwaSupport: AppSupportType.Full,
    nativeAppSupport: AppSupportType.Full,
  },
  {
    title: 'Universal Installation',
    description:
      'PWA is the only format that allows one single app to be installed on iOS, Android, macOS, Windows and Chrome OS.',
    pwaSupport: AppSupportType.Full,
    nativeAppSupport: AppSupportType.None,
  },
  {
    title: 'Push Notifications',
    description: (
      <>
        You can send push notifications to iOS and Android users from native apps and PWAs (with
        <a
          href="https://intercom.help/progressier/en/articles/7120026-what-are-the-requirements-for-sending-web-push-notifications-on-ios"
          target="_blank"
        >
          iOS 16.4 or higher
        </a>
        ).
      </>
    ),
    pwaSupport: AppSupportType.Full,
    nativeAppSupport: AppSupportType.Full,
  },
  {
    title: 'Offline Capabilities',
    description:
      'Both PWA and Native Apps can function offline, but the methods for storage and access may vary. PWAs often utilize Service Workers and the Cache API, which are typically more complex than their native app counterparts.',
    pwaSupport: AppSupportType.Partial,
    nativeAppSupport: AppSupportType.Full,
  },
  {
    title: 'Performance',
    description:
      'Native Apps usually offer better performance since they are optimized for their specificplatform. PWAs can be efficient but might face performance issues on certain devices orbrowsers.',
    pwaSupport: AppSupportType.Partial,
    nativeAppSupport: AppSupportType.Full,
  },
];
