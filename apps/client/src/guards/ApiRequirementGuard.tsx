import React, { useMemo } from 'react';
import { useNavigation } from '@/client/hooks/useNavigation';
import { Button } from '@/client/components/Button';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { ForwardIcon, SignalSlashIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@nextui-org/react';
import { useEvents } from '@/client/context/EventsContext';

interface SlideRequirementsGuardProps {
  children: React.ReactNode;
  isApiRequired: boolean | undefined;
}

export const ApiRequirementGuard = ({ children, isApiRequired }: SlideRequirementsGuardProps) => {
  const { isConnected, isConnecting } = useEvents();
  const { nextSlide, currentSlideName } = useNavigation();

  const isValid = useMemo(() => {
    if (!isApiRequired) {
      return true;
    }

    return isApiRequired && !isConnecting && isConnected;
  }, [isApiRequired, isConnected, isConnecting]);

  if (!isValid) {
    return (
      <SlideContainer>
        <Tooltip content="Server is offline">
          <SignalSlashIcon className="size-20 text-warning cursor-help" />
        </Tooltip>
        <h1 className="text-5xl font-bold">{currentSlideName}</h1>
        <h2 className="text-xl font-semibold sm:text-3xl">
          Oops, current slide requires running server
        </h2>
        <p className="text-md sm:text-lg">
          For saving resources and safety reasons it is active only for live presentations.
        </p>
        <Button
          size="lg"
          onClick={nextSlide}
          color="warning"
          endContent={<ForwardIcon className="size-5" />}
        >
          Skip slide
        </Button>
      </SlideContainer>
    );
  }

  return <>{children}</>;
};
