import React from 'react';
import { Navigation } from '@/client/components/Navigation';
import { ServerInfo } from '@/client/components/ServerInfo';
import { AccountMenu } from '@/client/components/AccountMenu';

interface AppLayoutProps {
  hideControls: boolean | undefined;
  children: React.ReactNode;
}

export const AppLayout = ({ hideControls, children }: AppLayoutProps) => (
  <div className="max-h-screen overflow-hidden">
    <AccountMenu />
    {children}
    {!hideControls && (
      <>
        <Navigation />
        <ServerInfo />
      </>
    )}
  </div>
);
