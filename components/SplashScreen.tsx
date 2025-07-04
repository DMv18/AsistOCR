import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

export function SplashScreen() {
  const { theme, colorMode, fontScale } = useThemeCustom();
  const c = Colors[colorMode][theme];

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={[styles.logoCircle]}>
        <ThemedText style={[styles.logoText, { color: c.accent, fontSize: 32 * fontScale } ]}>AsistOCR</ThemedText>
      </View>
      <ActivityIndicator size="large" color={c.accent} style={{ marginTop: 24 }} />
      <ThemedText style={[styles.loadingText, { color: c.text, fontSize: 18 * fontScale }]}>
        Cargando...
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    minWidth: '100%',
  },
  logoCircle: {
    backgroundColor: '#fff',
    borderRadius: 60,
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    marginBottom: 18,
  },
  logoText: {
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  loadingText: {
    marginTop: 18,
    fontWeight: 'bold',
  },
});
