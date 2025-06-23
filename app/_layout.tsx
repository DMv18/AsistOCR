import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack , useRouter, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { SplashScreen } from '@/components/SplashScreen';
import { ThemeProviderCustom } from '@/hooks/ThemeContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { auth } from '@/firebaseConfig';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/login' || pathname === '/register') return;
    let unsub: any;
    if (typeof window !== 'undefined') {
      unsub = auth.onAuthStateChanged((user) => {
        if (!user) {
          router.replace('/login');
        }
      });
    }
    return () => {
      if (unsub) unsub();
    };
  }, [pathname, router]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded) {
    return null;
  }

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <ThemeProviderCustom>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        {children}
      </ThemeProvider>
    </ThemeProviderCustom>
  );
}
