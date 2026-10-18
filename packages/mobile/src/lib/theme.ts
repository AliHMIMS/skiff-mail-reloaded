import { useColorScheme } from 'react-native';

// Skiff's palette (nightwatch-ui's theme), reduced to what the app draws
const light = {
  background: '#ffffff',
  surface: '#ffffff',
  surfaceAlt: '#f5f5f5',
  border: '#e8e8e8',
  text: '#1a1a1a',
  textSecondary: '#666666',
  textTertiary: '#999999',
  accent: '#ef5a3c',
  accentText: '#ffffff',
  unreadDot: '#ef5a3c',
  danger: '#d92d20'
};

export type Theme = typeof light;

const dark: Theme = {
  background: '#121212',
  surface: '#1c1c1c',
  surfaceAlt: '#262626',
  border: '#2e2e2e',
  text: '#f2f2f2',
  textSecondary: '#a3a3a3',
  textTertiary: '#737373',
  accent: '#f0735a',
  accentText: '#ffffff',
  unreadDot: '#f0735a',
  danger: '#f97066'
};

export function useTheme(): Theme {
  return useColorScheme() === 'dark' ? dark : light;
}
