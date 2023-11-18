const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { nextui } = require('@nextui-org/react');
const plugin = require('tailwindcss/plugin');

// https://uicolors.app/create
const colors = {
  primary: {
    DEFAULT: '#5A0FC8',
    foreground: '#ECEDEE',
    50: '#f9f6fd',
    100: '#e5daf8',
    200: '#d3bef4',
    300: '#b795ec',
    400: '#a379e7',
    500: '#8952e0',
    600: '#7434db',
    700: '#6023c0',
    800: '#4f1d9e',
    900: '#3b1676',
  },
  secondary: {
    DEFAULT: '#cd70dc',
    foreground: '#ECEDEE',
    50: '#fdf5ff',
    100: '#f8d5fe',
    200: '#f2aefd',
    300: '#e57df6',
    400: '#cd70dc',
    500: '#ad5eba',
    600: '#92509d',
    700: '#75407e',
    800: '#63366a',
    900: '#47274d',
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),

    // NextUI theme
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    require('tailwindcss-debug-screens'),
    require('tailwindcss-safe-area'),
    nextui({
      themes: {
        light: {
          colors,
        },
        dark: {
          colors,
        },
      },
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          size: (value) => ({
            width: value,
            height: value,
          }),
        },
        {
          values: theme('spacing'),
        },
      );
    }),
  ],
};
