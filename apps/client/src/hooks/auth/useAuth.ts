import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalStorage } from 'react-use';
import { axios } from '@/client/lib/axios';
import { Fido2RequestRegistrationDto } from '@/libs/shared/dto/fido2';
import {
  Fido2ReqRegistrationResponse,
  VerifyFido2LoginResponse,
} from '@/libs/shared/types/api-responses';
import { startAuthentication, startRegistration } from '@simplewebauthn/browser';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/typescript-types';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const [localUsername, setUsername] = useLocalStorage<string | undefined>('username');

  const baseLogoutUser = async () => {
    await queryClient.invalidateQueries(['currentUser']);
    toast.info('You have been logged out', {
      autoClose: 2000,
    });
  };

  return {
    localUsername,
    registerMutation: useMutation({
      mutationFn: async (dto: Fido2RequestRegistrationDto) => {
        const { data } = await axios.post<Fido2ReqRegistrationResponse>(
          '/auth/fido2/request-registration',
          dto,
        );
        setUsername(dto.username);
        return data;
      },
      onSuccess: async ({ registrationOptions, deviceName }) => {
        const registrationResponseJSON = await startRegistration(registrationOptions);
        await axios.post('/auth/fido2/register-response', {
          ...registrationResponseJSON,
          deviceName,
          username: localUsername,
        });
      },
      onError: async (error: AxiosError<Error>) => {
        const errorMessage = error.response?.data.message;
        toast.error(errorMessage);
      },
    }),
    loginMutation: useMutation({
      mutationFn: async (params: { username?: string }) => {
        const internalUsername = params?.username || localUsername;
        if (!internalUsername) {
          toast.error('Please register first');
          return;
        }
        const { data } = await axios.post<PublicKeyCredentialRequestOptionsJSON>(
          '/auth/fido2/request-login',
          { username: internalUsername },
        );
        return data;
      },
      onSuccess: async (authenticationResponse, params) => {
        const internalUsername = params.username || localUsername;
        if (!internalUsername || !authenticationResponse) {
          toast.error('Please register first');
          return;
        }

        const loginResponse = await startAuthentication(authenticationResponse);

        try {
          const { data } = await axios.post<VerifyFido2LoginResponse>(
            '/auth/fido2/verify-login-response',
            {
              ...loginResponse,
              username: internalUsername,
            },
          );
          setUsername(internalUsername);
          queryClient.setQueryData(['currentUser'], data);
          toast.success('Login successful');
        } catch (error) {
          if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.message.toString();
            toast.error(errorMessage);
            return;
          }

          toast.error('Something went wrong');
        }
      },
    }),
    onError: async (error: AxiosError<Error>) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage);
    },
    logoutMutation: useMutation({
      mutationFn: async () => axios.get('/auth/logout'),
      onSettled: baseLogoutUser,
    }),
  };
};
