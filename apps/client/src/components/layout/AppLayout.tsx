import React from 'react';
import { Navigation } from '@/client/components/layout/controls/Navigation';
import { ServerInfo } from '@/client/components/layout/controls/ServerInfo';
import { AccountMenu } from '@/client/components/layout/controls/AccountMenu';
import { QrLinkPopover } from '@/client/components/layout/controls/QrLinkPopover';
import { ThemeSwitch } from '@/client/components/layout/controls/ThemeSwitch';
import { Socials } from '@/client/components/layout/controls/Socials';

interface AppLayoutProps {
  hideControls: boolean | undefined;
  children: React.ReactNode;
}

export const AppLayout = ({ hideControls, children }: AppLayoutProps) => (
  <div className="bg-content1 max-h-screen overflow-hidden">
    <Socials />
    <AccountMenu />
    {children}
    {!hideControls && (
      <div className="pb-safe-offset-4 px-safe-offset-5 bg-content2 h-26 fixed bottom-0 z-50 grid w-full grid-cols-3 items-center pt-4 lg:bg-transparent">
        <div className="flex h-16 flex-col items-start justify-center sm:h-auto">
          <QrLinkPopover />
          <ThemeSwitch />
        </div>
        <div className="col-start-2">
          <Navigation />
        </div>
        <ServerInfo />
      </div>
    )}
  </div>
);
