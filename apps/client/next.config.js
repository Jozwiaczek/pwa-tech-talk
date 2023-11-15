//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

// @ts-ignore no types available for next-pwa
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
  buildExcludes: [/\.svg$/, /middleware-manifest\.json$/], // Workaround for error "bad-precaching-response"
});

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  withPWA,
];

module.exports = composePlugins(...plugins)(nextConfig);
