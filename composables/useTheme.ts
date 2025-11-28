export type Theme = 'landscape' | 'lighting' | 'youngArt';

export const useTheme = () => {
  const theme = useState<Theme>('theme', () => 'landscape');

  const setTheme = (value: Theme) => {
    if (!['landscape','lighting','youngnews','youngArt'].includes(value)) {
      value = 'landscape';
    }
    theme.value = value;
    if (import.meta.client) {
      document.documentElement.setAttribute("data-theme", value);
    }
  };

  return {
    theme,
    setTheme,
  };
};