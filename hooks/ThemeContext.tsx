import { ThemeName } from '@/constants/Colors';
import { useColorScheme as useDeviceColorScheme } from '@/hooks/useColorScheme';
import { auth, firebase } from '@/firebaseConfig';
import 'firebase/compat/firestore'; 
import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'expo-router';

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

  const firestore = firebase.firestore();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && firestore) {
        try {
          const docRef = firestore.collection('userPrefs').doc(user.uid);
          const doc = await docRef.get();
          if (doc.exists) {
            const prefs = doc.data();
            if (prefs?.fontScale) setFontScale(prefs.fontScale);
            else setFontScale(1); 
            if (prefs?.themeSetting) setThemeSetting(prefs.themeSetting);
            else setThemeSetting('system'); 
            if (prefs?.colorMode) setColorMode(prefs.colorMode);
            else setColorMode('normal'); 
          } else {
            setFontScale(1); 
            setThemeSetting('system');
            setColorMode('normal');
          }
        } catch (err: any) {
          if (
            (err?.code === 'permission-denied' || err?.message?.toLowerCase().includes('permission'))
          ) {
            console.warn('Advertencia de permisos al guardar/cargar preferencias:', err?.message || err);
          } else {
            console.warn('Error leyendo preferencias de usuario:', err);
          }
        }
      }
    });
    return () => unsubscribe();
  }, [firestore, pathname]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user && firestore) {
      const docRef = firestore.collection('userPrefs').doc(user.uid);
      docRef.set(
        {
          fontScale,
          themeSetting,
          colorMode,
        },
        { merge: true }
      ).catch((err: any) => {
        if (err?.code === 'permission-denied' || err?.message?.toLowerCase().includes('permission')) {
          console.warn('Advertencia de permisos al guardar preferencias:', err?.message || err);
        } else {
          console.warn('Error guardando preferencias de usuario:', err);
        }
      });

      const userDocRef = firestore.collection('users').doc(user.uid);
      userDocRef.set(
        {
          fontScale,
          themeSetting,
          colorMode,
        },
        { merge: true }
      ).catch((err: any) => {
        if (err?.code === 'permission-denied' || err?.message?.toLowerCase().includes('permission')) {
          console.warn('Advertencia de permisos al guardar preferencias en users:', err?.message || err);
        } else {
          console.warn('Error guardando preferencias en users:', err);
        }
      });
    }
  }, [fontScale, themeSetting, colorMode, firestore]);

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
 
