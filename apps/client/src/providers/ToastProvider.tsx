import { useTheme } from 'next-themes';
import { toast, ToastContainer } from 'react-toastify';

export const ToastProvider = () => {
  const { resolvedTheme } = useTheme();

  return (
    <ToastContainer
      position={toast.POSITION.TOP_RIGHT}
      autoClose={5000}
      draggable
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      limit={3}
      closeOnClick
      style={{ zIndex: 10000, marginTop: '3rem' }}
    />
  );
};
