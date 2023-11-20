const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  sourceDir: '../../dist/apps/client/.next',
  outDir: '../../dist/apps/client/public',
};
