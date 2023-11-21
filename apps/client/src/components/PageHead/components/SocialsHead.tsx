import { config } from '@/client/config';
import { useNavigation } from '@/client/hooks/useNavigation';

interface SocialsHeadProps {
  title: string;
  description: string;
}

export const SocialsHead = ({ title, description }: SocialsHeadProps) => {
  const { currentSlideName } = useNavigation();
  const socialCardUrl = `${config.SITE_URL}/icons/social-card.png`;

  return (
    <>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={config.SITE_URL} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@jozwiaczek" />
      <meta name="twitter:creator:id" content="395940297" />
      <meta name="twitter:image" content={socialCardUrl} />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={currentSlideName} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:url" content={config.SITE_URL} />
      <meta property="og:image" content={socialCardUrl} />
    </>
  );
};
