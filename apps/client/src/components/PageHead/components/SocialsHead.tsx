interface SocialsHeadProps {
  title: string;
  description: string;
  siteUrl: string;
  currentPageTitle: string | undefined;
}

export const SocialsHead = ({
  title,
  siteUrl,
  currentPageTitle,
  description,
}: SocialsHeadProps) => (
  <>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={siteUrl} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:creator" content="@jozwiaczek" />
    <meta name="twitter:creator:id" content="395940297" />
    <meta name="twitter:image" content={`${siteUrl}/icons/social-card.png`} />

    <meta property="og:type" content="article" />
    <meta property="og:title" content={currentPageTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content={title} />
    <meta property="og:url" content={siteUrl} />
    <meta property="og:image" content={`${siteUrl}/icons/social-card.png`} />
  </>
);
