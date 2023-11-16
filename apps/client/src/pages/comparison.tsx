import React from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { Accordion, AccordionItem, Card, Tooltip } from '@nextui-org/react';
import {
  CheckIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { twJoin } from 'tailwind-merge';
import { AppSupportType, COMPARE_FEATURES } from '@/client/constants/compare-features';

const AppSupportTypeBadge = ({ type }: { type: AppSupportType }) => {
  const commonClasses = 'size-7';

  switch (type) {
    case AppSupportType.Full:
      return (
        <Tooltip content="Full support" color="success">
          <CheckIcon className={twJoin(commonClasses, 'text-success')} />
        </Tooltip>
      );
    case AppSupportType.Partial:
      return (
        <Tooltip content="Partial support" color="warning">
          <ExclamationTriangleIcon className={twJoin(commonClasses, 'text-warning')} />
        </Tooltip>
      );
    case AppSupportType.None:
      return (
        <Tooltip content="No support" color="danger">
          <ExclamationCircleIcon className={twJoin(commonClasses, 'text-danger')} />
        </Tooltip>
      );
    default:
      return null;
  }
};

const Manifest = (props: unknown, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <SlideContainer ref={ref} className="justify-start">
      <h1 className="text-3xl font-bold sm:text-5xl">
        PWA vs Native App
        <br />
        Comparison Table
      </h1>
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-11">
        <span className="flex items-center gap-2">
          <AppSupportTypeBadge type="Full" />
          Full support
        </span>
        <span className="flex items-center gap-2">
          <AppSupportTypeBadge type="Partial" />
          Partial support
        </span>
        <span className="flex items-center gap-2">
          <AppSupportTypeBadge type="None" />
          No support
        </span>
      </div>
      <div className="flex w-full max-w-3xl flex-col gap-5">
        <Card className="flex h-16 w-full flex-row items-center justify-between p-4 sm:pr-11">
          <h2 className="text-xl font-semibold">Features</h2>
          <div className="flex h-full flex-1 items-center justify-end">
            <p className="w-24 text-right text-xl font-semibold sm:w-40 sm:text-center">PWA</p>
            <p className="w-24 text-right text-xl font-semibold sm:w-40 sm:text-center">Native</p>
          </div>
        </Card>
        <Accordion
          className="w-full"
          variant="shadow"
          itemClasses={{
            content: 'text-left text-small text-default-500',
            title:
              'flex items-center font-normal text-medium group-data-[hover=true]:font-semibold transition-all duration-200',
            trigger: 'group flex items-center gap-0',
            indicator:
              'text-xl group-data-[hover=true]:translate-x-[-4px] group-data-[hover=true]:text-primary transition-all duration-200',
          }}
        >
          {COMPARE_FEATURES.map((item) => (
            <AccordionItem
              key={item.title}
              title={
                <>
                  {item.title}
                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex w-16 items-center justify-center text-right sm:w-40 sm:text-center">
                      <AppSupportTypeBadge type={item.pwaSupport} />
                    </div>
                    <div className="flex w-16 items-center justify-center text-right sm:w-40 sm:text-center">
                      <AppSupportTypeBadge type={item.nativeAppSupport} />
                    </div>
                  </div>
                </>
              }
            >
              {item.description}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SlideContainer>
  );
};

export default Manifest;
