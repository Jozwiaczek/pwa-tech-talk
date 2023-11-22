import { useNavigation } from '@/client/hooks/useNavigation';
import { useKey } from 'react-use';
import { BackwardIcon, ForwardIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { SLIDES } from '@/client/slides';
import { twJoin } from 'tailwind-merge';

export const Navigation = () => {
  const { previousSlide, nextSlide, goToSlide, currentPathname, isFirstSlide } = useNavigation();
  useKey('ArrowLeft', previousSlide);
  useKey('ArrowRight', nextSlide);

  return (
    <nav className="flex items-center justify-center gap-2 sm:gap-4">
      <Button
        onPress={previousSlide}
        isIconOnly
        color="primary"
        isDisabled={isFirstSlide}
        aria-label="Previous Slide"
      >
        <BackwardIcon className="size-6" />
      </Button>
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button isIconOnly aria-label="Slides menu">
            <ListBulletIcon className="size-6" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dynamic Actions"
          items={SLIDES}
          disabledKeys={[currentPathname]}
          classNames={{
            base: 'max-h-96 overflow-y-auto',
          }}
        >
          {(slide) => (
            <DropdownItem key={slide.path} onPress={() => goToSlide(slide.path)}>
              {SLIDES.indexOf(slide) + 1}.) {slide.name}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      <Button
        onPress={nextSlide}
        isIconOnly
        color="primary"
        className={twJoin(isFirstSlide && 'animate-pulse')}
        aria-label="Next Slide"
      >
        <ForwardIcon className="size-6" />
      </Button>
    </nav>
  );
};
