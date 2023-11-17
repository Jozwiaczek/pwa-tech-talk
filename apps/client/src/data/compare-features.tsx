export const AppSupportType = {
  Full: 'Full',
  Partial: 'Partial',
  None: 'None',
} as const;

export type AppSupportType = (typeof AppSupportType)[keyof typeof AppSupportType];

export const UPDATED_AT = '2023-11-06T06:26:56.253Z';

export const COMPARE_FEATURES = [
  {
    "index": 1,
    "title": "Desktop Installation",
    "description": "You can install a PWA on macOS, Windows and Chrome OS. You'll need to create one separate app for each operating system.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 2,
    "title": "Mobile Installation",
    "description": "You can install a PWA on iOS and Android. You'll need to create one separate app for each operating system.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 3,
    "title": "Universal Installation",
    "description": "PWA is the only format that allows one single app to be installed on iOS, Android, macOS, Windows and Chrome OS.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "None"
  },
  {
    "index": 4,
    "title": "Push Notifications",
    "description": "You can send push notifications to iOS and Android users from native apps and PWAs (with <a href=\"https://intercom.help/progressier/en/articles/7120026-what-are-the-requirements-for-sending-web-push-notifications-on-ios\" target=\"_blank\">iOS 16.4 or higher</a>).",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 5,
    "title": "Offline Capabilities",
    "description": "Both PWA and Native Apps can function offline, but the methods for storage and access may vary. PWAs often utilize Service Workers and the Cache API, which are typically more complex than their native app counterparts.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 6,
    "title": "Performance",
    "description": "Native Apps usually offer better performance since they are optimized for their specific platform. PWAs can be efficient but might face performance issues on certain devices or browsers.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 7,
    "title": "Instant Updates",
    "description": "PWAs can be updated on-the-fly by refreshing the app in the browser. Native Apps require updates through app stores, which might take time to be approved and then downloaded by users.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Partial"
  },
  {
    "index": 8,
    "title": "Integration with App Stores",
    "description": "PWAs aren't typically found on app stores but can be added with wrappers. Native Apps are primarily distributed through app stores.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 9,
    "title": "Freedom of Monetization",
    "description": "PWAs are not tied to app store payment systems and can offer a wider range of payment options. Native Apps, especially on platforms like iOS, might require the use of the app store's payment system, which can take a significant cut of the revenue.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "None"
  },
  {
    "index": 10,
    "title": "SEO",
    "description": "PWAs, being web-based, can be indexed by search engines and can be optimized for search. Native Apps are not directly indexable, but their app store listings can be optimized.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Partial"
  },
  {
    "index": 11,
    "title": "Easy Maintenance",
    "description": "PWAs require maintenance for web standards and browsers. Native Apps require maintenance for each platform and updates for new OS versions.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Partial"
  },
  {
    "index": 12,
    "title": "Affordable Development Cost",
    "description": "Developing a PWA can be more cost-effective since you target multiple platforms with a single codebase. Native Apps might require separate development for iOS and Android, which can be more expensive.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Partial"
  },
  {
    "index": 13,
    "title": "Quick Development Time",
    "description": "PWAs can often be developed more quickly due to the single codebase. Native Apps might require more time, especially if targeting multiple platforms.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Partial"
  },
  {
    "index": 14,
    "title": "Discoverability",
    "description": "PWAs benefit from regular web search and SEO practices. Native Apps rely on app store search and discovery mechanisms.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 15,
    "title": "Geolocation",
    "description": "Both native apps and PWAs allow you to <a href=\"https://progressier.com/pwa-capabilities/geolocation\">access the user's location</a>.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 16,
    "title": "Audio Recording",
    "description": "You can <a href=\"https://progressier.com/pwa-capabilities/audio-recording\">record audio from a PWA</a> and a native app. Note that in PWAs, audio recording tends to be interrupted when the screen dims. Native apps are properly a better choice for recordings longer than a few minutes.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 17,
    "title": "Video Recording",
    "description": "You can <a href=\"https://progressier.com/pwa-capabilities/video-recording\">record video from a PWA</a> and a native app. Note that in PWAs, video recording tends to be interrupted when the screen dims. Native apps are properly a better choice for recordings longer than a few minutes.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 18,
    "title": "Virtual Reality",
    "description": "Both PWAs and native apps support VR content and can interface with VR hardware.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 19,
    "title": "Connect Gamepads",
    "description": "With the <a href=\"https://developer.mozilla.org/docs/Web/API/Gamepad_API/Using_the_Gamepad_API\" target=\"_blank\">Gamepad API</a>, a PWA can connect to and interact with external game controllers. Native apps also have access to external gamepads.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 20,
    "title": "Biometric Authentication",
    "description": "Native apps and PWAs both support authentication methods like fingerprint, facial recognition, etc. Check out our <a href=\"https://progressier.com/pwa-capabilities/biometric-authentication-with-passkeys/\">PWA Passkey Demo</a>.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 21,
    "title": "Speech Synthesis",
    "description": "Most mobile apps can use native methods to produce spoken language from text, e.g. with the <a href=\"https://progressier.com/pwa-capabilities/text-to-speech-synthesis\">SpeechSynthesis API</a>.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 22,
    "title": "Voice Recognition",
    "description": "This feature allows apps to effortlessly recognize and process human voice commands — for example with the <a href=\"https://progressier.com/pwa-capabilities/speech-recognition\">SpeechRecognition API</a>.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 23,
    "title": "Share To Other Apps",
    "description": "The <a href=\"https://progressier.com/pwa-capabilities/web-share\">Web Share API</a> allows sharing of content/data to other installed apps.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 24,
    "title": "Clipboard Access",
    "description": "Native and Progressive Web Apps can access and modify the device clipboard.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 25,
    "title": "Fullscreen Content",
    "description": "Both types of apps can display content in full screen, covering the entire display area.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 26,
    "title": "App Badges",
    "description": "Both native apps and PWAs can display notification badges/counts over the app icon.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 27,
    "title": "Shortcuts",
    "description": "Supports quick actions via app icon shortcuts. PWAs currently only support shortcuts on Android.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 28,
    "title": "Camera Controls",
    "description": "The APIs for controlling camera pan, tilt, and zoom are less mature <a href=\"https://web.dev/camera-pan-tilt-zoom/\" target=\"_blank\">on the web</a> than in native apps.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 29,
    "title": "Bluetooth",
    "description": "Apps can <a href=\"https://progressier.com/pwa-capabilities/bluetooth\">connect to Bluetooth devices</a> and write and read from them. iOS PWAs do not support Bluetooth yet.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 30,
    "title": "NFC",
    "description": "PWAs can only <a href=\"https://progressier.com/pwa-capabilities/nfc\">use NFC on Android</a>. Native apps can make use of NFC on both iOS and Android.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 31,
    "title": "USB Devices",
    "description": "Desktop PWAs can connect to devices connected by USB using the <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API\" target=\"_blank\">Web Serial API</a>. Native macOS and Windows apps have better access to serial peripherals.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 32,
    "title": "Human Interface Devices",
    "description": "The <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API\" target=\"_blank\">WebHID API</a> allows PWAs (desktop only) to connect various human interface devices such as keyboards, mice, etc.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 33,
    "title": "Ambient Light",
    "description": "Theorically, a PWA can use the <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/AmbientLightSensor\" target=\"_blank\">AmbientLightSensor API</a> to detect the surrounding light, but no mainstream browser currently supports this API.",
    "pwaSupportType": "None",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 34,
    "title": "Vibration",
    "description": "A PWA can control the device's vibration motor with the web <a href=\"https://progressier.com/pwa-capabilities/vibration-api\">Vibration API</a> but it's more limited than the API accessible to native apps.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 35,
    "title": "Augmented Reality",
    "description": "Native apps and PWAs support overlaying digital content on the real world using AR technologies. Native apps offer more options for tracking and an overall smoother experience.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 36,
    "title": "Orientation Lock",
    "description": "A PWA can lock the device's display orientation to portrait or landscape on Android. Both iOS and Android native apps can lock the device's orientation.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 37,
    "title": "Secondary Display",
    "description": "You can present content on an external display or screen with the web <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Presentation_API\" target=\"_blank\">Presentation API</a> (Android &amp; Desktop Chrome only).",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 38,
    "title": "Pointer Lock",
    "description": "Locks the pointer/mouse to the app window, useful for gaming. Check out the documentation of the <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API\">Pointer Lock API</a> for browser compatibility.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 39,
    "title": "File System",
    "description": "Both PWAs and native apps come with a variety of methods for accessing, reading, saving and modifying files on a mobile or desktop device.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 40,
    "title": "Contact Picker",
    "description": "Android PWAs can open a selection of contacts from the device's <a href=\"https://progressier.com/pwa-capabilities/contact-picker/\">contact list</a>. Not currently possible on iOS.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 41,
    "title": "Background Sync",
    "description": "Sync data in the background, even if the app isn't running.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 42,
    "title": "Periodic Background Sync",
    "description": "Allows apps to synchronize data in the background at periodic intervals, ideal for applications like news or email which require regular content updates.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 43,
    "title": "Play Media",
    "description": "PWAs can play media, but might face limitations in terms of codecs and DRM protected content. Native apps have broader support.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 44,
    "title": "Network Information",
    "description": "PWAs can access a limited set of information about the network speed. Native apps have more extensive network monitoring capabilities.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 45,
    "title": "Screen Capture",
    "description": "PWAs have limited screen capture capabilities. Native apps often offer more advanced screen recording and capture features.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 46,
    "title": "Shape Detection",
    "description": "PWAs can use the Shape Detection API for face and <a href=\"https://progressier.com/pwa-capabilities/qr-code-and-barcode-reader/\">QR code recognition</a>, but it may have limitations. Native apps can integrate more advanced recognition libraries.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 47,
    "title": "Device Memory",
    "description": "PWAs can access some device memory information for optimizing performance. Native apps can get more detailed memory stats and control.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 48,
    "title": "One-Time Passwords",
    "description": "PWAs can integrate with OTPs for authentication, but might not have as seamless an integration as native apps.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 49,
    "title": "Virtual Keyboard",
    "description": "PWAs can trigger the virtual keyboard, but don't have as much control over its behavior compared to native apps.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 50,
    "title": "Pointer Lock",
    "description": "PWAs can lock the pointer (useful for games), but face some browser restrictions. Native apps can often provide a more consistent experience.",
    "pwaSupportType": "Partial",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 51,
    "title": "Detect Device Orientation",
    "description": "Allows detecting the orientation of the device, whether landscape or portrait. In a PWA, you can use the <a href=\"https://progressier.com/pwa-capabilities/device-orientation-event\">DeviceOrientation event</a>.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 52,
    "title": "Detect Device Motion",
    "description": "Allows the app to detect device motion such as shakes or tilts. In a PWA, you can use the <a href=\"https://progressier.com/pwa-capabilities/device-motion-event\">DeviceMotion event</a>.",
    "pwaSupportType": "Full",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 53,
    "title": "Block Screenshots & Recording",
    "description": "PWAs don't have native support for blocking screenshots and video recording. Sensitive native apps (e.g. banking) can prevent screen capture or recording for security reasons.",
    "pwaSupportType": "None",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 54,
    "title": "Direct Printing",
    "description": "PWAs face limitations with direct printing without user interaction. Native apps can often directly interface with printers.",
    "pwaSupportType": "None",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 55,
    "title": "Home Screen Widgets",
    "description": "PWAs cannot create home screen widgets on most platforms. Native apps can provide widgets for quick access to app functionalities.",
    "pwaSupportType": "None",
    "nativeAppSupportType": "Full"
  },
  {
    "index": 56,
    "title": "Direct Graphics Hardware Access",
    "description": "This feature refers to the capability of an app to directly utilize the GPU of a device. Bypassing any intermediate layers (e.g. the browser) often provides a smoother user experience. ",
    "pwaSupportType": "None",
    "nativeAppSupportType": "Full"
  }
] as const;