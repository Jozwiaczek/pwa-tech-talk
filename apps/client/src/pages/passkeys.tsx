import React, { useEffect, useState } from 'react';
import { SlideContainer } from '@/client/components/SlideContainer';
import { Divider, Input } from '@nextui-org/react';
import { Button } from '@/client/components/Button';
import { KeyIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useNavigation } from '@/client/hooks/useNavigation';
import { useAuth } from '@/client/hooks/auth/useAuth';

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
    <Button
      onClick={() => loginMutation.mutate({})}
      color="primary"
      fullWidth
      endContent={<KeyIcon className="size-6" />}
    >
      Login as {localUsername}
    </Button>
  );
};

const PasskeysPage = (props: unknown, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { nextSlide } = useNavigation();
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

  const onSkipClick = async () => {
    await nextSlide();
  };

  return (
    <SlideContainer ref={ref} className="gap-12">
      <h1 className="text-5xl font-bold">Passkeys</h1>
      <p>This step enables showcase of PWA features like passkeys or push notifications.</p>
      <form className="flex w-full max-w-xs flex-col gap-6 sm:max-w-sm" onSubmit={handleRegister}>
        <Input name="username" placeholder="Username" />
        <div className="flex flex-col gap-2">
          <Button type="submit" fullWidth color="secondary" name="register" value="register">
            Register passkey
          </Button>
          <p className="font-light">or</p>
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="ghost"
            value="login"
            name="login"
          >
            Log in with passkey
          </Button>
          <Divider className="my-6" />
          <LoginToExistingAccount />
          <Button fullWidth color="warning" variant="ghost" onClick={onSkipClick}>
            Skip login
          </Button>
        </div>
      </form>
    </SlideContainer>
  );
};

PasskeysPage.apiRequired = true;

export default PasskeysPage;
