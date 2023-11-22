import React, { forwardRef } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { SlideTitle } from '@/client/components/SlideTitle';
import { Divider, Link } from '@nextui-org/react';
import Image from 'next/image';
import { pwaMilestonesInfographic } from '@/client/assets/infographics';
import { ContentBox } from '@/client/components/ContentBox';

export function FinalePage(_: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  return (
    <SlideContainer ref={ref}>
      <ContentBox>
        <SlideTitle>What is PWA?</SlideTitle>

        <h2 className="text-2xl font-bold sm:text-3xl">Intro</h2>
        <p>
          <Link
            className="dark:text-secondary text-primary"
            isExternal
            showAnchorIcon
            href="https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/"
          >
            Introduced by Google engineers
          </Link>{' '}
          in <strong>2015</strong>, which coined the term, PWAs to describe apps taking advantage of
          new features supported by modern browsers, including{' '}
          <strong>service workers and web app manifests</strong>, that let users upgrade web apps to
          progressive web applications in their native operating system (OS).
        </p>

        <p>
          <strong>To put it briefly</strong> - Progressive web app (PWA) is an app that&apos;s built
          using web platform technologies, but that provides a user experience like that of a
          platform-specific app.
        </p>

        <Image src={pwaMilestonesInfographic} alt="PWA development over the years" />

        <Divider />

        <h2 className="text-2xl font-bold sm:text-3xl">The three PWA pillars</h2>
        <p>
          Progressive Web Apps are web applications that have been designed to be capable, reliable,
          and installable. These three pillars transform them into an experience that feels like a
          platform-specific application.
        </p>

        <div className="flex flex-col gap-3 sm:gap-6">
          <h3 className="text-lg font-bold sm:text-xl">Capable</h3>
          <p>
            While some capabilities are still out of the web&apos;s reach, new and upcoming APIs are
            looking to change that, expanding what the web can do with features like on native apps.
            All of these capabilities are built with the web&apos;s secure, user-centric permission
            model.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:gap-6">
          <h3 className="text-lg font-bold sm:text-xl">Reliable</h3>
          <p>
            A reliable Progressive Web App feels fast and dependable regardless of the network.
            Users deserve apps that respond to interaction in the blink of an eye, and an experience
            they can depend on.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold sm:text-xl">Installable</h3>
          <p>
            Installed Progressive Web Apps run in a standalone window instead of a browser tab.
            They&apos;re launchable from on the user&apos;s home screen, dock, taskbar, or shelf.
            It&apos;s possible to search for them on a device and jump between them with the app
            switcher, making them feel like part of the device they&apos;re installed on.
          </p>
        </div>

        <Divider />

        <h2 className="text-2xl font-bold sm:text-3xl">PWA install criteria</h2>
        <ul className="list-inside list-disc text-left">
          <li>The web app is not already installed</li>
          <li>Meets the user engagement heuristics:</li>
          <ul className="ml-5 list-inside list-disc">
            <li>The user needs to have clicked or tapped on the page at least once.</li>
            <li>The user needs to have spent at least 30 seconds viewing the page (at any time)</li>
          </ul>
          <li>Be served over HTTPS</li>
          <li>Service worker to allow the to work offline</li>
          <li>Includes a Web App Manifest that includes:</li>
          <ul className="text-small sm:text-medium ml-5 list-inside list-disc">
            <li>short_name</li>
            <li>name</li>
            <li>icons must include a 192px and a 512px sized icons</li>
            <li>start_url</li>
            <li>display must be one of: fullscreen, standalone, or minimal-ui</li>
            <li>
              Optional but required for{' '}
              <Link
                href="https://developer.chrome.com/blog/richer-pwa-installation/"
                isExternal
                showAnchorIcon
                className="text-small sm:text-medium dark:text-secondary text-primary"
              >
                Richer Installation
              </Link>
              :
            </li>
            <ul className="ml-5 list-inside list-disc">
              <li>description</li>
              <li>screenshots (add at least one)</li>
            </ul>
          </ul>
        </ul>

        <Divider />

        <h2 className="text-2xl font-bold sm:text-3xl">Installation from an app store</h2>
        <p>
          Users expect to find apps in the app store for their platform, like the Google Play Store
          or the Apple App Store.
        </p>
        <p>
          If your app meets the installability prerequisites, you can package it and distribute it
          through app stores. The process is specific to each app store:
        </p>
        <ul className="list-inside list-disc whitespace-nowrap text-left">
          <li>
            <Link
              isExternal
              showAnchorIcon
              className="text-small sm:text-medium dark:text-secondary text-primary"
              href="https://chromeos.dev/en/publish/pwa-in-play"
            >
              How to publish a PWA to the&nbsp;<strong>Google Play Store</strong>
            </Link>
          </li>
          <li>
            <Link
              isExternal
              showAnchorIcon
              className="text-small sm:text-medium dark:text-secondary text-primary"
              href="https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/microsoft-store"
            >
              How to publish a PWA to the&nbsp;<strong>Microsoft Store</strong>
            </Link>
          </li>
          <li>
            <Link
              isExternal
              showAnchorIcon
              className="text-small sm:text-medium dark:text-secondary text-primary"
              href="https://developer.oculus.com/documentation/web/pwa-submit-app/"
            >
              How to publish a PWA to the&nbsp;<strong>Meta Quest Store</strong>
            </Link>
          </li>
          <li>
            <Link
              isExternal
              showAnchorIcon
              className="text-small sm:text-medium dark:text-secondary text-primary"
              href="https://docs.pwabuilder.com/#/builder/app-store"
            >
              How to publish a PWA to the&nbsp;<strong>Apple App Store</strong>
            </Link>
          </li>
        </ul>
        <p>
          The{' '}
          <Link
            isExternal
            showAnchorIcon
            className="dark:text-secondary text-primary"
            href="https://docs.pwabuilder.com/#/builder/quick-start"
          >
            PWABuilder
          </Link>{' '}
          is a tool to simplify the process of packaging and publishing a PWA for various app
          stores. It supports the Google Play Store, Microsoft Store, Meta Quest Store, and iOS App
          Store.
        </p>
        <p>
          If you have added your app to the app store, users can install it from there, just like a
          platform-specific app.
        </p>
      </ContentBox>
    </SlideContainer>
  );
}

export default forwardRef(FinalePage);
