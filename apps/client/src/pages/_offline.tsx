import { useNetworkState } from 'react-use';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Card, CardBody } from '@nextui-org/react';
import { Button } from '@/client/components/Button';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const OfflineFallbackPage = () => {
  const { online } = useNetworkState();
  const router = useRouter();

  useEffect(() => {
    const runEffect = async () => {
      if (online) {
        await router.push('/');
      }
    };
    void runEffect();
  }, [online, router]);

  const reloadPageHandler = async () => {
    await router.replace(router.asPath);
    toast.info('Page is reloaded.', { autoClose: 1500 });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card>
        <CardBody className="flex flex-col items-center gap-y-5 px-5 py-10 text-center sm:px-10 sm:py-14">
          <h1 className="text-3xl font-medium sm:text-4xl">
            Seems there&apos;s no internet connection
          </h1>
          <p>Please check your internet connection and try again.</p>
          <Button
            size="lg"
            onPress={reloadPageHandler}
            className="group mt-5"
            endContent={<ArrowPathIcon className="size-6 group-hover:animate-spin" />}
          >
            Reload
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default OfflineFallbackPage;
