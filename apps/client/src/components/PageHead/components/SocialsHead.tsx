interface SocialsHeadProps {
  title: string;
  description: string;
}

export const SocialsHead = ({ title, description }: SocialsHeadProps) => (
  <>
    <meta name="twitter:card" content="summary" />
    {/*<meta name="twitter:url" content="https://yourdomain.com" />*/}
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {/*<meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />*/}
    <meta name="twitter:creator" content="@jozwiaczek" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content={title} />
    {/*<meta property="og:url" content="https://yourdomain.com" />*/}
    {/*<meta property="og:image" content="https://yourdomain.com/icons/apple-touch-icon.png" />*/}
  </>
);
