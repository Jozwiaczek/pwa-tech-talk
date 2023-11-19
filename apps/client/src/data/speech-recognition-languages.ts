// Some known supported languages (based on this Stack Overflow post):
// http://stackoverflow.com/a/14302134/338039
export const SPEECH_RECOGNITION_LANGUAGES = [
  {
    support: '+',
    name: 'Polish',
    tag: 'pl',
  },
  {
    support: '+',
    name: 'English (US)',
    tag: 'en-US',
  },
  {
    support: '+',
    name: 'English (UK)',
    tag: 'en-GB',
  },
  {
    support: '.+?',
    name: 'Ukrainian',
    tag: 'uk-UA',
  },
  {
    support: '+',
    name: 'German',
    tag: 'de-DE',
  },
  {
    support: '+',
    name: 'Spanish (Spain)',
    tag: 'es-ES',
  },
  {
    support: '+',
    name: 'French',
    tag: 'fr-FR',
  },
  {
    support: '+',
    name: 'English (Australia)',
    tag: 'en-AU',
  },
  {
    support: '+?',
    name: 'English (Canada)',
    tag: 'en-CA',
  },
  {
    support: '+',
    name: 'English (India)',
    tag: 'en-IN',
  },
  {
    support: '+',
    name: 'English (New Zealand)',
    tag: 'en-NZ',
  },
  {
    support: '+',
    name: 'English (South Africa)',
    tag: 'en-ZA',
  },
  {
    support: '+',
    name: 'Afrikaans',
    tag: 'af',
  },
  {
    support: '+',
    name: 'Basque',
    tag: 'eu-ES',
  },
  {
    support: '+',
    name: 'Bulgarian',
    tag: 'bg',
  },
  {
    support: '+',
    name: 'Catalan',
    tag: 'ca',
  },
  {
    support: '+',
    name: 'Arabic (Egypt)',
    tag: 'ar-EG',
  },
  {
    support: '+?',
    name: 'Arabic (Jordan)',
    tag: 'ar-JO',
  },
  {
    support: '+',
    name: 'Arabic (Kuwait)',
    tag: 'ar-KW',
  },
  {
    support: '+?',
    name: 'Arabic (Lebanon)',
    tag: 'ar-LB',
  },
  {
    support: '+',
    name: 'Arabic (Qatar)',
    tag: 'ar-QA',
  },
  {
    support: '+',
    name: 'Arabic (UAE)',
    tag: 'ar-AE',
  },
  {
    support: '.+',
    name: 'Arabic (Morocco)',
    tag: 'ar-MA',
  },
  {
    support: '.+',
    name: 'Arabic (Iraq)',
    tag: 'ar-IQ',
  },
  {
    support: '.+',
    name: 'Arabic (Algeria)',
    tag: 'ar-DZ',
  },
  {
    support: '.+',
    name: 'Arabic (Bahrain)',
    tag: 'ar-BH',
  },
  {
    support: '.+',
    name: 'Arabic (Lybia)',
    tag: 'ar-LY',
  },
  {
    support: '.+',
    name: 'Arabic (Oman)',
    tag: 'ar-OM',
  },
  {
    support: '.+',
    name: 'Arabic (Saudi Arabia)',
    tag: 'ar-SA',
  },
  {
    support: '.+',
    name: 'Arabic (Tunisia)',
    tag: 'ar-TN',
  },
  {
    support: '.+',
    name: 'Arabic (Yemen)',
    tag: 'ar-YE',
  },
  {
    support: '+',
    name: 'Czech',
    tag: 'cs-CZ',
  },
  {
    support: '+',
    name: 'Dutch',
    tag: 'nl-NL',
  },
  {
    support: '+',
    name: 'Finnish',
    tag: 'fi',
  },
  {
    support: '+',
    name: 'Galician',
    tag: 'gl',
  },
  {
    support: '+',
    name: 'Hebrew',
    tag: 'he-IL',
  },
  {
    support: '+',
    name: 'Hungarian',
    tag: 'hu',
  },
  {
    support: '+',
    name: 'Icelandic',
    tag: 'is',
  },
  {
    support: '+',
    name: 'Italian',
    tag: 'it-IT',
  },
  {
    support: '+',
    name: 'Indonesian',
    tag: 'id',
  },
  {
    support: '+',
    name: 'Japanese',
    tag: 'ja-JP',
  },
  {
    support: '+',
    name: 'Korean',
    tag: 'ko-KR',
  },
  {
    support: '+',
    name: 'Latin',
    tag: 'la',
  },
  {
    support: '+',
    name: 'Mandarin Chinese',
    tag: 'zh-CN',
  },
  {
    support: '+',
    name: 'Traditional Taiwan',
    tag: 'zh-TW',
  },
  {
    support: '+',
    name: 'Simplified Hong Kong',
    tag: 'zh-HK',
  },
  {
    support: '+',
    name: 'Yue Chinese (Traditional Hong Kong)',
    tag: 'yue-Hant-HK',
  },
  {
    support: '+',
    name: 'Malaysian',
    tag: 'ms-MY',
  },
  {
    support: '+',
    name: 'Norwegian',
    tag: 'no-NO',
  },
  {
    support: '+?',
    name: 'Pig Latin',
    tag: 'la',
  },
  {
    support: '+',
    name: 'Portuguese',
    tag: 'pt-PT',
  },
  {
    support: '.+',
    name: 'Portuguese (brasil)',
    tag: 'pt-BR',
  },
  {
    support: '+',
    name: 'Romanian',
    tag: 'ro-RO',
  },
  {
    support: '+',
    name: 'Russian',
    tag: 'ru',
  },
  {
    support: '+',
    name: 'Serbian',
    tag: 'sr-RS',
  },
  {
    support: '+',
    name: 'Slovak',
    tag: 'sk',
  },
  {
    support: '+',
    name: 'Spanish (Argentina)',
    tag: 'es-AR',
  },
  {
    support: '+',
    name: 'Spanish (Bolivia)',
    tag: 'es-BO',
  },
  {
    support: '+?',
    name: 'Spanish (Chile)',
    tag: 'es-CL',
  },
  {
    support: '+?',
    name: 'Spanish (Colombia)',
    tag: 'es-CO',
  },
  {
    support: '+?',
    name: 'Spanish (Costa Rica)',
    tag: 'es-CR',
  },
  {
    support: '+',
    name: 'Spanish (Dominican Republic)',
    tag: 'es-DO',
  },
  {
    support: '+',
    name: 'Spanish (Ecuador)',
    tag: 'es-EC',
  },
  {
    support: '+',
    name: 'Spanish (El Salvador)',
    tag: 'es-SV',
  },
  {
    support: '+',
    name: 'Spanish (Guatemala)',
    tag: 'es-GT',
  },
  {
    support: '+',
    name: 'Spanish (Honduras)',
    tag: 'es-HN',
  },
  {
    support: '+',
    name: 'Spanish (Mexico)',
    tag: 'es-MX',
  },
  {
    support: '+',
    name: 'Spanish (Nicaragua)',
    tag: 'es-NI',
  },
  {
    support: '+',
    name: 'Spanish (Panama)',
    tag: 'es-PA',
  },
  {
    support: '+',
    name: 'Spanish (Paraguay)',
    tag: 'es-PY',
  },
  {
    support: '+',
    name: 'Spanish (Peru)',
    tag: 'es-PE',
  },
  {
    support: '+',
    name: 'Spanish (Puerto Rico)',
    tag: 'es-PR',
  },
  {
    support: '+',
    name: 'Spanish (US)',
    tag: 'es-US',
  },
  {
    support: '+',
    name: 'Spanish (Uruguay)',
    tag: 'es-UY',
  },
  {
    support: '+',
    name: 'Spanish (Venezuela)',
    tag: 'es-VE',
  },
  {
    support: '+',
    name: 'Swedish',
    tag: 'sv-SE',
  },
  {
    support: '+',
    name: 'Turkish',
    tag: 'tr',
  },
  {
    support: '+',
    name: 'Zulu',
    tag: 'zu-ZA',
  },
] as const;

export type SupportedLanguage = (typeof SPEECH_RECOGNITION_LANGUAGES)[number]['tag'];
