interface SocialsHeadProps {
  siteUrl: string;
  appTitle: string;
  pageTitle: string | undefined;
  pageDescription: string;
}

export const SocialsHead = ({
  siteUrl,
  appTitle,
  pageTitle,
  pageDescription,
}: SocialsHeadProps) => (
  <>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={siteUrl} />
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={pageDescription} />
    <meta name="twitter:creator" content="@jozwiaczek" />
    <meta name="twitter:creator:id" content="395940297" />
    <meta name="twitter:image" content={`${siteUrl}/icons/social-card.jpg`} />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:site_name" content={appTitle} />
    <meta property="og:url" content={siteUrl} />
    <meta property="og:image" content={`${siteUrl}/icons/social-card.jpg`} />
  </>
);
