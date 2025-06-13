import React, { createContext, useContext, useState } from 'react';
import { useColorScheme as useDeviceColorScheme } from '@/hooks/useColorScheme';
import { ThemeName } from '@/constants/Colors';

type ThemeContextType = {
  theme: ThemeName;
  setTheme: (theme: ThemeName | 'system') => void;
  fontScale: number;
  setFontScale: (scale: number) => void;
  themeSetting: ThemeName | 'system';
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  fontScale: 1,
  setFontScale: () => {},
  themeSetting: 'system',
});

export function ThemeProviderCustom({ children }: { children: React.ReactNode }) {
  const deviceScheme = useDeviceColorScheme() ?? 'light';
  const [themeSetting, setThemeSetting] = useState<ThemeName | 'system'>('system');
  const [fontScale, setFontScale] = useState(1);

  const theme: ThemeName =
    themeSetting === 'system'
      ? (deviceScheme as ThemeName)
      : (themeSetting as ThemeName);

  // Opcional: persistir en storage

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: setThemeSetting,
        fontScale,
        setFontScale,
        themeSetting,
      }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeCustom() {
  return useContext(ThemeContext);
}
