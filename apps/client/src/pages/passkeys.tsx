import React, { useEffect, useState } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { Divider, Input, Link, useDisclosure } from '@nextui-org/react';
import { Button } from '@/client/components/Button';
import { ExclamationTriangleIcon, KeyIcon, PlusIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useAuth } from '@/client/hooks/auth/useAuth';
import { SlideTitle } from '@/client/components/SlideTitle';
import { ContentBox } from '@/client/components/ContentBox';
import { WhatArePasskeysModal } from '@/client/components/modals/WhatArePasskeysModal';

const LoginToExistingAccount = () => {
  const { localUsername, loginMutation } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !localUsername) {
    return null;
  }

  return (
    <>
      <Divider className="my-6" />
      <Button
        onClick={() => loginMutation.mutate({})}
        color="primary"
        fullWidth
        endContent={<KeyIcon className="size-5" />}
      >
        Login as {localUsername}
      </Button>
    </>
  );
};

const PasskeysPage = (_: unknown, ref: React.ForwardedRef<HTMLDivElement>) => {
  const {
    isOpen: isPasskeysInfoOpen,
    onOpen: onPasskeysInfoOpen,
    onOpenChange: onPasskeysInfoOpenChange,
  } = useDisclosure();
  const { registerMutation, loginMutation } = useAuth();

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username') as string;
    if (!username) {
      toast.error('Please enter a username', {
        autoClose: 2000,
      });
      return;
    }
    const dto = { username };
    // @ts-ignore - submitter is not yet in the types
    const submitBtnType = event.nativeEvent.submitter.value;
    if (submitBtnType === 'register') {
      registerMutation.mutate(dto);
    } else if (submitBtnType === 'login') {
      loginMutation.mutate(dto);
    }
  };

  return (
    <SlideContainer ref={ref} className="gap-12">
      <ContentBox>
        <SlideTitle>Passkeys</SlideTitle>
        <Link
          onPress={onPasskeysInfoOpen}
          underline="always"
          className="text-default-600 hover:cursor-help"
        >
          What are passkeys?
        </Link>
        <p>
          With the Web Authentication API, users can sign up and log in to your PWA with facial
          recognition or their fingerprint scanner using a cutting-edge technology called Passkeys.
        </p>
        <p className="text-warning flex flex-col items-center justify-center">
          <ExclamationTriangleIcon className="size-5" />
          There is bug with current implementation (on this site) when registering passkeys. Try to
          register same passkey two times in a row and then login with it.{' '}
        </p>
        <form className="flex w-full flex-col gap-6" onSubmit={handleRegister}>
          <Input name="username" placeholder="Username" />
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              fullWidth
              color="secondary"
              name="register"
              value="register"
              endContent={<PlusIcon className="size-5" />}
            >
              Register passkey
            </Button>
            <p className="font-thin">or</p>
            <Button
              type="submit"
              fullWidth
              color="primary"
              value="login"
              name="login"
              endContent={<KeyIcon className="size-5" />}
            >
              Log in with passkey
            </Button>
            <LoginToExistingAccount />
          </div>
        </form>
      </ContentBox>
      <WhatArePasskeysModal isOpen={isPasskeysInfoOpen} onOpenChange={onPasskeysInfoOpenChange} />
    </SlideContainer>
  );
};

PasskeysPage.apiRequired = true;

export default PasskeysPage;
