import { ThemeName } from '@/constants/Colors';
import { useColorScheme as useDeviceColorScheme } from '@/hooks/useColorScheme';
import React, { createContext, useContext, useState } from 'react';

type ColorMode =
  | 'normal'
  | 'highContrast'
  | 'protanopia'
  | 'deuteranopia'
  | 'tritanopia';

type ThemeContextType = {
  theme: ThemeName;
  setTheme: (theme: ThemeName | 'system') => void;
  fontScale: number;
  setFontScale: (scale: number) => void;
  themeSetting: ThemeName | 'system';
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  fontScale: 1,
  setFontScale: () => {},
  themeSetting: 'system',
  colorMode: 'normal',
  setColorMode: () => {},
});

export function ThemeProviderCustom({ children }: { children: React.ReactNode }) {
  const deviceScheme = useDeviceColorScheme() ?? 'light';
  const [themeSetting, setThemeSetting] = useState<ThemeName | 'system'>('system');
  const [fontScale, setFontScale] = useState(1);
  const [colorMode, setColorMode] = useState<ColorMode>('normal');

  const theme: ThemeName =
    themeSetting === 'system'
      ? (deviceScheme as ThemeName)
      : (themeSetting as ThemeName);



  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: setThemeSetting,
        fontScale,
        setFontScale,
        themeSetting,
        colorMode,
        setColorMode,
      }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeCustom() {
  return useContext(ThemeContext);
}
