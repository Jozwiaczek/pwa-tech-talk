import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useMemo } from 'react';

interface ReactQueryProviderProps {
  children: ReactNode;
  dehydratedState: unknown;
  hideDevtools?: boolean;
}

const ReactQueryProvider = ({
  children,
  dehydratedState,
  hideDevtools = true,
}: ReactQueryProviderProps) => {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>{children}</Hydrate>
      {!hideDevtools && <ReactQueryDevtools position="top-left" />}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
