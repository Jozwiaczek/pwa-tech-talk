import GitHubButton from 'react-github-btn';
import React from 'react';
import { useTheme } from 'next-themes';
import { useIsMounted } from '@/client/hooks/useIsMounted';

export const GitHubStarButton = () => {
  const { resolvedTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <GitHubButton
      href="https://github.com/Jozwiaczek/pwa-tech-talk"
      data-color-scheme={resolvedTheme || 'light'}
      data-size="large"
      data-show-count="true"
      aria-label="Star Jozwiaczek/pwa-tech-talk on GitHub"
    >
      Star on GitHub
    </GitHubButton>
  );
};
