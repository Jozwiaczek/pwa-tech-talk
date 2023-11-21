import { useRouter } from 'next/router';
import { useBaseNavigation } from '@/client/hooks/useBaseNavigation';

export const useNavigation = () => {
  const router = useRouter();
  return useBaseNavigation(router);
};
