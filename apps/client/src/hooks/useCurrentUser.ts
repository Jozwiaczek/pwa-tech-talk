import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNetworkState } from 'react-use';
import { axios } from '@/client/lib/axios';
import { ApiAuthCheckResponse } from '@/libs/shared/types/api-responses';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const useCurrentUser = () => {
  const { online } = useNetworkState();
  const queryClient = useQueryClient();

  const baseLogoutUser = async () => {
    await queryClient.invalidateQueries(['currentUser']);
    toast.info('You have been logged out', {
      autoClose: 2000,
    });
  };

  const currentUserQuery = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        const { data } = await axios.get<ApiAuthCheckResponse>('/auth/check-auth');

        return data;
      } catch (error: unknown) {
        if (error instanceof AxiosError && error?.response?.status === 401) {
          return {
            user: null,
            expiresDate: null,
          };
        }
        throw error;
      }
    },
    refetchInterval: (data) => {
      if (data && online) {
        return 1000 * 60 * 5; // 5 minutes
      }
      return false;
    },
  });

  const currentUser = currentUserQuery.data?.user;

  return {
    currentUser,
    currentUserQuery,
    isLoadingCurrentUser: currentUserQuery.isLoading,
    removeAccountMutation: useMutation({
      mutationFn: async () => {
        await axios.delete('/users', {
          params: {
            id: currentUser?.id,
          },
        });
        await baseLogoutUser();
      },
    }),
  };
};
