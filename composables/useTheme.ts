export type Theme = 'landscape' | 'lighting';

export const useTheme = () => {
  const theme = useState<Theme>('theme', () => 'landscape');

  const setTheme = (value: Theme) => {
    theme.value = value;
  };

  return {
    theme,
    setTheme,
  };
};