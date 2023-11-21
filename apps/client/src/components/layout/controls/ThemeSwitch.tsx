import { useTheme } from 'next-themes';
import { Button } from '@/client/components/Button';
import { SunIcon } from '@heroicons/react/24/outline';
import { MoonIcon } from '@heroicons/react/24/solid';

export const ThemeSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button isIconOnly onPress={toggleTheme} variant="light">
      {resolvedTheme === 'light' ? <MoonIcon className="size-7" /> : <SunIcon className="size-7" />}
    </Button>
  );
};
