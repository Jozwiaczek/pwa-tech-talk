import { useNavigation } from '@/client/hooks/useNavigation';
import { useKey } from 'react-use';
import { BackwardIcon, ForwardIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { Button } from '@/client/components/Button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { SLIDES } from '@/client/constants/slides';

export const Navigation = () => {
  const { previousSlide, nextSlide, goToSlide, currentPathname } = useNavigation();
  useKey('ArrowLeft', previousSlide);
  useKey('ArrowRight', nextSlide);

  return (
    <nav className="fixed bottom-8 flex w-full items-center justify-center gap-4">
      <Button onPress={previousSlide} isIconOnly color="primary">
        <BackwardIcon className="size-6" />
      </Button>
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button isIconOnly>
            <ListBulletIcon className="size-6" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" items={SLIDES} disabledKeys={[currentPathname]}>
          {(slide) => (
            <DropdownItem key={slide.path} onPress={() => goToSlide(slide.path)}>
              {SLIDES.indexOf(slide) + 1}.) {slide.name}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      <Button onPress={nextSlide} isIconOnly color="primary">
        <ForwardIcon className="size-6" />
      </Button>
    </nav>
  );
};
