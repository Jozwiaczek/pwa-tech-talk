import React from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { Card, CardBody, Link, Tab, Tabs, User } from '@nextui-org/react';
import { exampleGb1, exampleGb2, ExampleGbLogo } from '@/client/assets/examples/guitar-book';
import {
  exampleBg1,
  exampleBg2,
  exampleBg3,
  ExampleBgLogo,
} from '@/client/assets/examples/budget-guard';
import {
  exampleSg1,
  exampleSg3,
  exampleSg4,
  exampleSg5,
  ExampleSgLogo,
} from '@/client/assets/examples/smart-gate';
import {
  exampleStf1,
  exampleStf2,
  ExampleStfLogo,
} from '@/client/assets/examples/smart-table-football';
import Image from 'next/image';
import { POPULAR_PWA_APPS } from '@/client/data/popular-pwa-apps';
import { SlideTitle } from '@/client/components/SlideTitle';

const ExampleApps = (_: unknown, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <SlideContainer ref={ref} className="justify-start">
      <SlideTitle>Example Apps</SlideTitle>
      <div className="flex w-full flex-col items-center gap-20">
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-3xl font-semibold">Popular PWAs</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {POPULAR_PWA_APPS.map((app) => (
              <Link
                key={app.name}
                href={app.url}
                isExternal
                showAnchorIcon
                className="text-default-foreground"
              >
                <User
                  name={app.name}
                  avatarProps={{
                    src: app.icon,
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
        <p className="max-w-4xl">
          The numbers don&apos;t lie! Companies that have launched Progressive Web Apps have seen
          impressive results.
          <br />
          Check a&nbsp;
          <Link
            href="https://www.pwastats.com/"
            isExternal
            showAnchorIcon
            className="text-primary dark:text-secondary"
          >
            community-driven list
          </Link>
          of stats and news related to progressive web apps.
        </p>
        <div className="flex w-full max-w-4xl flex-col items-center gap-5">
          <h2 className="text-3xl font-semibold">My side projects with PWA</h2>
          <div className="flex h-full w-full flex-col">
            <Tabs
              aria-label="Example PWAs"
              classNames={{
                tabList: 'w-full',
              }}
              // Disabling animation prevents bug where after tab change it scrolls to the top of the page
              // https://github.com/nextui-org/nextui/issues/1467
              disableAnimation
            >
              <Tab
                key="guitar-book"
                title={
                  <div className="flex items-start space-x-2">
                    <ExampleGbLogo className="size-5" />
                    <span>Guitar Book</span>
                  </div>
                }
              >
                <Card>
                  <CardBody className="items-center gap-5 text-center">
                    <h3 className="text-xl font-semibold">Guitar Book</h3>
                    <Link
                      color="secondary"
                      href="https://guitar-book-pjatk.netlify.app/"
                      isExternal
                      showAnchorIcon
                    >
                      Live example app
                    </Link>
                    <Link
                      color="secondary"
                      href="https://github.com/Jozwiaczek/guitar-book/tree/master-v2"
                      isExternal
                      showAnchorIcon
                    >
                      Source code
                    </Link>
                    <p>
                      Open Source, Gatsby theme, mobile and SEO friendly with PWA for building
                      guitar/song books based on Contentful CMS.
                    </p>
                    <div className="flex w-full flex-wrap items-center justify-around gap-6">
                      <Image
                        src={exampleGb1}
                        alt="Example song book PWA"
                        className="w-40 md:w-80"
                        priority
                      />
                      <Image
                        src={exampleGb2}
                        alt="PWA songs search input"
                        className="w-40 md:w-80"
                        priority
                      />
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              <Tab
                key="budget-guard"
                title={
                  <div className="flex items-start space-x-2">
                    <ExampleBgLogo className="size-5" />
                    <span>Budget Guard</span>
                  </div>
                }
              >
                <Card>
                  <CardBody className="items-center gap-5 text-center">
                    <h3 className="text-xl font-semibold">Budget Guard</h3>
                    <p className="max-w-2xl">
                      Budget Guard is a web-based, progressive application for forecasting,
                      maintaining, and smartly analyzing the future condition of a budget.
                    </p>
                    <div className="flex w-full flex-wrap items-center justify-around gap-6">
                      <Image
                        src={exampleBg2}
                        alt="Application payments forecast view"
                        className="w-40 md:w-52"
                      />
                      <Image
                        src={exampleBg3}
                        alt="Application absences view"
                        className="w-40 md:w-52"
                      />
                      <Image src={exampleBg1} alt="Application hub view" className="w-40 md:w-52" />
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              <Tab
                key="smart-gate"
                title={
                  <div className="flex items-start space-x-2">
                    <ExampleSgLogo className="size-5" />
                    <span>Smart Gate</span>
                  </div>
                }
              >
                <Card>
                  <CardBody className="items-center gap-5 text-center">
                    <h3 className="text-xl font-semibold">Smart Gate</h3>
                    <Link
                      color="secondary"
                      href="https://smart-gate.netlify.app"
                      isExternal
                      showAnchorIcon
                    >
                      Live example app
                    </Link>
                    <Link
                      color="secondary"
                      href="https://smart-gate-docs.vercel.app/"
                      isExternal
                      showAnchorIcon
                    >
                      Docs
                    </Link>
                    <Link
                      color="secondary"
                      href="https://github.com/Jozwiaczek/smart-gate"
                      isExternal
                      showAnchorIcon
                    >
                      Source code
                    </Link>
                    <p className="max-w-2xl">
                      Smart Gate is a secure self-hosted system for opening electric gates or doors.
                      Based on Raspberry Pi, Node.js, React and built as a complete PWA.
                    </p>
                    <Image
                      src={exampleSg1}
                      alt="Smart Gate features showcase"
                      className="w-full p-5"
                    />
                    <div className="flex w-full flex-wrap items-center justify-around gap-6">
                      <Image src={exampleSg3} alt="Gate event logs view" className="w-40" />
                      <Image src={exampleSg4} alt="PWA login page" className="w-52" />
                      <Image src={exampleSg5} alt="Smart gate management view" className="w-72" />
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              <Tab
                key="smart-table-football"
                title={
                  <div className="flex items-start space-x-2">
                    <ExampleStfLogo className="size-5" />
                    <span>Smart Table Football</span>
                  </div>
                }
              >
                <Card>
                  <CardBody className="items-center gap-5 text-center">
                    <h3 className="text-xl font-semibold">Smart Table Football</h3>
                    <p className="max-w-2xl">
                      System for managing smart table football. Players app with separate admin
                      panel on top of the PWA and real-time connection with physical playing field.
                    </p>
                    <div className="flex w-full flex-col items-center justify-around gap-10 px-10">
                      <Image
                        src={exampleStf1}
                        alt="Smart Table Football application view"
                        className="w-full"
                      />
                      <Image
                        src={exampleStf2}
                        alt="Smart Table Football admin view"
                        className="w-full"
                      />
                    </div>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default ExampleApps;
