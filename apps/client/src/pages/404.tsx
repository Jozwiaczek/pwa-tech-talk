import { Card, CardBody } from '@nextui-org/react';
import { Button } from '@/client/components/Button';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { useNavigation } from '@/client/hooks/useNavigation';
import { SLIDE_PATHS } from '@/client/slides';

function PageNotFound() {
  const { goToSlide } = useNavigation();

  const backToIntro = async () => {
    await goToSlide(SLIDE_PATHS.Intro);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card>
        <CardBody className="flex flex-col items-center gap-y-5 px-5 py-10 text-center sm:px-10 sm:py-14">
          <h1 className="text-6xl font-bold sm:text-7xl md:text-8xl">404</h1>
          <p className="text-xl">Oops! The page you are looking for does not exist.</p>
          <Button
            variant="bordered"
            color="primary"
            size="lg"
            onPress={backToIntro}
            className="mt-5"
            endContent={<ArrowUturnLeftIcon className="size-6" />}
          >
            Back to slides
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

PageNotFound.hideControls = true;

export default PageNotFound;
