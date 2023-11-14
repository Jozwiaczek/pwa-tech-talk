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
  const { nextSlide } = useNavigation();

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
        <h1 className="text-3xl font-bold sm:text-5xl">
          Oops, current slide requires running server
        </h1>
        <p className="text-lg sm:text-2xl">
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
